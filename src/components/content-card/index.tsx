import React from "react";
import { cn } from "@/lib/utils";

const ContentCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "w-full rounded-lg border border-gray-300 bg-card bg-white p-5 text-card-foreground text-zinc-950 shadow-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export default ContentCard;
