import { t } from "@lingui/macro";

export const SupportSection = () => (
  <section
    id="support"
    className="relative space-y-12 bg-secondary-accent py-24 text-primary sm:py-32"
  >
    <div className="container space-y-6">
      <h1 className="text-4xl font-bold">{t`Supporting Elevate`}</h1>

      <p className="max-w-4xl leading-loose">
        {t`Elevate is a privacy-first, open-source resume builder that puts you in control of your data and narrative. Your support helps us continue building a tool that respects your privacy and gives you complete ownership of your resume. If you're inclined to contribute, and only if you can afford to, consider making a donation through any of the listed platforms.`}
      </p>

      <div className="flex items-center gap-x-10">
        <p className="text-sm opacity-75">
          {t`Support options coming soon. For now, reach out at support@elevate.local`}
        </p>
      </div>

      <p className="max-w-4xl leading-loose">
        {t`If you're multilingual, we'd love your help in bringing Elevate to more languages and communities. Don't worry if you don't see your language on the list - reach out at support@elevate.local, and we'll make sure to include it.`}
      </p>

      <p className="max-w-4xl leading-loose">
        {t`Even if you're not in a position to contribute financially, you can still make a difference by giving the GitHub repository a star, spreading the word to your friends, or dropping a quick message to let us know how Elevate has helped you. Your feedback and support are always welcome and much appreciated!`}
      </p>
    </div>
  </section>
);
