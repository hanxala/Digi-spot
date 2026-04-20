"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, ShoppingCart, Heart, Menu, X, Settings } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Sell", href: "/sell" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const isAdmin = user?.publicMetadata?.role === "admin";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-surface shadow-sm"
            : "bg-transparent py-2"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                Digi<span className="text-primary">Spot</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative",
                    pathname === link.href ? "text-primary" : "text-muted"
                  )}
                >
                  {link.name}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link
                href="/wishlist"
                className="p-2 text-text hover:text-primary transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                )}
              </Link>
              <Link
                href="/cart"
                className="p-2 text-text hover:text-primary transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-background text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <div className="flex items-center justify-center ml-2">
                {!isSignedIn ? (
                  <SignInButton mode="modal">
                    <button className="text-sm font-medium bg-primary text-background px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                      Log In
                    </button>
                  </SignInButton>
                ) : (
                  <div className="flex items-center mt-1">
                    <UserButton>
                      {isAdmin && (
                        <UserButton.MenuItems>
                          <UserButton.Link
                            label="Admin Panel"
                            labelIcon={<Settings size={15} />}
                            href="/admin"
                          />
                        </UserButton.MenuItems>
                      )}
                    </UserButton>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-text ml-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
