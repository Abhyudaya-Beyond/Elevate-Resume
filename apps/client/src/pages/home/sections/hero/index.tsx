import { t } from "@lingui/macro";
import {
  ArrowRightIcon,
  LockIcon,
  CloudSunIcon,
  FileIcon,
} from "@phosphor-icons/react";
import { Badge } from "@elevate/ui";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { defaultTiltProps } from "@/client/constants/parallax-tilt";

import { HeroCTA } from "./call-to-action";
import { Decoration } from "./decoration";

/**
 * Hero Section - Consciousness-First Design
 * 
 * Neurobiological Design Principles:
 * - Hero first = prefrontal attention (clarity)
 * - Trust signals = limbic safety (amygdala calms)
 * - Gold CTAs = dopamine (approach motivation)
 * - White space = reduced cognitive load
 * - Motion timing: 200ms fade-in (natural appearance)
 */
export const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center bg-background overflow-x-hidden">
    <Decoration.Grid />
    <Decoration.Gradient />

    <div className="mx-auto max-w-7xl px-4 sm:px-gutter w-full">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-gutter-lg lg:items-center">
        {/* LEFT: Content (Prefrontal Planning Zone) */}
        <motion.div
          className="text-center lg:text-left"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.6, 1] }}
        >
          {/* Trust Badge - Limbic Safety Signal */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-gutter-sm mb-gutter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Badge className="bg-safe/10 text-safe border-safe/20">
              {t`Privacy-First`}
            </Badge>
            <span className="text-sm text-foreground/60">•</span>
            <Badge className="bg-safe/10 text-safe border-safe/20">
              {t`Your Data`}
            </Badge>
          </motion.div>

          {/* Main Headline - Prefrontal Activation (0ms delay) */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-gutter-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.2, ease: [0.4, 0, 0.6, 1] }}
          >
            <span className="block">{t`Your resume.`}</span>
            <span className="block">{t`Your story.`}</span>
            <span className="block text-primary">{t`Your control.`}</span>
          </motion.h1>

          {/* Subheading - Cognitive Load Reduction (100ms delay) */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-gutter px-2 sm:px-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2, ease: [0.4, 0, 0.6, 1] }}
          >
            {t`Build and share a resume that truly represents you—without trackers, dark patterns, or data lock-in.`}
          </motion.p>

          {/* CTAs - Dopamine Triggers (200ms delay) */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-gutter-sm mb-gutter-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2, ease: [0.4, 0, 0.6, 1] }}
          >
            <HeroCTA />
          </motion.div>

          {/* Trust Signals - 3 Column Grid (Limbic Safety) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-gutter-sm mt-6 sm:mt-gutter-lg px-2 sm:px-0">
            <motion.div
              className="flex flex-col items-center lg:items-start p-gutter-sm rounded-base border border-safe/20 bg-safe/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.25, ease: [0.4, 0, 0.6, 1] }}
            >
              <LockIcon className="w-6 h-6 text-safe mb-gutter-xs" weight="bold" />
              <span className="text-sm font-semibold text-foreground">{t`Privacy-First`}</span>
              <span className="text-xs text-foreground/60 text-center lg:text-left">{t`Your data stays local`}</span>
            </motion.div>

            <motion.div
              className="flex flex-col items-center lg:items-start p-gutter-sm rounded-base border border-safe/20 bg-safe/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.25, ease: [0.4, 0, 0.6, 1] }}
            >
              <CloudSunIcon className="w-6 h-6 text-safe mb-gutter-xs" weight="bold" />
              <span className="text-sm font-semibold text-foreground">{t`Works Offline`}</span>
              <span className="text-xs text-foreground/60 text-center lg:text-left">{t`Built for 2G networks`}</span>
            </motion.div>

            <motion.div
              className="flex flex-col items-center lg:items-start p-gutter-sm rounded-base border border-safe/20 bg-safe/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.25, ease: [0.4, 0, 0.6, 1] }}
            >
              <FileIcon className="w-6 h-6 text-safe mb-gutter-xs" weight="bold" />
              <span className="text-sm font-semibold text-foreground">{t`Export Anytime`}</span>
              <span className="text-xs text-foreground/60 text-center lg:text-left">{t`You control your data`}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT: Visual (Consciousness Gating - Real Outcome Feedback) */}
        <motion.div
          className="mt-6 sm:mt-gutter-lg lg:mt-0 px-2 sm:px-0"
          viewport={{ once: true }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.4, 0, 0.6, 1] }}
        >
          <div className="relative">
            <Tilt {...defaultTiltProps}>
              <img
                width={3600}
                height={2078}
                src="/screenshots/builder.jpg"
                alt="Elevate - Screenshot - Builder Screen"
                className="w-full h-auto rounded-lg shadow-2xl ring-2 ring-primary/10"
              />
            </Tilt>
            {/* Offline Indicator - Teal (Limbic Safety) */}
            <div className="absolute top-gutter-sm right-gutter-sm flex items-center gap-gutter-xs px-gutter-sm py-gutter-xs rounded-base bg-safe/90 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-safe-foreground animate-pulse" />
              <span className="text-xs font-medium text-safe-foreground">{t`Local`}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
