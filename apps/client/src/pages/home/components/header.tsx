import { t } from "@lingui/macro";
import { motion } from "framer-motion";
import { Link } from "react-router";

import { Button } from "@elevate/ui";
import { Logo } from "@/client/components/logo";
import { useAuthStore } from "@/client/stores/auth";

import { DonationBanner } from "./donation-banner";

/**
 * Header - Top Navigation
 * 
 * Neurobiological Design Principles:
 * - Sticky top = prefrontal attention (clear navigation)
 * - White background = clean, organized
 * - Gold CTA = dopamine trigger (approach motivation)
 * - Smooth transitions = consciousness-aware (150ms)
 */
export const Header = () => {
  const isLoggedIn = useAuthStore((state) => !!state.user);

  return (
    <motion.header
      className="sticky top-0 z-40 h-16 border-b border-border bg-background shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.6, 1] }}
    >
      <DonationBanner />

      <div className="mx-auto max-w-7xl px-gutter">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center transition-opacity duration-perceptible hover:opacity-80">
            <Logo size={48} />
          </Link>

          {/* Right: Navigation */}
          <div className="flex items-center gap-gutter-sm">
            {isLoggedIn ? (
              <Button asChild variant="accent" size="lg" className="h-10 transition-all duration-perceptible hover:scale-105">
                <Link to="/dashboard">{t`Dashboard`}</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="lg" className="h-10 text-primary transition-all duration-perceptible hover:bg-secondary/10">
                  <Link to="/auth/login">{t`Sign in`}</Link>
                </Button>
                <Button asChild variant="accent" size="lg" className="h-10 transition-all duration-perceptible hover:scale-105">
                  <Link to="/auth/login">{t`Get Started`}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
