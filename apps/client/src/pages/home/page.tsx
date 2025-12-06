import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";

import { ContributorsSection } from "./sections/contributors";
import { CTASection } from "./sections/cta";
import { FAQSection } from "./sections/faq";
import { FeaturesSection } from "./sections/features";
import { HeroSection } from "./sections/hero";
import { LogoCloudSection } from "./sections/logo-cloud";
import { StatisticsSection } from "./sections/statistics";
import { SupportSection } from "./sections/support";
import { TemplatesSection } from "./sections/templates";
import { TestimonialsSection } from "./sections/testimonials";

export const HomePage = () => {
  const { i18n } = useLingui();

  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />

        <title>
          {t`Elevate`} - {t`Your resume. Your story. Your control.`}
        </title>

        <meta
          name="description"
          content="Build and share a resume that truly represents you—without trackers, dark patterns, or data lock-in. A privacy-first resume builder that puts you in control."
        />
      </Helmet>

      <HeroSection />
      <LogoCloudSection />
      <StatisticsSection />
      <FeaturesSection />
      <TemplatesSection />
      <TestimonialsSection />
      <SupportSection />
      <FAQSection />
      <ContributorsSection />
      <CTASection />
    </main>
  );
};
