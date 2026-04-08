import { memo } from "react";
import { TrendingUp, TrendingDown, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CryptoListItemProps {
  name: string;
  subtitle: string;
  value: string;
  valueSubtext?: string;
  icon?: "up" | "down" | "rank";
  rank?: number;
  variant?: "default" | "positive" | "negative";
}

export const CryptoListItem = memo(function CryptoListItem({
  name,
  subtitle,
  value,
  valueSubtext,
  icon,
  rank,
  variant = "default",
}: CryptoListItemProps) {
  const getIcon = (): { icon: LucideIcon; bgColor: string; iconColor: string } | null => {
    if (icon === "up") {
      return {
        icon: TrendingUp,
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
      };
    }
    if (icon === "down") {
      return {
        icon: TrendingDown,
        bgColor: "bg-red-100",
        iconColor: "text-red-600",
      };
    }
    if (icon === "rank") {
      return {
        icon: Trophy,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
      };
    }
    return null;
  };

  const iconData = getIcon();
  const Icon = iconData?.icon;

  const getValueColor = () => {
    if (variant === "positive") return "text-emerald-600";
    if (variant === "negative") return "text-red-600";
    return "";
  };

  return (
    <li className="flex items-center justify-between rounded-lg bg-muted/20 p-3 ring-1 ring-border transition-colors hover:bg-muted/40">
      <div className="flex items-center gap-3">
        {Icon && iconData && (
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${iconData.bgColor}`}
          >
            <Icon className={`h-4 w-4 ${iconData.iconColor}`} />
          </div>
        )}
        
        {rank !== undefined && !Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-semibold text-muted-foreground">
              #{rank}
            </span>
          </div>
        )}
        
        <div>
          <p className="text-xs font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-xs font-semibold">{value}</p>
        {valueSubtext && (
          <p className={`text-xs font-medium ${getValueColor()}`}>
            {valueSubtext}
          </p>
        )}
      </div>
    </li>
  );
});
