import { memo } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface NavLinkProps {
  href: string;
  name: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick?: () => void;
}

export const NavLink = memo(function NavLink({
  href,
  name,
  icon: Icon,
  isActive,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        group flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-all
        ${
          isActive
            ? "bg-secondary text-foreground"
            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={`h-4 w-4 shrink-0 ${
          isActive ? "" : "group-hover:scale-105 transition-transform"
        }`}
        aria-hidden="true"
      />
      <span>{name}</span>
    </Link>
  );
});
