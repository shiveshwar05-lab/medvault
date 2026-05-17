import { cn } from "@/lib/utils";

interface MedicalBadgeProps {
  bloodGroup: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const BLOOD_GROUP_COLORS: Record<string, string> = {
  "A+": "bg-accent text-accent-foreground",
  "A-": "bg-accent/80 text-accent-foreground",
  "B+": "bg-primary text-primary-foreground",
  "B-": "bg-primary/80 text-primary-foreground",
  "AB+": "bg-[oklch(0.45_0.18_280)] text-primary-foreground",
  "AB-": "bg-[oklch(0.5_0.16_280)] text-primary-foreground",
  "O+": "bg-[oklch(0.55_0.20_145)] text-primary-foreground",
  "O-": "bg-[oklch(0.48_0.18_145)] text-primary-foreground",
};

const SIZE_CLASSES = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-2 font-bold",
};

export default function MedicalBadge({
  bloodGroup,
  className,
  size = "md",
}: MedicalBadgeProps) {
  const colorClass =
    BLOOD_GROUP_COLORS[bloodGroup] ?? "bg-muted text-muted-foreground";

  return (
    <span
      className={cn(
        "inline-flex flex-col items-center rounded font-mono font-semibold shadow-subtle select-none",
        colorClass,
        SIZE_CLASSES[size],
        className,
      )}
    >
      <span className="text-[9px] uppercase tracking-widest opacity-80">
        Blood Group
      </span>
      <span className={cn("tracking-wide", size === "lg" ? "text-xl" : "")}>
        {bloodGroup}
      </span>
    </span>
  );
}
