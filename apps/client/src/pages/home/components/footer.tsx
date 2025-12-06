import { t } from "@lingui/macro";
import { Separator } from "@elevate/ui";
import { Link } from "react-router";

import { Copyright } from "@/client/components/copyright";
import { LocaleSwitch } from "@/client/components/locale-switch";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";

/**
 * Footer - Bottom Section
 * 
 * Neurobiological Design Principles:
 * - White/Cream background = reduced cognitive load
 * - Clear links = prefrontal navigation
 * - Centered layout = balanced attention
 */
export const Footer = () => (
  <footer className="bg-background border-t border-border">
    <div className="mx-auto max-w-7xl px-gutter py-gutter-lg">
      <div className="grid grid-cols-1 gap-gutter-lg sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column */}
        <div className="flex flex-col gap-gutter-sm">
          <Logo size={96} className="-ml-2" />
          <h2 className="text-xl font-bold text-primary">{t`Elevate`}</h2>
          <p className="text-sm leading-relaxed text-foreground/60">
            {t`Your resume. Your story. Your control. A privacy-first resume builder that puts you in control of your data and narrative.`}
          </p>
          <Copyright className="mt-gutter-sm" />
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-gutter-sm">
          <h3 className="text-sm font-semibold text-primary">{t`Product`}</h3>
          <Link to="/" className="text-sm text-foreground/60 transition-colors duration-perceptible hover:text-foreground">
            {t`Features`}
          </Link>
          <Link to="/" className="text-sm text-foreground/60 transition-colors duration-perceptible hover:text-foreground">
            {t`Templates`}
          </Link>
          <Link to="/" className="text-sm text-foreground/60 transition-colors duration-perceptible hover:text-foreground">
            {t`Pricing`}
          </Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-gutter-sm">
          <h3 className="text-sm font-semibold text-primary">{t`Company`}</h3>
          <Link to="/meta/privacy-policy" className="text-sm text-foreground/60 transition-colors duration-perceptible hover:text-foreground">
            {t`Privacy Policy`}
          </Link>
          <Link to="/" className="text-sm text-foreground/60 transition-colors duration-perceptible hover:text-foreground">
            {t`Terms of Service`}
          </Link>
          <Link to="/" className="text-sm text-foreground/60 transition-colors duration-perceptible hover:text-foreground">
            {t`About`}
          </Link>
        </div>

        {/* Links Column 3 - Settings */}
        <div className="flex flex-col items-start gap-gutter-sm sm:items-end lg:items-start">
          <div className="flex gap-gutter-sm">
            <LocaleSwitch />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  </footer>
);
