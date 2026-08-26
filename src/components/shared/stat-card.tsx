"use client";

import * as React from "react";
import { FolderKanban, CheckSquare, Clock, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatItem } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface StatCardProps {
  stat: StatItem;
}

export function StatCard({ stat }: StatCardProps) {
  const getIcon = () => {
    switch (stat.iconName) {
      case "projects":
        return <FolderKanban className="size-5 text-indigo-600 dark:text-indigo-400" />;
      case "tasks":
        return <CheckSquare className="size-5 text-blue-600 dark:text-blue-400" />;
      case "dueSoon":
        return <Clock className="size-5 text-amber-600 dark:text-amber-400" />;
      case "completed":
        return <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <FolderKanban className="size-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const getGradient = () => {
    switch (stat.iconName) {
      case "projects":
        return "from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20";
      case "tasks":
        return "from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20";
      case "dueSoon":
        return "from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20";
      case "completed":
        return "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20";
      default:
        return "from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20";
    }
  };

  return (
    <Card className={cn("relative overflow-hidden border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-gradient-to-br", getGradient())}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {stat.title}
          </span>
          <div className="p-2.5 rounded-xl bg-background/80 shadow-2xs border border-border/60">
            {getIcon()}
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold tracking-tight text-foreground">
            {stat.value}
          </span>
          {stat.change && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border",
                stat.changeType === "positive" &&
                  "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40",
                stat.changeType === "negative" &&
                  "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40",
                stat.changeType === "neutral" &&
                  "bg-accent text-muted-foreground border-border/50"
              )}
            >
              {stat.changeType === "positive" && <TrendingUp className="size-3" />}
              {stat.changeType === "negative" && <AlertCircle className="size-3" />}
              {stat.change}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
