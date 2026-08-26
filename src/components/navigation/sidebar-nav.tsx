"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_GENERAL_NAV, MOCK_PROJECTS } from "@/constants/mock-data";

interface SidebarNavProps {
  className?: string;
  onItemClick?: () => void;
}

export function SidebarNav({ className, onItemClick }: SidebarNavProps) {
  const pathname = usePathname();

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "LayoutDashboard":
        return <LayoutDashboard className="size-4" />;
      case "FolderKanban":
        return <FolderKanban className="size-4" />;
      default:
        return <FolderKanban className="size-4" />;
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* GENERAL SECTION */}
      <div className="flex flex-col gap-1.5">
        <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase px-2">
          General
        </div>
        <nav className="flex flex-col gap-1">
          {MOCK_GENERAL_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2.5 py-2 text-xs font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                    : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                )}
              >
                {getIcon(item.icon)}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* PROJECTS SECTION */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-2">
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Projects
          </span>
          <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded-full font-medium text-muted-foreground">
            {MOCK_PROJECTS.length}
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {MOCK_PROJECTS.map((project) => {
            const projectHref = `/projects/${project.slug}`;
            const isActive = pathname === projectHref;
            return (
              <Link
                key={project.id}
                href={projectHref}
                onClick={onItemClick}
                className={cn(
                  "flex items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-accent/90 text-foreground font-semibold border-l-2 border-primary pl-2"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="size-2 rounded-full shrink-0"
                    style={{ backgroundColor: project.color || "#6366f1" }}
                  />
                  <span className="truncate">{project.name}</span>
                </div>
                <span className="text-[10px] text-muted-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.taskCount} tasks
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
