"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MOCK_USER } from "@/constants/mock-data";

export default function SettingsPage() {
  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Settings"
        description="Manage your workspace preferences, profile, and account details."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="p-5 pb-3 font-bold text-sm">
            Profile Information
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-2 text-xs text-muted-foreground">
            <div><strong className="text-foreground">Name:</strong> {MOCK_USER.name}</div>
            <div><strong className="text-foreground">Email:</strong> {MOCK_USER.email}</div>
            <div><strong className="text-foreground">Role:</strong> {MOCK_USER.role}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-5 pb-3 font-bold text-sm">
            Workspace Configuration
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground">
            Active Workspace: <strong className="text-foreground">Acme (Pro Plan)</strong>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
