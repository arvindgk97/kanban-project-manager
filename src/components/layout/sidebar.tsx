import * as React from "react";
import { X, Sparkles } from "lucide-react";
import { WorkspaceSwitcher } from "@/components/navigation/workspace-switcher";
import { SidebarNav } from "@/components/navigation/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  onNewProject?: () => void;
}

export function Sidebar({ mobileOpen, onCloseMobile, onNewProject }: SidebarProps) {
  return (
    <>
      {/* MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 flex w-64 flex-col border-r border-border/70 bg-card/50 backdrop-blur-sm transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* MOBILE CLOSE HEADER */}
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-border/50">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation Menu
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseMobile}
            className="size-8 text-muted-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* SIDEBAR CONTENT */}
        <div className="flex flex-col flex-1 gap-6 p-4 overflow-y-auto">
          {/* WORKSPACE SWITCHER */}
          <WorkspaceSwitcher onNewProject={onNewProject} />

          <Separator className="bg-border/60" />

          {/* MAIN & PROJECTS NAVIGATION */}
          <SidebarNav onItemClick={onCloseMobile} />
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="p-4 border-t border-border/60 bg-muted/20">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-600 dark:text-indigo-400" />
              <div className="flex flex-col text-[11px]">
                <span className="font-semibold text-foreground">Pro Tier</span>
                <span className="text-muted-foreground">Unlimited Projects</span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground font-semibold">
              M1 static
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
