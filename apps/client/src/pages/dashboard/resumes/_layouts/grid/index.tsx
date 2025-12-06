import { t } from "@lingui/macro";
import { FileTextIcon } from "@phosphor-icons/react";
import { Button } from "@elevate/ui";
import { sortByDate } from "@elevate/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useDialog } from "@/client/stores/dialog";
import { useResumes } from "@/client/services/resume";

import { ResumeCard } from "./_components/resume-card";

/**
 * Grid View - Consciousness-First Design
 *
 * Neurobiological Design Principles:
 * - Empty state: Warm and inviting (limbic safety)
 * - Grid layout: 3 columns (working memory chunking)
 * - Staggered animations: Visual rhythm (consciousness-aware timing)
 * - Card hover: Depth perception (motion feedback loop)
 */
export const GridView = () => {
  const { resumes, loading } = useResumes();
  const { open } = useDialog("resume");

  // Empty State - Limbic Safety
  if (!loading && (!resumes || resumes.length === 0)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.6, 1] }}
        className="flex min-h-[60vh] items-center justify-center"
      >
        <div className="mx-auto max-w-[500px] text-center">
          {/* Card Wrapper - White, Clean, Organized */}
          <div className="rounded-base border border-border bg-background p-gutter-lg shadow-lg">
            {/* Icon - Emotional Anchor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="mb-gutter-sm flex justify-center"
            >
              <FileTextIcon size={48} weight="thin" className="text-foreground/40" />
            </motion.div>

            {/* Heading - Clear Hierarchy */}
            <h2 className="mb-gutter-xs text-2xl font-bold text-primary">
              {t`No resumes yet`}
            </h2>

            {/* Description - Positive Language */}
            <p className="mb-gutter text-base leading-relaxed text-foreground/70">
              {t`Create your first resume to get started. You have full control over your story.`}
            </p>

            {/* CTA Button - Dopamine Trigger */}
            <Button
              onClick={() => open("create")}
              variant="accent"
              size="lg"
              className="h-11 w-full transition-all duration-perceptible hover:scale-105"
            >
              {t`Create Your First Resume`}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
            className="h-64 animate-pulse rounded-base bg-secondary/30"
          />
        ))}
      </div>
    );
  }

  // Resume Cards Grid
  return (
    <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {resumes
          ?.sort((a, b) => sortByDate(a, b, "updatedAt"))
          .map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                delay: index * 0.05,
                duration: 0.2,
                ease: [0.4, 0, 0.6, 1],
              }}
            >
              <ResumeCard resume={resume} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};
