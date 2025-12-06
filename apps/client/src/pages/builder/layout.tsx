import { useBreakpoint } from "@elevate/hooks";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  VisuallyHidden,
} from "@elevate/ui";
import { cn } from "@elevate/utils";
import { motion } from "framer-motion";

import { useBuilderStore } from "@/client/stores/builder";

import { BuilderHeader } from "./_components/header";
import { BuilderToolbar } from "./_components/toolbar";
import { PreviewPanel } from "./_components/preview-panel";
import { SectionNavigation } from "./_components/section-navigation";
import { LeftSidebar } from "./sidebars/left";
import { RightSidebar } from "./sidebars/right";

const onOpenAutoFocus = (event: Event) => {
  event.preventDefault();
};

/**
 * Builder Layout - Three-Panel Consciousness-First Design
 * 
 * Neurobiological Design Principles:
 * - Three-panel = Split-brain architecture
 * - Left = Prefrontal planning (which section to edit?)
 * - Center = Limbic input zone (safe form entry)
 * - Right = Consciousness gating (real outcome feedback)
 */
export const BuilderLayout = () => {
  const { isDesktop } = useBreakpoint();

  const sheet = useBuilderStore((state) => state.sheet);
  const rightSetSize = useBuilderStore((state) => state.panel.right.setSize);
  const rightHandle = useBuilderStore((state) => state.panel.right.handle);

  // Desktop: Three-panel layout (lg breakpoint = 1024px)
  if (isDesktop) {
    return (
      <div className="relative flex h-screen flex-col overflow-hidden">
        {/* Top Header */}
        <BuilderHeader />

        {/* Three-Panel Layout - Elevate Builder Structure */}
        <PanelGroup direction="horizontal" className="flex flex-1 overflow-hidden">
          {/* Left Panel: LeftSidebar (with vertical toolbar + form sections) */}
          <Panel defaultSize={30} minSize={20} maxSize={40} className="overflow-hidden border-r border-border">
            <LeftSidebar />
          </Panel>
          <PanelResizeHandle />
          
          {/* Center Panel: Preview (live resume preview) */}
          <Panel defaultSize={45} minSize={30} maxSize={60} className="overflow-hidden">
            <PreviewPanel />
          </Panel>
          <PanelResizeHandle
            isDragging={rightHandle.isDragging}
            onDragging={rightHandle.setDragging}
          />
          
          {/* Right Panel: RightSidebar (Template, Layout, Theme, etc.) */}
          <Panel
            minSize={25}
            maxSize={50}
            defaultSize={25}
            className={cn(
              "z-10 flex min-w-[350px] overflow-hidden bg-background border-l border-border",
              !rightHandle.isDragging && "transition-[flex]",
            )}
            onResize={rightSetSize}
            style={{ minWidth: "350px" }}
          >
            <RightSidebar />
          </Panel>
        </PanelGroup>

        {/* Bottom Toolbar */}
        <BuilderToolbar />
      </div>
    );
  }

  // Mobile/Tablet: Stacked layout with drawers
  return (
    <div className="relative flex h-screen flex-col">
      {/* Top Header */}
      <BuilderHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <LeftSidebar />
      </div>

      {/* Bottom Toolbar */}
      <BuilderToolbar />

      {/* Left Navigation Drawer */}
      <Sheet open={sheet.left.open} onOpenChange={sheet.left.setOpen}>
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
        </VisuallyHidden>
        <SheetContent
          side="left"
          showClose={false}
          className="top-16 w-64 p-0"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <SectionNavigation />
        </SheetContent>
      </Sheet>

      {/* Right Settings Drawer */}
      <Sheet open={sheet.right.open} onOpenChange={sheet.right.setOpen}>
        <SheetContent
          side="right"
          showClose={false}
          className="top-16 w-full p-0 sm:w-[500px]"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
          </VisuallyHidden>
          <PanelGroup direction="vertical" className="h-full">
            <Panel defaultSize={60} minSize={30} maxSize={80} className="overflow-hidden">
              <RightSidebar />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={40} minSize={20} maxSize={70} className="overflow-hidden border-t border-border">
              <PreviewPanel />
            </Panel>
          </PanelGroup>
        </SheetContent>
      </Sheet>
    </div>
  );
};
