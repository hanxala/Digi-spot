"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-muted" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-muted max-w-md mb-8">
          Found something you like but not ready to buy? Save it here for later.
        </p>
        <Link href="/shop">
          <Button size="lg" className="w-full sm:w-auto">
            Discover Cameras
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Saved Items</h1>
          <p className="text-muted">You have {items.length} items in your wishlist.</p>
        </div>
        <button
          onClick={clearWishlist}
          className="text-sm text-accent hover:underline font-medium"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
