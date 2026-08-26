"use client";

import * as React from "react";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-400">
      {/* TOPBAR */}
      <Topbar onToggleMobileSidebar={toggleMobileSidebar} />

      {/* MAIN BODY AREA (SIDEBAR + CONTENT) */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={closeMobileSidebar}
        />

        {/* MAIN VIEWPORT CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
