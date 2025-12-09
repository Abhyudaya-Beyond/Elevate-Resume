import { t } from "@lingui/macro";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { Button, Separator } from "@elevate/ui";
import { Fragment, useEffect, useRef } from "react";
import type {
  Award,
  Certification,
  CustomSection,
  Education,
  Experience,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  Skill,
  Volunteer,
} from "@elevate/schema";
import { ScrollArea } from "@elevate/ui";
import { motion } from "framer-motion";

import { useResumeStore } from "@/client/stores/resume";

import { BasicsSection } from "../sidebars/left/sections/basics";
import { SectionBase } from "../sidebars/left/sections/shared/section-base";
import { SummarySection } from "../sidebars/left/sections/summary";

/**
 * Form Panel - Center Panel
 * 
 * Shows ALL sections in a scrollable list (like the old design)
 * Neurobiological Design Principles:
 * - Cream background = reduced cognitive load (soft on eyes)
 * - White form cards = clean, organized (prefrontal order)
 * - Gold focus rings = dopamine trigger (input engagement)
 * - Grouped fields = working memory chunking
 * - All sections visible = prefrontal planning (see full picture)
 */
export const FormPanel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const addSection = useResumeStore((state) => state.addSection);
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);
  const expandAllSections = useResumeStore((state) => state.expandAllSections);
  const collapseAllSections = useResumeStore((state) => state.collapseAllSections);

  // Expand all sections on mount so user can see all form fields
  useEffect(() => {
    expandAllSections();
  }, [expandAllSections]);

  const scrollIntoView = (selector: string) => {
    const section = containerRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-full w-full bg-background">
      <ScrollArea className="h-full w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.6, 1] }}
          ref={containerRef}
          className="mx-auto max-w-3xl grid gap-y-8 px-gutter py-gutter-lg"
        >
        <BasicsSection />
        <Separator />
        <SummarySection />
        <Separator />
        <SectionBase<Profile>
          id="profiles"
          title={(item) => item.network}
          description={(item) => item.username}
        />
        <Separator />
        <SectionBase<Experience>
          id="experience"
          title={(item) => item.company}
          description={(item) => item.position}
        />
        <Separator />
        <SectionBase<Education>
          id="education"
          title={(item) => item.institution}
          description={(item) => item.area}
        />
        <Separator />
        <SectionBase<Skill>
          id="skills"
          title={(item) => item.name}
          description={(item) => {
            if (item.description) return item.description;
            if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
          }}
        />
        <Separator />
        <SectionBase<Language>
          id="languages"
          title={(item) => item.name}
          description={(item) => item.description}
        />
        <Separator />
        <SectionBase<Award>
          id="awards"
          title={(item) => item.title}
          description={(item) => item.awarder}
        />
        <Separator />
        <SectionBase<Certification>
          id="certifications"
          title={(item) => item.name}
          description={(item) => item.issuer}
        />
        <Separator />
        <SectionBase<Interest>
          id="interests"
          title={(item) => item.name}
          description={(item) => {
            if (item.keywords.length > 0) return `${item.keywords.length} keywords`;
          }}
        />
        <Separator />
        <SectionBase<Project>
          id="projects"
          title={(item) => item.name}
          description={(item) => item.description}
        />
        <Separator />
        <SectionBase<Publication>
          id="publications"
          title={(item) => item.name}
          description={(item) => item.publisher}
        />
        <Separator />
        <SectionBase<Volunteer>
          id="volunteer"
          title={(item) => item.organization}
          description={(item) => item.position}
        />
        <Separator />
        <SectionBase<Reference>
          id="references"
          title={(item) => item.name}
          description={(item) => item.description}
        />

        {/* Custom Sections */}
        {Object.values(customSections).map((section) => (
          <Fragment key={section.id}>
            <Separator />
            <SectionBase<CustomSection>
              id={`custom.${section.id}`}
              title={(item) => item.name}
              description={(item) => item.description}
            />
          </Fragment>
        ))}

        <Separator />

        <div className="flex flex-col gap-4">
          <Button size="lg" variant="outline" onClick={addSection}>
            <PlusCircleIcon />
            <span className="ml-2">{t`Add a new section`}</span>
          </Button>

          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" onClick={expandAllSections}>
              {t`Expand All`}
            </Button>
            <Button variant="outline" onClick={collapseAllSections}>
              {t`Collapse All`}
            </Button>
          </div>
        </div>
      </motion.div>
      </ScrollArea>
    </div>
  );
};

