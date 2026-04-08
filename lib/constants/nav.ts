import { LayoutDashboard, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Navigation item structure
 */
export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

/**
 * Main navigation items for sidebar
 */
export const NAV_ITEMS: NavItem[] = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];
