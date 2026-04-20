"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Shield, ShoppingBag, Heart, ArrowLeft, Info } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ConditionBadge from "@/components/ui/ConditionBadge";
import PriceTag from "@/components/ui/PriceTag";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);
  
  const [mainImageIdx, setMainImageIdx] = useState(0);
  
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (!product) {
    notFound();
  }

  const wishlisted = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-surface">
            <Image
              src={product.images[mainImageIdx]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
              <ConditionBadge condition={product.condition} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImageIdx(idx)}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                  mainImageIdx === idx ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-2 text-sm text-primary uppercase tracking-wider font-semibold">
            {product.brand} &bull; {product.type}
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{product.name}</h1>
          
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-surface">
            <PriceTag price={product.price} className="text-3xl" />
          </div>

          <div className="prose prose-invert max-w-none text-muted mb-8">
            <p className="text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-surface/50 p-4 rounded-xl border border-surface">
              <p className="text-sm text-muted mb-1">Megapixels</p>
              <p className="font-semibold text-text">{product.specs.megapixel}MP</p>
            </div>
            <div className="bg-surface/50 p-4 rounded-xl border border-surface">
              <p className="text-sm text-muted mb-1">Sensor</p>
              <p className="font-semibold text-text">{product.specs.sensorFormat}</p>
            </div>
            {product.specs.mount && (
              <div className="bg-surface/50 p-4 rounded-xl border border-surface">
                <p className="text-sm text-muted mb-1">Mount</p>
                <p className="font-semibold text-text">{product.specs.mount}</p>
              </div>
            )}
            {product.specs.videoResolution && (
              <div className="bg-surface/50 p-4 rounded-xl border border-surface">
                <p className="text-sm text-muted mb-1">Video</p>
                <p className="font-semibold text-text">{product.specs.videoResolution}</p>
              </div>
            )}
          </div>

          {/* Seller info */}
          <div className="flex items-center gap-4 bg-primary/5 border border-primary/20 p-4 rounded-xl mb-8">
            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">Vetted Seller: {product.seller.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="text-primary font-semibold">{product.seller.rating} / 5</span> 
                <span>&bull; Trusted since {product.seller.since}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto flex gap-4">
            <Button
              size="lg"
              className="flex-1 gap-2 text-lg"
              onClick={() => addToCart(product)}
            >
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn("px-6", wishlisted && "text-accent border-accent/50")}
              onClick={toggleWishlist}
            >
              <Heart className={cn("w-6 h-6", wishlisted && "fill-accent")} />
            </Button>
          </div>
          
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Fully Inspected & Tested</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 6-Month Quality Guarantee</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Free Shipping Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}
