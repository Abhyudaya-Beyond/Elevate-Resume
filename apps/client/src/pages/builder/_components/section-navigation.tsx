import { t } from "@lingui/macro";
import type { SectionKey } from "@elevate/schema";
import { Button, ScrollArea } from "@elevate/ui";
import { cn } from "@elevate/utils";
import { motion } from "framer-motion";

import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "../sidebars/left/sections/shared/section-icon";

/**
 * Section Navigation - Left Panel
 * 
 * Neurobiological Design Principles:
 * - Deep Slate active button = institutional trust (prefrontal activation)
 * - Clear section boundaries = reduced cognitive load
 * - Touch targets (44px) = motor planning
 * - Max 7-9 visible = working memory limit
 */
const sections: Array<{ id: SectionKey; label: string }> = [
  { id: "basics", label: t`Overview` },
  { id: "summary", label: t`Summary` },
  { id: "profiles", label: t`Profiles` },
  { id: "experience", label: t`Experience` },
  { id: "education", label: t`Education` },
  { id: "skills", label: t`Skills` },
  { id: "languages", label: t`Languages` },
  { id: "certifications", label: t`Certifications` },
  { id: "projects", label: t`Projects` },
  { id: "publications", label: t`Publications` },
  { id: "volunteer", label: t`Volunteer` },
  { id: "awards", label: t`Awards` },
  { id: "interests", label: t`Interests` },
  { id: "references", label: t`References` },
];

export const SectionNavigation = () => {
  const activeSection = useBuilderStore((state) => state.activeSection);
  const setActiveSection = useBuilderStore((state) => state.setActiveSection);
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);

  const scrollToSection = (sectionId: SectionKey) => {
    setActiveSection(sectionId);
    // Scroll to the section in the form panel
    // Use a small delay to ensure the form panel is rendered
    setTimeout(() => {
      const sectionElement = document.querySelector(`#${sectionId}`);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        // Add a small offset for the header
        window.scrollBy(0, -80);
      }
    }, 100);
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-background">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-gutter-xs p-gutter-sm">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const icon = getSectionIcon(section.id, { size: 18 });

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex h-11 items-center gap-gutter-sm rounded-sm px-gutter-sm text-left transition-all duration-perceptible",
                  isActive
                    ? "bg-primary-700 text-neutral-50 shadow-sm"
                    : "text-primary hover:bg-secondary/50",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <span className="flex-shrink-0">{icon}</span>
                <span className="text-sm font-medium">{section.label}</span>
              </motion.button>
            );
          })}

          {/* Custom Sections */}
          {Object.values(customSections).map((section) => {
            const sectionId = `custom.${section.id}` as SectionKey;
            const isActive = activeSection === sectionId;

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(sectionId)}
                className={cn(
                  "flex h-11 items-center gap-gutter-sm rounded-sm px-gutter-sm text-left transition-all duration-perceptible",
                  isActive
                    ? "bg-primary-700 text-neutral-50 shadow-sm"
                    : "text-primary hover:bg-secondary/50",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <span className="flex-shrink-0">{getSectionIcon("custom", { size: 18 })}</span>
                <span className="text-sm font-medium">{section.name}</span>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

