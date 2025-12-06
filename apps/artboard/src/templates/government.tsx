/**
 * GOVERNMENT TEMPLATE
 * 
 * Design Philosophy:
 * - Official, traditional, strict format
 * - Times New Roman style serif typography
 * - Black/blue color scheme, minimal color
 * - Structured, formal sections
 * - Perfect for government jobs, public sector
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
    <div className="mb-5 border-b-2 border-black pb-3">
      <div className="text-center">
        <div className="text-2xl font-bold text-black" style={{ fontFamily: "Times New Roman, serif" }}>{basics.name}</div>
        {basics.headline && (
          <div className="mt-1 text-sm text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{basics.headline}</div>
        )}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>
          {basics.location && <span>{basics.location}</span>}
          {basics.phone && (
            <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer" className="hover:underline">
              {basics.phone}
            </a>
          )}
          {basics.email && (
            <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer" className="hover:underline">
              {basics.email}
            </a>
          )}
          {isUrl(basics.url.href) && (
            <a href={basics.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline">
              {basics.url.label || basics.url.href}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id} className="mb-4">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5" style={{ fontFamily: "Times New Roman, serif" }}>
        {section.name}
      </h3>
      <div
        dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
        className="wysiwyg text-xs leading-relaxed text-black mt-2"
        style={{ fontFamily: "Times New Roman, serif" }}
      />
    </section>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => (
  <div className="relative h-1 w-20 bg-gray-400">
    <div
      className="absolute inset-0 h-1 bg-black"
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
      className={cn("text-xs text-blue-800 hover:underline", className)}
      style={{ fontFamily: "Times New Roman, serif" }}
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
    <section id={section.id} className="mb-4">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5" style={{ fontFamily: "Times New Roman, serif" }}>
        {section.name}
      </h3>
      <div className="space-y-2 mt-2">
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div key={item.id} className={cn("space-y-0.5", className)}>
                <div>{children?.(item as T)}</div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    className="wysiwyg text-xs leading-relaxed text-black"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  />
                )}

                {level !== undefined && level > 0 && (
                  <div className="mt-1">
                    <Rating level={level} />
                  </div>
                )}

                {keywords !== undefined && keywords.length > 0 && (
                  <p className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{keywords.join(", ")}</p>
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
              className="flex items-center gap-x-1.5 text-xs text-blue-800 hover:underline"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              <BrandIcon slug={item.icon} />
              <span>{item.username}</span>
            </a>
          ) : (
            <div className="flex items-center gap-x-1.5 text-xs text-black" style={{ fontFamily: "Times New Roman, serif" }}>
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
              <div className="font-bold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>{item.position}</div>
              <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline text-blue-800">
                    {item.company}
                  </a>
                ) : (
                  item.company
                )}
              </div>
            </div>
            <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.date}</div>
          </div>
          {item.location && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.location}</div>}
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
              <div className="font-bold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>{item.area}</div>
              <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline text-blue-800">
                    {item.institution}
                  </a>
                ) : (
                  item.institution
                )}
              </div>
            </div>
            <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.date}</div>
          </div>
          {item.studyType && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.studyType}</div>}
          {item.score && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.score}</div>}
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
          <div className="font-semibold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>{item.name}</div>
          {item.description && <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.description}</div>}
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
          <span className="text-xs font-semibold text-black" style={{ fontFamily: "Times New Roman, serif" }}>{item.name}</span>
          {item.description && <span className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.description}</span>}
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
              <div className="font-bold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline text-blue-800">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>
              {item.description && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.description}</div>}
            </div>
            {item.date && <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.date}</div>}
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
              <div className="font-bold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>{item.title}</div>
              {item.awarder && (
                <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>
                  {isUrl(item.url.href) ? (
                    <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline text-blue-800">
                      {item.awarder}
                    </a>
                  ) : (
                    item.awarder
                  )}
                </div>
              )}
            </div>
            {item.date && <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.date}</div>}
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
              <div className="font-bold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>{item.name}</div>
              {item.issuer && (
                <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>
                  {isUrl(item.url.href) ? (
                    <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline text-blue-800">
                      {item.issuer}
                    </a>
                  ) : (
                    item.issuer
                  )}
                </div>
              )}
            </div>
            {item.date && <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.date}</div>}
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
        <div className="text-xs font-semibold text-black" style={{ fontFamily: "Times New Roman, serif" }}>
          {item.name}
          {item.keywords.length > 0 && (
            <span className="ml-2 text-xs text-gray-800 font-normal">({item.keywords.join(", ")})</span>
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
              <div className="font-bold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline text-blue-800">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>
              {item.publisher && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.publisher}</div>}
            </div>
            {item.date && <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.date}</div>}
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
              <div className="font-bold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>{item.position}</div>
              <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline text-blue-800">
                    {item.organization}
                  </a>
                ) : (
                  item.organization
                )}
              </div>
            </div>
            <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.date}</div>
          </div>
          {item.location && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.location}</div>}
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
          <div className="font-semibold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>{item.name}</div>
          {item.description && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.description}</div>}
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
              <div className="font-bold text-black text-xs" style={{ fontFamily: "Times New Roman, serif" }}>
                {isUrl(item.url.href) ? (
                  <a href={item.url.href} target="_blank" rel="noreferrer noopener nofollow" className="hover:underline text-blue-800">
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>
              {item.description && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.description}</div>}
            </div>
            {item.date && <div className="text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.date}</div>}
          </div>
          {item.location && <div className="mt-0.5 text-xs text-gray-800" style={{ fontFamily: "Times New Roman, serif" }}>{item.location}</div>}
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

export const Government = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main] = columns;

  return (
    <div className="space-y-3 p-custom" style={{ fontFamily: "Times New Roman, serif" }}>
      {isFirstPage && <Header />}

      <div className="space-y-3">
        {main.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}
      </div>
    </div>
  );
};
