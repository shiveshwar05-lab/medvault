import { DoctorStatus } from "@/backend";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: DoctorStatus | "approved" | "pending" | "rejected" | "suspended";
  className?: string;
}

const STATUS_CONFIG = {
  [DoctorStatus.approved]: {
    label: "Approved",
    icon: CheckCircle,
    className:
      "bg-[oklch(0.92_0.06_142)] text-[oklch(0.35_0.12_142)] border border-[oklch(0.75_0.12_142)]",
  },
  [DoctorStatus.pending]: {
    label: "Pending Review",
    icon: Clock,
    className:
      "bg-[oklch(0.95_0.06_75)] text-[oklch(0.4_0.12_75)] border border-[oklch(0.78_0.12_75)]",
  },
  [DoctorStatus.rejected]: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-accent/10 text-accent border border-accent/30",
  },
  [DoctorStatus.suspended]: {
    label: "Suspended",
    icon: AlertTriangle,
    className: "bg-muted text-muted-foreground border border-border",
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config =
    STATUS_CONFIG[status as DoctorStatus] ??
    STATUS_CONFIG[DoctorStatus.pending];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
        config.className,
        className,
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}
