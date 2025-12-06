import { t } from "@lingui/macro";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "@elevate/ui";
import { motion } from "framer-motion";
import { Link } from "react-router";

import { useAuthStore } from "@/client/stores/auth";

/**
 * CTA Section - Final Call to Action
 * 
 * Neurobiological Design Principles:
 * - Deep Slate background = institutional trust (prefrontal activation)
 * - Gold CTA button = dopamine trigger (approach motivation)
 * - Clear hierarchy = prefrontal clarity
 * - Centered layout = focused attention
 */
export const CTASection = () => {
  const isLoggedIn = useAuthStore((state) => !!state.user);

  return (
    <section id="cta" className="relative bg-primary-700 py-gutter-lg">
      <div className="mx-auto max-w-4xl px-gutter text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.6, 1] }}
        >
          <h2 className="mb-gutter-sm text-3xl font-bold text-neutral-50">
            {t`Ready to elevate your career?`}
          </h2>
          <p className="mb-gutter text-lg text-neutral-100/80">
            {t`Start building your resume today. No credit card required.`}
          </p>
          {isLoggedIn ? (
            <Button asChild variant="accent" size="lg" className="h-12 w-full sm:w-auto transition-all duration-perceptible hover:scale-105">
              <Link to="/dashboard">
                {t`Go to Dashboard`}
                <ArrowRightIcon className="ml-2" size={18} weight="bold" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="accent" size="lg" className="h-12 w-full sm:w-auto transition-all duration-perceptible hover:scale-105">
              <Link to="/auth/login">
                {t`Get Started Free`}
                <ArrowRightIcon className="ml-2" size={18} weight="bold" />
              </Link>
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

