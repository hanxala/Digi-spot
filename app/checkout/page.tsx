"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth, useUser } from "@clerk/nextjs";
import { createOrder } from "@/lib/actions/order.actions";
import { Button } from "@/components/ui/Button";
import PriceTag from "@/components/ui/PriceTag";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "COD",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const shippingCost = totalPrice > 5000 ? 0 : 299;
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + shippingCost + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderItems = items.map((item) => ({
        productId: item.product.id || (item.product as any)._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images?.[0],
      }));

      const res = await createOrder({
        clerkUserId: user?.id,
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: {
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          zip: form.zip,
        },
        items: orderItems,
        totalAmount: grandTotal,
        paymentMethod: form.paymentMethod,
      });

      if (res.success) {
        clearCart();
        router.push(`/success?orderId=${res.order.orderId}`);
      } else {
        setError(res.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted mb-6">Add some cameras to your cart before checking out.</p>
        <Link href="/shop">
          <Button>Browse Cameras</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/cart" className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      <h1 className="text-4xl font-heading font-bold mb-10">Checkout</h1>

      {error && (
        <div className="mb-6 p-4 bg-accent/10 border border-accent/20 text-accent rounded-lg">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left — Form */}
          <div className="flex-1 space-y-8">
            {/* Contact */}
            <div className="bg-card border border-surface rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    required name="name" value={form.name} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    required type="email" name="email" value={form.email} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    required name="phone" value={form.phone} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-card border border-surface rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" /> Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Address Line 1</label>
                  <input
                    required name="line1" value={form.line1} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Address Line 2 <span className="text-muted">(Optional)</span></label>
                  <input
                    name="line2" value={form.line2} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <input
                    required name="city" value={form.city} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                    placeholder="Mumbai"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <input
                    required name="state" value={form.state} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                    placeholder="Maharashtra"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">PIN Code</label>
                  <input
                    required name="zip" value={form.zip} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                    placeholder="400001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  <select
                    name="paymentMethod" value={form.paymentMethod} onChange={handleChange}
                    className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition-colors"
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="UPI">UPI Payment</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-card border border-surface p-6 sm:p-8 rounded-2xl sticky top-24">
              <h3 className="text-2xl font-heading font-bold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product.id || (item.product as any)._id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-surface pt-6 mb-6">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="text-text font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span className="text-text font-medium">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>GST (18%)</span>
                  <span className="text-text font-medium">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 border-t border-surface pt-6">
                <span className="font-semibold text-lg">Total</span>
                <PriceTag price={grandTotal} className="text-2xl text-primary" />
              </div>

              <Button size="lg" className="w-full gap-2 text-lg" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" /> Confirm Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted text-center mt-4">
                By placing this order you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
