import * as React from "react";
import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { RecentProjects } from "@/features/dashboard/components/recent-projects";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      <DashboardOverview />
      <RecentProjects />
    </div>
  );
}
