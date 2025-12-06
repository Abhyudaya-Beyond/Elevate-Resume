/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@elevate/ui";
import { cn } from "@elevate/utils";

import { useLanguages } from "@/client/services/resume/translation";

// What is Elevate, and why was it built?
const Question1 = () => (
  <AccordionItem value="1">
    <AccordionTrigger className="text-left leading-relaxed">
      What is Elevate, and why was it built?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Elevate is a privacy-first resume builder that puts you in complete control of your data and narrative. 
        Elevate was created to address the growing need for tools that respect user privacy and provide complete data ownership.
      </p>

      <p>
        Most resume builders treat your data as fuel for their algorithms, tracking your usage, selling your 
        information, or locking you into their platform. Elevate flips that model: your data stays under your 
        control, and your resume stays about your story—not our metrics.
      </p>

      <p>
        Elevate is built on the principle that you should own your professional narrative end-to-end. 
        Whether you're a student preparing for your first job, a professional switching careers, or a 
        freelancer building your portfolio, Elevate gives you the tools to create a resume that truly 
        represents you—without trackers, dark patterns, or data lock-in.
      </p>

      <p>
        Our mission is to help people build resumes they fully own, with complete privacy and control. 
        We believe that your career data is yours, and you should be able to take it with you wherever you go.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// How much does it cost to use Elevate?
const Question2 = () => (
  <AccordionItem value="2">
    <AccordionTrigger className="text-left leading-relaxed">
      How much does it cost to use Elevate?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        Elevate is completely free to use. We believe that everyone should have access to tools that 
        help them build their career narrative without financial barriers.
      </p>

      <p>
        We've built Elevate with privacy and user control as core principles. Your data stays yours, 
        and you can export it at any time. There are no hidden fees, no premium tiers, and no data 
        lock-in.
      </p>

      <p>
        If you find Elevate helpful and want to support its development, we'd love to hear from you. 
        Your feedback and support help us continue building a tool that respects your privacy and gives 
        you complete ownership of your resume.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// How can I support Elevate?
const Question3 = () => (
  <AccordionItem value="3">
    <AccordionTrigger className="text-left leading-relaxed">
      How can I support Elevate?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        <strong>If you speak a language other than English</strong>, help us translate Elevate to 
        your language. You can contribute translations through our translation platform and help 
        bring Elevate to more communities around the world.
      </p>

      <p>
        <strong>If you work in the media, are an influencer or have lots of friends</strong>, share
        Elevate with your circles and let them know about a privacy-first alternative to traditional 
        resume builders. If you mention Elevate on your blog or social media, we'd love to hear about it.
      </p>

      <p>
        <strong>If you found a bug or have an idea for a feature</strong>, raise an issue on{" "}
        <a
          href="https://github.com/your-org/elevate/issues/new/choose"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{" "}
        or reach out to us at <a href="mailto:support@elevate.local">support@elevate.local</a>. 
        We can't promise that it'll be done soon, but we'll definitely consider it.
      </p>

      <p>
        <strong>Most importantly</strong>, use Elevate and let us know how it helps you. Your feedback 
        and stories help us understand what matters most to users and guide our development priorities.
      </p>
    </AccordionContent>
  </AccordionItem>
);

// What languages are supported on Elevate?
const Question4 = () => {
  const { languages } = useLanguages();

  return (
    <AccordionItem value="4">
      <AccordionTrigger className="text-left leading-relaxed">
        What languages are supported on Elevate?
      </AccordionTrigger>
      <AccordionContent className="prose max-w-none dark:prose-invert">
        <p>
          Here are the languages currently supported by Elevate, along with their respective
          completion percentages.
        </p>

        <div className="flex flex-wrap items-start justify-start gap-x-2 gap-y-4">
          {languages.map((language) => (
            <a
              key={language.id}
              className="no-underline"
              href={`https://crowdin.com/translate/elevate/all/en-${language.editorCode}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="relative bg-secondary-accent font-medium transition-colors hover:bg-primary hover:text-background">
                <span className="px-2 py-1">{language.name}</span>

                {language.progress !== undefined && (
                  <span
                    className={cn(
                      "inset-0 bg-warning px-1.5 py-1 text-xs text-white",
                      language.progress < 40 && "bg-error",
                      language.progress > 80 && "bg-success",
                    )}
                  >
                    {language.progress}%
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <p>
          If you'd like to improve the translations for your language, please{" "}
          <a href="https://crowdin.com/project/elevate" rel="noreferrer" target="_blank">
            sign up as a translator on Crowdin
          </a>{" "}
          and join the project. You can also choose to be notified of any new phrases that get added
          to the app.
        </p>

        <p>
          If a language is missing from this list, please raise an issue on GitHub requesting its
          inclusion, and we will make sure to add it as soon as possible.
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};

// How does the OpenAI Integration work?
const Question5 = () => (
  <AccordionItem value="5">
    <AccordionTrigger className="text-left leading-relaxed">
      How does the OpenAI Integration work?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        OpenAI integration allows you to leverage AI to help you build the perfect resume. You can 
        choose to enter your own OpenAI API key on the Settings page (under OpenAI Integration).
      </p>

      <p>
        <strong>The key is stored in your browser's local storage</strong>, which means that if you
        uninstall your browser, or even clear your data, the key is gone with it. All requests made
        to OpenAI are sent directly to their service and do not hit the app servers at all. Your 
        API key never leaves your browser.
      </p>

      <p>
        You are free to turn off all AI features simply by not adding a key in the Settings page 
        and still make use of all the useful features that Elevate has to offer. You can also use
        ChatGPT or other AI tools to write your content, and simply copy it over to Elevate.
      </p>
    </AccordionContent>
  </AccordionItem>
);

export const FAQSection = () => (
  <section id="faq" className="container relative py-24 sm:py-32">
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>

        <p className="text-base leading-loose">
          Here are some questions we often get asked about Elevate.
        </p>

        <p className="text-sm leading-loose">
          Unfortunately, this section is available only in English, as I do not want to burden
          translators with having to translate these large paragraphs of text.
        </p>
      </div>

      <div className="col-span-2">
        <Accordion collapsible type="single">
          <Question1 />
          <Question2 />
          <Question3 />
          <Question4 />
          <Question5 />
        </Accordion>
      </div>
    </div>
  </section>
);
