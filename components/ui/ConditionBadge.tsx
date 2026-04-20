import { Condition } from "@/types";
import { cn } from "@/lib/utils";

export default function ConditionBadge({ condition, className }: { condition: Condition; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
        {
          "bg-green-500/10 text-green-500 border border-green-500/20": condition === "Excellent",
          "bg-primary/10 text-primary border border-primary/20": condition === "Good",
          "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20": condition === "Fair",
        },
        className
      )}
    >
      {condition}
    </span>
  );
}
