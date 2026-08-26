export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  plan: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  taskCount: number;
  completedTaskCount: number;
  updatedAt: string;
  color?: string;
  membersCount: number;
}

export interface StatItem {
  id: string;
  title: string;
  value: number | string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  iconName: "projects" | "tasks" | "dueSoon" | "completed";
}

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: number | string;
  isExternal?: boolean;
}
