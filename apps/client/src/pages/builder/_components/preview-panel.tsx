import { t } from "@lingui/macro";
import { useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

/**
 * Preview Panel - Right Panel
 * 
 * Neurobiological Design Principles:
 * - Real-time sync = immediate feedback (dopamine loop closes)
 * - Teal offline badge = limbic safety (amygdala knows data is local)
 * - Document-like framing = consciousness signal (this is the output)
 */
export const PreviewPanel = () => {
  const frameRef = useBuilderStore((state) => state.frame.ref);
  const setFrameRef = useBuilderStore((state) => state.frame.setRef);
  const resume = useResumeStore((state) => state.resume);
  const title = useResumeStore((state) => state.resume.title);

  const syncResumeToArtboard = useCallback(() => {
    if (!frameRef?.contentWindow || !resume.data) return;
    const message = { type: "SET_RESUME", payload: resume.data };
    frameRef.contentWindow.postMessage(message, "*");
  }, [frameRef, resume.data]);

  // Send resume data to iframe on initial load
  useEffect(() => {
    if (!frameRef) return;

    frameRef.addEventListener("load", syncResumeToArtboard);

    return () => {
      frameRef.removeEventListener("load", syncResumeToArtboard);
    };
  }, [frameRef, syncResumeToArtboard]);

  // Persistently check if iframe has loaded using setInterval
  useEffect(() => {
    if (!frameRef) return;

    const interval = setInterval(() => {
      if (frameRef?.contentWindow?.document.readyState === "complete") {
        syncResumeToArtboard();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [frameRef, syncResumeToArtboard]);

  // Send resume data to iframe on change of resume data
  useEffect(() => {
    syncResumeToArtboard();
  }, [syncResumeToArtboard]);

  return (
    <div className="relative flex h-full flex-col bg-background">
      <Helmet>
        <title>
          {title} - {t`Elevate`}
        </title>
      </Helmet>

      {/* Offline Indicator - Teal (Limbic Safety) */}
      <div className="absolute top-gutter-sm right-gutter-sm z-10 flex items-center gap-gutter-xs rounded-base bg-safe/90 px-gutter-sm py-gutter-xs backdrop-blur-sm">
        <div className="h-2 w-2 animate-pulse rounded-full bg-safe-foreground" />
        <span className="text-xs font-medium text-safe-foreground">{t`Local`}</span>
      </div>

      {/* Preview Iframe */}
      <iframe
        ref={setFrameRef}
        title={resume.id}
        src="/artboard/builder"
        className="h-full w-full border-0"
      />
    </div>
  );
};

