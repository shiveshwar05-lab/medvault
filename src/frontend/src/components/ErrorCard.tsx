import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorCard({
  title = "Something went wrong",
  message = "An error occurred while loading this content.",
  onRetry,
  className,
}: ErrorCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 p-8 rounded-xl border border-accent/30 bg-accent/5 text-center",
        className,
      )}
      role="alert"
      data-ocid="error.error_state"
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-accent" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Try Again
        </Button>
      )}
    </div>
  );
}
