"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, Building2, Check } from "lucide-react";
import { Workspace } from "@/types/dashboard";
import { MOCK_WORKSPACES } from "@/constants/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface WorkspaceSwitcherProps {
  onNewProject?: () => void;
}

export function WorkspaceSwitcher({ onNewProject }: WorkspaceSwitcherProps) {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<Workspace>(
    MOCK_WORKSPACES[0]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase px-2">
        Workspace
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="w-full justify-between gap-2 px-3 py-5 bg-card/80 border border-border/60 hover:bg-accent/60 transition-colors shadow-2xs rounded-lg flex items-center cursor-pointer outline-none"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-2xs">
              ◈
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="text-sm font-semibold truncate leading-tight">
                {selectedWorkspace.name}
              </span>
              <span className="text-[11px] text-muted-foreground truncate leading-tight">
                {selectedWorkspace.plan}
              </span>
            </div>
          </div>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 p-1.5">
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Switch Workspace
          </DropdownMenuLabel>
          {MOCK_WORKSPACES.map((ws) => (
            <DropdownMenuItem
              key={ws.id}
              onClick={() => setSelectedWorkspace(ws)}
              className="flex items-center justify-between py-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="font-medium text-xs">{ws.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {ws.plan}
                  </span>
                </div>
              </div>
              {ws.id === selectedWorkspace.id && (
                <Check className="size-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onNewProject}
            className="flex items-center gap-2 text-primary font-medium py-2 cursor-pointer"
          >
            <Plus className="size-4" />
            <span className="text-xs">Create New Workspace</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        onClick={onNewProject}
        variant="secondary"
        size="sm"
        className="w-full justify-start gap-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/50 dark:border-indigo-800/40 font-medium text-xs shadow-2xs mt-1"
      >
        <Plus className="size-3.5" />
        <span>New Project</span>
      </Button>
    </div>
  );
}
