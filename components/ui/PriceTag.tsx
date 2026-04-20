import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function PriceTag({ price, className }: { price: number; className?: string }) {
  return (
    <span className={cn("text-lg font-bold text-primary", className)}>
      {formatPrice(price)}
    </span>
  );
}
