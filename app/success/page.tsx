"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 relative">
          <CheckCircle className="w-14 h-14 text-green-500" />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Package className="w-3 h-3 text-background" />
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Order Confirmed!
        </h1>
        <p className="text-lg text-muted mb-8 max-w-md mx-auto">
          Thank you for your purchase! Your order has been successfully placed and is being processed.
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="bg-card border border-surface rounded-2xl p-6 mb-8">
            <p className="text-sm text-muted mb-2">Your Order ID</p>
            <p className="text-2xl font-heading font-bold text-primary tracking-wider">{orderId}</p>
            <p className="text-xs text-muted mt-3">
              Save this ID for tracking your order. A confirmation email will be sent shortly.
            </p>
          </div>
        )}

        {/* Delivery Timeline */}
        <div className="bg-card border border-surface rounded-2xl p-6 mb-8">
          <h3 className="font-heading font-bold mb-4">What happens next?</h3>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <div>
                <p className="text-sm font-medium">Order Verified</p>
                <p className="text-xs text-muted">We'll verify payment and prepare your camera for dispatch.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-muted">2</span>
              </div>
              <div>
                <p className="text-sm font-medium">Shipped</p>
                <p className="text-xs text-muted">Your camera will be carefully packaged and shipped within 2-3 business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-muted">3</span>
              </div>
              <div>
                <p className="text-sm font-medium">Delivered</p>
                <p className="text-xs text-muted">Estimated delivery in 5-7 business days to your doorstep.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Home className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
