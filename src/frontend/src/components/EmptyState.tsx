import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 py-16 px-8 text-center",
        className,
      )}
      data-ocid="empty.empty_state"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <div>
        <h3 className="font-semibold text-foreground text-lg mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-xs">
            {description}
          </p>
        )}
      </div>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
