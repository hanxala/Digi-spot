"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-xs bg-surface border-l border-surface shadow-2xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2 group" onClick={onClose}>
                <Camera className="w-5 h-5 text-primary" />
                <span className="font-heading text-lg font-bold">
                  Digi<span className="text-primary">Spot</span>
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 bg-background rounded-full text-muted hover:text-text transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "text-lg font-medium p-3 rounded-lg transition-colors border",
                    pathname === link.href
                      ? "text-primary border-primary/20 bg-primary/5"
                      : "text-muted hover:text-text border-transparent hover:bg-background"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-background text-sm text-muted">
              &copy; {new Date().getFullYear()} Digi Spot. <br /> All rights reserved.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
