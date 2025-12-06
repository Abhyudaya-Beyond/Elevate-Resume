import { t } from "@lingui/macro";
import { CircleNotchIcon, FilePdfIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import type { ResumeDto } from "@elevate/dto";
import { Button } from "@elevate/ui";
import { pageSizeMap } from "@elevate/utils";
import { useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import type { LoaderFunction } from "react-router";
import { Link, redirect, useLoaderData } from "react-router";

import { Icon } from "@/client/components/icon";
import { useToast } from "@/client/hooks/use-toast";
import { queryClient } from "@/client/libs/query-client";
import { findResumeByUsernameSlug, usePrintResume } from "@/client/services/resume";
import { motion } from "framer-motion";

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

/**
 * Public Resume Page - Consciousness-First Design
 *
 * Neurobiological Design Principles:
 * - Centered white card = focused attention (consciousness gates toward resume content)
 * - Cream background = reduced cognitive load (not distracting)
 * - Gold download button = dopamine (actionable, high visibility)
 * - Minimal UI = attention stays on resume (signal clarity maximized)
 */
export const PublicResumePage = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  const { printResume, loading } = usePrintResume();

  const { id, title, data: resume } = useLoaderData();
  const format = resume.metadata.page.format as keyof typeof pageSizeMap;

  const updateResumeInFrame = useCallback(() => {
    const message = { type: "SET_RESUME", payload: resume };

    setImmediate(() => {
      frameRef.current?.contentWindow?.postMessage(message, "*");
    });
  }, [frameRef.current, resume]);

  useEffect(() => {
    if (!frameRef.current) return;
    frameRef.current.addEventListener("load", updateResumeInFrame);
    return () => frameRef.current?.removeEventListener("load", updateResumeInFrame);
  }, [frameRef]);

  useEffect(() => {
    if (!frameRef.current?.contentWindow) return;

    const handleMessage = (event: MessageEvent) => {
      if (!frameRef.current?.contentWindow) return;
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "PAGE_LOADED") {
        frameRef.current.width = event.data.payload.width;
        frameRef.current.height = event.data.payload.height;
        frameRef.current.contentWindow.removeEventListener("message", handleMessage);
      }
    };

    frameRef.current.contentWindow.addEventListener("message", handleMessage);

    return () => {
      frameRef.current?.contentWindow?.removeEventListener("message", handleMessage);
    };
  }, [frameRef]);

  const onDownloadPdf = async () => {
    const { url } = await printResume({ id });
    openInNewTab(url);
  };

  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: t`Check out my resume`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast({
          variant: "success",
          title: t`Link copied to clipboard`,
          description: t`Share this link with anyone to view your resume.`,
        });
      }
    } catch (error) {
      // User cancelled share or clipboard failed
      if (error instanceof Error && error.name !== "AbortError") {
        await navigator.clipboard.writeText(url);
        toast({
          variant: "success",
          title: t`Link copied to clipboard`,
          description: t`Share this link with anyone to view your resume.`,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background print:bg-white">
      <Helmet>
        <title>
          {title} - {t`Elevate`}
        </title>
        <meta name="description" content={t`View ${title} resume created with Elevate`} />
      </Helmet>

      {/* Main Container - Centered, Max-width 900px */}
      <div className="mx-auto max-w-[900px] px-gutter py-gutter-lg print:p-0">
        {/* White Card - Clean, Organized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.6, 1] }}
          className="rounded-base border border-border bg-background shadow-md print:border-0 print:shadow-none"
        >
          {/* Header - Title + Actions */}
          <div className="flex flex-col gap-gutter-sm border-b border-border p-gutter sm:flex-row sm:items-center sm:justify-between print:hidden">
            {/* Left: Title */}
            <h1 className="text-2xl font-bold text-primary">{title}</h1>

            {/* Right: Action Buttons */}
            <div className="flex flex-col gap-gutter-sm sm:flex-row">
              <Button
                onClick={onDownloadPdf}
                variant="accent"
                size="lg"
                disabled={loading}
                className="h-11 transition-all duration-perceptible hover:scale-105"
              >
                {loading ? (
                  <CircleNotchIcon className="mr-2 animate-spin" size={18} />
                ) : (
                  <FilePdfIcon className="mr-2" size={18} weight="bold" />
                )}
                {t`Download`}
              </Button>

              <Button
                onClick={onShare}
                variant="outline"
                size="lg"
                className="h-11 transition-all duration-perceptible hover:bg-secondary/10"
              >
                <ShareNetworkIcon className="mr-2" size={18} weight="bold" />
                {t`Share`}
              </Button>
            </div>
          </div>

          {/* Resume Preview - Centered */}
          <div className="p-gutter print:p-0">
            <div
              style={{ width: `${pageSizeMap[format].width}mm` }}
              className="relative z-50 mx-auto overflow-hidden rounded shadow-lg print:m-0 print:shadow-none"
            >
              <iframe
                ref={frameRef}
                title={title}
                src="/artboard/preview"
                style={{ width: `${pageSizeMap[format].width}mm`, overflow: "hidden" }}
                className="border-0"
              />
            </div>
          </div>
        </motion.div>

        {/* Footer - "Created with Elevate" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
          className="mt-gutter-lg text-center print:hidden"
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-sm text-foreground/60 hover:text-foreground">
              <span>{t`Created with`}</span>
              <Icon size={14} className="mx-1.5" />
              <span className="font-semibold">{t`Elevate`}</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export const publicLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const username = params.username!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const slug = params.slug!;

    return await queryClient.fetchQuery({
      queryKey: ["resume", { username, slug }],
      queryFn: () => findResumeByUsernameSlug({ username, slug }),
    });
  } catch {
    return redirect("/");
  }
};
