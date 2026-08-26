"use client";

import * as React from "react";
import Link from "next/link";
import { FolderKanban, ArrowRight } from "lucide-react";
import { ProjectCard } from "./project-card";
import { MOCK_PROJECTS } from "@/constants/mock-data";

export function RecentProjects() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <FolderKanban className="size-4" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Recent Projects
          </h2>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-accent/60 transition-colors font-medium"
        >
          <span>View All ({MOCK_PROJECTS.length})</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
