import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const SIZE_CLASSES = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
};

export default function LoadingSpinner({
  size = "md",
  label,
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
      aria-label={label ?? "Loading"}
    >
      <div
        className={cn(
          "rounded-full border-primary/20 border-t-primary animate-spin",
          SIZE_CLASSES[size],
        )}
      />
      {label && (
        <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
      )}
    </div>
  );
}
