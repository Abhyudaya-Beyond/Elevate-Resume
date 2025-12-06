import { t } from "@lingui/macro";
import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@elevate/ui";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { useDialog } from "@/client/stores/dialog";

import { GridView } from "./_layouts/grid";

/**
 * Dashboard Resumes Page - Consciousness-First Design
 *
 * Neurobiological Design Principles:
 * - Sticky header = prefrontal attention (clear navigation)
 * - Gold "New Resume" button = dopamine trigger (approach motivation)
 * - Empty state = limbic safety (warm, inviting, no failure feeling)
 * - Card grid = working memory chunking (3 per row)
 * - Staggered animations = visual rhythm (consciousness-aware timing)
 */
export const ResumesPage = () => {
  const { open } = useDialog("resume");

  const handleCreateResume = () => {
    open("create");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {t`Resumes`} - {t`Elevate`}
        </title>
      </Helmet>

      {/* Sticky Header - Prefrontal Clarity */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.6, 1] }}
        className="sticky top-0 z-40 w-full border-b border-border bg-background shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-gutter py-gutter-sm">
          <div className="flex items-center justify-between">
            {/* Left: Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              {t`Your Resumes`}
            </h1>

            {/* Right: New Resume Button (Dopamine Trigger) */}
            <Button
              onClick={handleCreateResume}
              variant="accent"
              size="lg"
              className="h-11 transition-all duration-perceptible hover:scale-105"
            >
              <PlusIcon className="mr-2" size={18} weight="bold" />
              {t`New Resume`}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-gutter py-gutter-lg">
        <GridView />
      </main>
    </div>
  );
};
