import { t } from "@lingui/macro";
import { GridFourIcon, HouseSimpleIcon, LockIcon, SidebarSimpleIcon } from "@phosphor-icons/react";
import { Button, Tooltip } from "@elevate/ui";
import { cn } from "@elevate/utils";
import { Link } from "react-router";

import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

/**
 * Builder Header - Top Bar
 * 
 * Neurobiological Design Principles:
 * - Sticky header = prefrontal attention (clear navigation)
 * - White background = clean, organized
 * - Deep Slate text = institutional trust
 */
export const BuilderHeader = () => {
  const title = useResumeStore((state) => state.resume?.title ?? "");
  const locked = useResumeStore((state) => state.resume?.locked ?? false);

  const toggle = useBuilderStore((state) => state.toggle);
  const isDragging = useBuilderStore(
    (state) => state.panel.right.handle.isDragging,
  );

  const onToggle = (side: "left" | "right") => {
    toggle(side);
  };

  return (
    <div
      className={cn(
        "sticky top-0 z-40 h-16 border-b border-border bg-background shadow-sm",
        !isDragging && "transition-all",
      )}
    >
      <div className="flex h-full items-center justify-between px-gutter">
        {/* Left: Navigation Toggle (Mobile) */}
        <Button
          size="icon"
          variant="ghost"
          className="flex lg:hidden"
          onClick={() => {
            onToggle("left");
          }}
        >
          <SidebarSimpleIcon />
        </Button>

        {/* Center: Title */}
        <div className="flex items-center justify-center gap-x-2">
          <Button asChild size="icon" variant="ghost">
            <Link to="/dashboard/resumes">
              <HouseSimpleIcon />
            </Link>
          </Button>

          <span className="text-xs text-foreground/40">{"/"}</span>

          <h1 className="text-lg font-semibold text-primary">{title}</h1>

          {locked && (
            <Tooltip content={t`This resume is locked, please unlock to make further changes.`}>
              <LockIcon size={14} className="text-foreground/60" />
            </Tooltip>
          )}
        </div>

        {/* Right: Template/Preview Toggle */}
        <div className="flex items-center gap-x-2">
          <Button
            variant="ghost"
            className="hidden lg:flex items-center gap-x-2"
            onClick={() => {
              // Scroll to template section in right sidebar
              const templateSection = document.querySelector("#template");
              if (templateSection) {
                templateSection.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <GridFourIcon size={18} />
            <span className="text-sm font-medium text-primary">{t`Template`}</span>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="flex lg:hidden"
            onClick={() => {
              onToggle("right");
            }}
          >
            <SidebarSimpleIcon className="-scale-x-100" />
          </Button>
        </div>
      </div>
    </div>
  );
};
