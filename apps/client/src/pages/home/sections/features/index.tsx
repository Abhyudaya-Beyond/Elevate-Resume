import { t } from "@lingui/macro";
import { BrainIcon, FileIcon, LockIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

/**
 * Features Section - Consciousness-First Design
 * 
 * Neurobiological Design Principles:
 * - 4-column grid = working memory chunking (4 items per row)
 * - White cards = clean, organized (prefrontal order)
 * - Hover shadow = depth perception (motion feedback loop)
 * - Clear hierarchy = reduced cognitive load
 */
export const FeaturesSection = () => {
  const features: Array<{ icon: React.ReactNode; title: string; description: string }> = [
    {
      icon: <FileIcon className="w-8 h-8" weight="bold" />,
      title: t`Narrative Control`,
      description: t`Shape your story, multiple versions`,
    },
    {
      icon: <BrainIcon className="w-8 h-8" weight="bold" />,
      title: t`Signal Strength`,
      description: t`AI-powered suggestions for impact`,
    },
    {
      icon: <LockIcon className="w-8 h-8" weight="bold" />,
      title: t`Institutional Credibility`,
      description: t`Works with governments and think tanks`,
    },
    {
      icon: <LockIcon className="w-8 h-8" weight="bold" />,
      title: t`Privacy First`,
      description: t`Your data, your device, your rules`,
    },
  ];

  return (
    <section id="features" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-gutter">
        <motion.div
          className="space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.6, 1] }}
        >
          <h2 className="text-4xl font-bold text-primary">{t`Designed for India's Policy Makers`}</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70">
            {t`Elevate is built on a foundation of privacy-first principles and years of refinement. Every feature has been designed with your control and data ownership in mind, creating a resume builder that respects you as the owner of your professional narrative.`}
          </p>
        </motion.div>

        {/* Features Grid - 4 Columns */}
        <div className="mt-12 grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.25, ease: [0.4, 0, 0.6, 1] }}
              whileHover={{ y: -4 }}
              className="rounded-base border border-border bg-background p-gutter-sm shadow-sm transition-all duration-smooth hover:shadow-md"
            >
              <div className="mb-gutter-sm text-safe">{feature.icon}</div>
              <h3 className="mb-gutter-xs text-lg font-bold text-primary">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
