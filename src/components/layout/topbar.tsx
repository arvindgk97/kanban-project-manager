"use client";

import * as React from "react";
import { Search, Bell, Menu, Kanban } from "lucide-react";
import { UserMenu } from "@/components/navigation/user-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  onToggleMobileSidebar?: () => void;
}

export function Topbar({ onToggleMobileSidebar }: TopbarProps) {
  const [unreadCount] = React.useState(3);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 sm:px-6 backdrop-blur-md transition-all">
      {/* LEFT: BRAND LOGO & MOBILE TRIGGER */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-muted-foreground hover:text-foreground"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu className="size-5" />
        </Button>

        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
            <Kanban className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-wider uppercase text-foreground leading-tight">
              KANBAN
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wide font-medium hidden sm:inline-block">
              PROJECT MANAGER
            </span>
          </div>
        </div>
      </div>

      {/* CENTER: SEARCH INPUT */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative flex items-center">
          <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search tasks, projects, or team members... (⌘K)"
            className="pl-9 pr-12 h-9 text-xs bg-muted/40 border-border/60 focus-visible:bg-background focus-visible:ring-1 transition-all rounded-lg"
          />
          <kbd className="absolute right-2.5 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted/60 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* RIGHT: NOTIFICATIONS & USER MENU */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground"
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>

        {/* Notifications Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground hover:bg-accent/60"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex size-2.5 items-center justify-center rounded-full bg-rose-500 ring-2 ring-background">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              </span>
            )}
          </Button>
        </div>

        <div className="h-6 w-px bg-border/60 hidden sm:block" />

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
