"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import ConditionBadge from "./ConditionBadge";
import PriceTag from "./PriceTag";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group flex flex-col bg-card rounded-2xl overflow-hidden border border-surface transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <ConditionBadge condition={product.condition} />
        </div>
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm text-text hover:text-accent hover:bg-background transition-colors"
        >
          <Heart className={cn("w-5 h-5", wishlisted && "fill-accent text-accent")} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-muted mb-2 font-medium uppercase tracking-wider">
          {product.brand} &bull; {product.type}
        </div>
        <h3 className="font-heading text-lg font-bold text-text mb-1 truncate">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <PriceTag price={product.price} />
          
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text group-hover:bg-primary group-hover:text-background transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
