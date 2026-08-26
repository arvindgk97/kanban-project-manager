"use client";

import * as React from "react";
import { User, Settings, LogOut, Shield, ChevronDown } from "lucide-react";
import { MOCK_USER } from "@/constants/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/60 transition-colors rounded-full sm:rounded-lg cursor-pointer outline-none">
        <Avatar className="size-8 border border-border/80">
          <AvatarImage src={MOCK_USER.avatarUrl} alt={MOCK_USER.name} />
          <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
            {MOCK_USER.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold leading-tight text-foreground">
            {MOCK_USER.name}
          </span>
          <span className="text-[10px] leading-tight text-muted-foreground">
            {MOCK_USER.role}
          </span>
        </div>
        <ChevronDown className="size-3.5 text-muted-foreground hidden sm:block" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1.5">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1 p-1">
            <p className="text-xs font-semibold leading-none">{MOCK_USER.name}</p>
            <p className="text-[11px] leading-none text-muted-foreground">
              {MOCK_USER.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer text-xs py-2">
            <User className="size-4 mr-2 text-muted-foreground" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-xs py-2">
            <Settings className="size-4 mr-2 text-muted-foreground" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-xs py-2">
            <Shield className="size-4 mr-2 text-muted-foreground" />
            <span>Permissions</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer text-xs py-2"
        >
          <LogOut className="size-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
