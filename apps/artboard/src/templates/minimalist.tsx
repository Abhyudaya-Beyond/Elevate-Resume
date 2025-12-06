/**
 * MODERN MINIMALIST TEMPLATE
 * 
 * Design Philosophy:
 * - Clean, white space-focused design
 * - Sans-serif typography (Inter/System fonts)
 * - Minimal borders and decorations
 * - Gray/black color scheme
 * - Professional and modern
 */

import type {
  Award,
  Certification,
  CustomSection,
  CustomSectionGroup,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  SectionKey,
  SectionWithItem,
  Skill,
  URL,
} from "@elevate/schema";
import { Education, Experience, Volunteer } from "@elevate/schema";
import { cn, isEmptyString, isUrl, linearTransform, sanitize } from "@elevate/utils";
import get from "lodash.get";
import React, { Fragment } from "react";

import { BrandIcon } from "../components/brand-icon";
import { Picture } from "../components/picture";
import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);

  return (
    <div className="mb-6 border-b border-gray-300 pb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-3xl font-light tracking-tight text-gray-900">{basics.name}</div>
          {basics.headline && (
            <div className="mt-1 text-base font-normal text-gray-600">{basics.headline}</div>
          )}
        </div>
        <Picture />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-700">
        {basics.location && (
          <div className="flex items-center gap-x-1">
            <span>{basics.location}</span>
          </div>
        )}
        {basics.phone && (
          <div className="flex items-center gap-x-1">
            <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer" className="hover:underline">
              {basics.phone}
            </a>
          </div>
        )}
        {basics.email && (
          <div className="flex items-center gap-x-1">
            <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer" className="hover:underline">
              {basics.email}
            </a>
          </div>
        )}
        {isUrl(basics.url.href) && (
          <a href={basics.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
            {basics.url.label || basics.url.href}
          </a>
        )}
      </div>
    </div>
  );
};

const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id} className="mb-5">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-900">{section.name}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
        className="wysiwyg text-sm leading-relaxed text-gray-700"
      />
    </section>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => (
  <div className="relative h-1 w-24 bg-gray-200">
    <div
      className="absolute inset-0 h-1 bg-gray-800"
      style={{ width: linearTransform(level, 0, 5, 0, 100) + "%" }}
    />
  </div>
);

type LinkProps = { url: URL; label?: string; className?: string };

const Link = ({ url, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;
  return (
    <a
      href={url.href}
      target="_blank"
      rel="noreferrer noopener nofollow"
      className={cn("text-xs text-gray-600 hover:underline", className)}
    >
      {label || url.label || url.href}
    </a>
  );
};

type SectionProps<T> = {
  section: SectionWithItem<T> | CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || section.items.filter((item) => item.visible).length === 0) return null;

  return (
    <section id={section.id} className="mb-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">{section.name}</h3>
      <div className="space-y-4">
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div key={item.id} className={cn("space-y-1", className)}>
                <div>{children?.(item as T)}</div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    className="wysiwyg text-xs leading-relaxed text-gray-700"
                  />
                )}

                {level !== undefined && level > 0 && (
                  <div className="mt-1">
                    <Rating level={level} />
                  </div>
                )}

                {keywords !== undefined && keywords.length > 0 && (
                  <p className="text-xs text-gray-600">{keywords.join(" • ")}</p>
                )}

                {url !== undefined && section.separateLinks && <Link url={url} />}
              </div>
            );
          })}
      </div>
    </section>
  );
};

const Profiles = () => {
  const section = useArtboardStore((state) => state.resume.sections.profiles);

  return (
    <Section<Profile> section={section}>
      {(item) => (
        <div className="flex items-center gap-x-2">
          {isUrl(item.url.href) ? (
            <a
              href={item.url.href}
              target="_blank"
              rel="noreferrer noopener nofollow"
              className="flex items-center gap-x-1.5 text-xs text-gray-700 hover:underline"
            >
              <BrandIcon slug={item.icon} />
              <span>{item.username}</span>
            </a>
          ) : (
            <div className="flex items-center gap-x-1.5 text-xs">
              <BrandIcon slug={item.icon} />
              <span>{item.username}</span>
            </div>
          )}
        </div>
      )}
    </Section>
  );
};

const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);

  return (
    <Section<Experience> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{item.position}</div>
              <div className="text-sm text-gray-700">
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
                    {item.company}
                  </a>
                ) : (
                  item.company
                )}
              </div>
            </div>
            <div className="text-xs text-gray-600">{item.date}</div>
          </div>
          {item.location && <div className="mt-0.5 text-xs text-gray-600">{item.location}</div>}
        </div>
      )}
    </Section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);

  return (
    <Section<Education> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{item.area}</div>
              <div className="text-sm text-gray-700">
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
                    {item.institution}
                  </a>
                ) : (
                  item.institution
                )}
              </div>
            </div>
            <div className="text-xs text-gray-600">{item.date}</div>
          </div>
          {item.studyType && <div className="mt-0.5 text-xs text-gray-600">{item.studyType}</div>}
          {item.score && <div className="mt-0.5 text-xs text-gray-600">{item.score}</div>}
        </div>
      )}
    </Section>
  );
};

const Skills = () => {
  const section = useArtboardStore((state) => state.resume.sections.skills);

  return (
    <Section<Skill> section={section} levelKey="level" keywordsKey="keywords">
      {(item) => (
        <div>
          <div className="font-medium text-gray-900">{item.name}</div>
          {item.description && <div className="text-xs text-gray-600">{item.description}</div>}
        </div>
      )}
    </Section>
  );
};

const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  return (
    <Section<Language> section={section} levelKey="level">
      {(item) => (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">{item.name}</span>
          {item.description && <span className="text-xs text-gray-600">{item.description}</span>}
        </div>
      )}
    </Section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  return (
    <Section<Project> section={section} urlKey="url" summaryKey="summary" keywordsKey="keywords">
      {(item) => (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>
              {item.description && <div className="mt-0.5 text-xs text-gray-600">{item.description}</div>}
            </div>
            {item.date && <div className="text-xs text-gray-600">{item.date}</div>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  return (
    <Section<Award> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{item.title}</div>
              {item.awarder && (
                <div className="text-sm text-gray-700">
                  {isUrl(item.url.href) ? (
                    <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
                      {item.awarder}
                    </a>
                  ) : (
                    item.awarder
                  )}
                </div>
              )}
            </div>
            {item.date && <div className="text-xs text-gray-600">{item.date}</div>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Certifications = () => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);

  return (
    <Section<Certification> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{item.name}</div>
              {item.issuer && (
                <div className="text-sm text-gray-700">
                  {isUrl(item.url.href) ? (
                    <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
                      {item.issuer}
                    </a>
                  ) : (
                    item.issuer
                  )}
                </div>
              )}
            </div>
            {item.date && <div className="text-xs text-gray-600">{item.date}</div>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  return (
    <Section<Interest> section={section} keywordsKey="keywords">
      {(item) => (
        <div className="text-sm text-gray-900">
          {item.name}
          {item.keywords.length > 0 && (
            <span className="ml-2 text-xs text-gray-600">({item.keywords.join(", ")})</span>
          )}
        </div>
      )}
    </Section>
  );
};

const Publications = () => {
  const section = useArtboardStore((state) => state.resume.sections.publications);

  return (
    <Section<Publication> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>
              {item.publisher && <div className="mt-0.5 text-sm text-gray-700">{item.publisher}</div>}
            </div>
            {item.date && <div className="text-xs text-gray-600">{item.date}</div>}
          </div>
        </div>
      )}
    </Section>
  );
};

const Volunteer = () => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);

  return (
    <Section<Volunteer> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{item.position}</div>
              <div className="text-sm text-gray-700">
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
                    {item.organization}
                  </a>
                ) : (
                  item.organization
                )}
              </div>
            </div>
            <div className="text-xs text-gray-600">{item.date}</div>
          </div>
          {item.location && <div className="mt-0.5 text-xs text-gray-600">{item.location}</div>}
        </div>
      )}
    </Section>
  );
};

const References = () => {
  const section = useArtboardStore((state) => state.resume.sections.references);

  return (
    <Section<Reference> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-semibold text-gray-900">{item.name}</div>
          {item.description && <div className="mt-0.5 text-xs text-gray-600">{item.description}</div>}
        </div>
      )}
    </Section>
  );
};

const Custom = ({ id }: { id: string }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);

  return (
    <Section<CustomSection>
      section={section}
      urlKey="url"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item) => (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>
              {item.description && <div className="mt-0.5 text-xs text-gray-600">{item.description}</div>}
            </div>
            {item.date && <div className="text-xs text-gray-600">{item.date}</div>}
          </div>
          {item.location && <div className="mt-0.5 text-xs text-gray-600">{item.location}</div>}
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: SectionKey) => {
  switch (section) {
    case "profiles":
      return <Profiles />;
    case "summary":
      return <Summary />;
    case "experience":
      return <Experience />;
    case "education":
      return <Education />;
    case "awards":
      return <Awards />;
    case "certifications":
      return <Certifications />;
    case "skills":
      return <Skills />;
    case "interests":
      return <Interests />;
    case "publications":
      return <Publications />;
    case "volunteer":
      return <Volunteer />;
    case "languages":
      return <Languages />;
    case "projects":
      return <Projects />;
    case "references":
      return <References />;
    default: {
      if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} />;
      return null;
    }
  }
};

export const Minimalist = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main] = columns;

  return (
    <div className="space-y-4 p-custom font-sans">
      {isFirstPage && <Header />}

      <div className="space-y-5">
        {main.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}
      </div>
    </div>
  );
};

