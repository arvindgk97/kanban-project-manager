"use client";

import * as React from "react";
import { Sparkles, Calendar } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { MOCK_USER, MOCK_STATS } from "@/constants/mock-data";

export function DashboardOverview() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 size-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-12 size-48 rounded-full bg-purple-500/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium backdrop-blur-md">
              <Sparkles className="size-3.5 text-yellow-300" />
              <span>Workspace Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, {MOCK_USER.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/90 max-w-xl">
              Here is an overview of your active workspace projects, pending tasks, and upcoming deadlines.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/20 text-white/90 text-xs font-medium backdrop-blur-md border border-white/10 shrink-0 self-start sm:self-auto">
            <Calendar className="size-4 text-indigo-200" />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>

      {/* STATS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {MOCK_STATS.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
}
