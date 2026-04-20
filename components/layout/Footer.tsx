import Link from "next/link";
import { Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                Digi<span className="text-primary">Spot</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Your premium marketplace for highly-vetted, high-quality used digital cameras. Focus on the art, we'll focus on the gear.
            </p>
            <div className="flex gap-4 text-muted text-sm font-medium">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">YouTube</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-text mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/shop?type=Mirrorless" className="hover:text-primary transition">Mirrorless Cameras</Link></li>
              <li><Link href="/shop?type=DSLR" className="hover:text-primary transition">DSLRs</Link></li>
              <li><Link href="/shop?type=Point-and-Shoot" className="hover:text-primary transition">Point & Shoots</Link></li>
              <li><Link href="/shop?type=Film" className="hover:text-primary transition">Film Cameras</Link></li>
              <li><Link href="/shop?condition=Excellent" className="hover:text-primary transition">Pristine Condition</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/contact" className="hover:text-primary transition">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition">Shipping Returns</Link></li>
              <li><Link href="/sell" className="hover:text-primary transition">Sell Your Camera</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-text mb-4">Subscribe</h4>
            <p className="text-sm text-muted mb-4">Get updates on new gear arrivals and exclusive tips.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-card w-full block border border-card focus:border-primary rounded-lg px-4 py-2 text-sm outline-none transition transition-all placeholder:text-muted/60"
              />
              <button
                type="submit"
                className="bg-primary text-background font-medium px-4 py-2 rounded-lg text-sm hover:bg-primary/90 transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-card flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Digi Spot Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-text transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
