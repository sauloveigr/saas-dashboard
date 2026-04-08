import { AlertCircle } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ 
  message, 
  onRetry, 
  className,
}: ErrorMessageProps) {
  const isRateLimitError = message.toLowerCase().includes('429') || 
                          message.toLowerCase().includes('rate limit') ||
                          message.toLowerCase().includes('failed to fetch') ||
                          message.toLowerCase().includes('unable to load');

  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center p-6 text-center",
        className
      )}
    >
      <AlertCircle className="h-8 w-8 text-red-500 mb-3" />
      <p className="text-sm font-medium text-foreground mb-1">{message}</p>
      
      {isRateLimitError && (
        <p className="text-xs text-muted-foreground mt-1 mb-3 max-w-md">
          Due to API rate limits. Wait 1-2 minutes and try again.
        </p>
      )}
      
      {onRetry && (
        <Button onClick={onRetry} size="sm" variant="ghost">
          Try again
        </Button>
      )}
    </Card>
  );
}
