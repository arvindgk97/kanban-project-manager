"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectCard } from "@/features/dashboard/components/project-card";
import { MOCK_PROJECTS } from "@/constants/mock-data";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Projects"
        description="Manage, organize, and monitor all active workspace projects."
      >
        <Button className="gap-2 shadow-2xs">
          <Plus className="size-4" />
          <span>New Project</span>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
