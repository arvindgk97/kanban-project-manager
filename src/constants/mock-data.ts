import { UserProfile, Workspace, ProjectItem, StatItem, NavItem } from "@/types/dashboard";

export const MOCK_USER: UserProfile = {
  name: "Arvin",
  email: "arvin@kanban.app",
  role: "Workspace Admin",
};

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: "ws-1",
    name: "Acme",
    slug: "acme",
    plan: "Pro Plan",
  },
  {
    id: "ws-2",
    name: "Personal Workspace",
    slug: "personal",
    plan: "Free Plan",
  },
  {
    id: "ws-3",
    name: "Dev Studio",
    slug: "dev-studio",
    plan: "Enterprise",
  },
];

export const MOCK_GENERAL_NAV: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: "FolderKanban",
  },
];

export const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "Website Redesign",
    slug: "website-redesign",
    description: "Revamping marketing site with modern design system and Next.js 16.",
    taskCount: 12,
    completedTaskCount: 8,
    updatedAt: "Updated 2h ago",
    color: "#3b82f6",
    membersCount: 4,
  },
  {
    id: "proj-2",
    name: "Mobile Application",
    slug: "mobile-application",
    description: "iOS and Android task manager app built with Flutter cross-platform.",
    taskCount: 8,
    completedTaskCount: 5,
    updatedAt: "Updated 1d ago",
    color: "#10b981",
    membersCount: 3,
  },
  {
    id: "proj-3",
    name: "Inventory System",
    slug: "inventory-system",
    description: "Internal dashboard for supply chain tracking and stock level alerts.",
    taskCount: 14,
    completedTaskCount: 10,
    updatedAt: "Updated 3d ago",
    color: "#8b5cf6",
    membersCount: 5,
  },
];

export const MOCK_STATS: StatItem[] = [
  {
    id: "stat-1",
    title: "Projects",
    value: 8,
    change: "+2 this month",
    changeType: "positive",
    iconName: "projects",
  },
  {
    id: "stat-2",
    title: "My Tasks",
    value: 24,
    change: "4 in progress",
    changeType: "neutral",
    iconName: "tasks",
  },
  {
    id: "stat-3",
    title: "Due Soon",
    value: 5,
    change: "Requires attention",
    changeType: "negative",
    iconName: "dueSoon",
  },
];
