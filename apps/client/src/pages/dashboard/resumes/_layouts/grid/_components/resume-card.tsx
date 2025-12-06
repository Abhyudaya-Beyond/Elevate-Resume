import { t } from "@lingui/macro";
import {
  CopySimpleIcon,
  DownloadSimpleIcon,
  LockIcon,
  PencilSimpleIcon,
  TrashSimpleIcon,
  EyeIcon,
} from "@phosphor-icons/react";
import type { ResumeDto } from "@elevate/dto";
import { Button } from "@elevate/ui";
import { cn } from "@elevate/utils";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";

import { useDialog } from "@/client/stores/dialog";
import { usePrintResume } from "@/client/services/resume/print";

/**
 * Resume Card - Consciousness-First Design
 *
 * Neurobiological Design Principles:
 * - Title first = immediate recognition (prefrontal clarity)
 * - Clear action buttons = logical flow (prefrontal decision-making)
 * - Hover effect = motion feedback loop (dopamine)
 * - Gold Export button = reward signal
 */
type Props = {
  resume: ResumeDto;
};

export const ResumeCard = ({ resume }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<ResumeDto>("resume");
  const { open: lockOpen } = useDialog<ResumeDto>("lock");
  const { printResume, loading: exportLoading } = usePrintResume();

  const lastUpdated = dayjs(resume.updatedAt).format("MMM D, YYYY");

  const onEdit = () => {
    void navigate(`/builder/${resume.id}`);
  };

  const onView = () => {
    void navigate(`/resume/${resume.user.username}/${resume.slug}`);
  };

  const onExport = async () => {
    // Export PDF directly from dashboard (same as builder export)
    try {
      const { url } = await printResume({ id: resume.id });
      const win = window.open(url, "_blank");
      if (win) win.focus();
    } catch (error) {
      // Error handling is done by the hook
    }
  };

  const onRename = () => {
    open("update", { id: "resume", item: resume });
  };

  const onDuplicate = () => {
    open("duplicate", { id: "resume", item: resume });
  };

  const onLockChange = () => {
    lockOpen(resume.locked ? "update" : "create", { id: "lock", item: resume });
  };

  const onDelete = () => {
    open("delete", { id: "resume", item: resume });
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.6, 1] }}
      className="group relative"
    >
      {/* Card - White, Clean, Organized */}
      <div className="rounded-base border border-border bg-background p-gutter-sm shadow-sm transition-all duration-smooth hover:shadow-md">
        {/* Locked Indicator */}
        <AnimatePresence>
          {resume.locked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-gutter-sm top-gutter-sm z-10"
            >
              <div className="flex items-center gap-gutter-xs rounded-base bg-secondary/50 px-gutter-xs py-1">
                <LockIcon size={14} className="text-foreground/60" weight="bold" />
                <span className="text-xs font-medium text-foreground/60">{t`Locked`}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title - Immediate Recognition */}
        <h3 className="mb-gutter-xs line-clamp-2 text-lg font-bold text-primary">
          {resume.title || t`Untitled Resume`}
        </h3>

        {/* Meta Row - Last Updated */}
        <p className="mb-gutter text-sm text-foreground/60">
          {t`Updated ${lastUpdated}`}
        </p>

        {/* Button Row - Logical Action Flow */}
        <div className="flex flex-wrap gap-gutter-xs">
          <Button
            onClick={onEdit}
            variant="primary"
            size="sm"
            className="h-9 flex-1 min-w-[80px] transition-all duration-perceptible"
          >
            <PencilSimpleIcon className="mr-1.5" size={14} weight="bold" />
            {t`Edit`}
          </Button>

          <Button
            onClick={onView}
            variant="secondary"
            size="sm"
            className="h-9 flex-1 min-w-[80px] transition-all duration-perceptible"
          >
            <EyeIcon className="mr-1.5" size={14} weight="bold" />
            {t`View`}
          </Button>

          <Button
            onClick={onExport}
            variant="accent"
            size="sm"
            disabled={exportLoading}
            className="h-9 flex-1 min-w-[80px] transition-all duration-perceptible"
          >
            <DownloadSimpleIcon className="mr-1.5" size={14} weight="bold" />
            {exportLoading ? t`Exporting...` : t`Export`}
          </Button>

          <Button
            onClick={onDelete}
            variant="danger"
            size="sm"
            className="h-9 px-3 transition-all duration-perceptible"
          >
            <TrashSimpleIcon size={14} weight="bold" />
          </Button>
        </div>

        {/* Additional Actions (Hidden by default, shown on hover) */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          className="mt-gutter-xs overflow-hidden"
        >
          <div className="flex gap-gutter-xs border-t border-border pt-gutter-xs">
            <Button
              onClick={onRename}
              variant="ghost"
              size="sm"
              className="h-8 flex-1 text-xs"
            >
              <PencilSimpleIcon className="mr-1" size={12} />
              {t`Rename`}
            </Button>
            <Button
              onClick={onDuplicate}
              variant="ghost"
              size="sm"
              className="h-8 flex-1 text-xs"
            >
              <CopySimpleIcon className="mr-1" size={12} />
              {t`Duplicate`}
            </Button>
            {resume.locked ? (
              <Button
                onClick={onLockChange}
                variant="ghost"
                size="sm"
                className="h-8 flex-1 text-xs"
              >
                <LockIcon className="mr-1" size={12} />
                {t`Unlock`}
              </Button>
            ) : (
              <Button
                onClick={onLockChange}
                variant="ghost"
                size="sm"
                className="h-8 flex-1 text-xs"
              >
                <LockIcon className="mr-1" size={12} />
                {t`Lock`}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
