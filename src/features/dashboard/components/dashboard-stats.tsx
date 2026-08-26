"use client";

import * as React from "react";
import { StatCard } from "@/components/shared/stat-card";
import { MOCK_STATS } from "@/constants/mock-data";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {MOCK_STATS.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
