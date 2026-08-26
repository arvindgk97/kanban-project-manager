"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, ArrowRight, Users } from "lucide-react";
import { ProjectItem } from "@/types/dashboard";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const percentage = Math.round(
    (project.completedTaskCount / Math.max(project.taskCount, 1)) * 100
  );

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border border-border/70 bg-card hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-xl font-bold text-white text-sm shadow-2xs"
              style={{ backgroundColor: project.color || "#6366f1" }}
            >
              {project.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <Link
                href={`/projects/${project.slug}`}
                className="font-bold text-base text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1"
              >
                {project.name}
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="size-3 text-muted-foreground/70" />
                  {project.updatedAt}
                </span>
              </div>
            </div>
          </div>

          <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-0.5">
            {project.taskCount} tasks
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="px-5 py-3">
        {/* PROGRESS BAR */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-medium">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-semibold">
              {project.completedTaskCount}/{project.taskCount} ({percentage}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 py-3 border-t border-border/50 bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
          <Users className="size-3.5 text-muted-foreground" />
          <span>{project.membersCount} members</span>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          <span>Open Board</span>
          <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  );
}
