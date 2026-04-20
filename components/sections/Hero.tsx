"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/Button";
import { ArrowRight, Camera } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        
        {/* Gradient blur orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full blur-[100px] opacity-60 mix-blend-screen pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/50 border border-card backdrop-blur-md mb-4 text-sm font-medium text-primary">
            <Camera className="w-4 h-4" />
            <span>The Premium Marketplace for Used Gear</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text via-text to-muted leading-tight padding-b-4">
            Focus On The Art. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">We'll Focus On The Gear.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Buy and sell highly-vetted, working digital cameras. From vintage DSLRs to modern mirrorless systems, find the perfect tool to tell your story.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-lg">
                Explore Cameras <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/sell">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg bg-background/50 backdrop-blur-md">
                Sell Your Gear
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
