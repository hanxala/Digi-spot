"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import PriceTag from "@/components/ui/PriceTag";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-muted" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted max-w-md mb-8">
          Looks like you haven't added any gear to your cart yet. Discover high-quality used cameras.
        </p>
        <Link href="/shop">
          <Button size="lg" className="w-full sm:w-auto">
            Explore Cameras
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-heading font-bold mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="border border-surface rounded-2xl overflow-hidden bg-card">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b border-surface last:border-b-0"
              >
                <div className="relative w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-surface flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:w-auto">
                  <Link href={`/product/${item.product.slug}`} className="hover:text-primary transition-colors">
                    <h3 className="text-lg font-bold font-heading truncate mb-1">{item.product.name}</h3>
                  </Link>
                  <p className="text-sm text-muted mb-4">{item.product.condition} Condition</p>
                  <PriceTag price={item.product.price} />
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border border-surface rounded-lg bg-background">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-muted hover:text-accent transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-card border border-surface p-8 rounded-2xl sticky top-24">
            <h3 className="text-2xl font-heading font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-sm mb-6 border-b border-surface pb-6">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <PriceTag price={totalPrice} className="text-text font-medium text-base" />
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-semibold text-lg">Total</span>
              <PriceTag price={totalPrice} className="text-2xl text-primary" />
            </div>
            
            <Link href="/checkout">
              <Button size="lg" className="w-full gap-2 text-lg">
                Checkout <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            
            <div className="mt-6 flex gap-2 justify-center items-center">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={25} className="opacity-70 grayscale" />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" width={40} height={12} className="opacity-70 grayscale" />
              <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={60} height={15} className="opacity-70 grayscale -ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
