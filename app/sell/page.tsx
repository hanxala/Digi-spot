"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Camera, Image as ImageIcon, Send, ShieldCheck } from "lucide-react";

export default function SellPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Camera className="w-4 h-4" /> Trade-in or Cash
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Turn Your Old Gear Into New Opportunities
            </h1>
            <p className="text-lg text-muted">
              We offer the industry's most competitive payouts for used, working digital cameras. Get a quote within 24 hours, ship it to us for free, and get paid the same day we inspect it.
            </p>
          </motion.div>

          <div className="space-y-8 mb-12">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading mb-2">Submit Your Gear</h3>
                <p className="text-muted">Fill out the form with accurate details and photos of your camera's current condition.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading mb-2">Get an Estimate</h3>
                <p className="text-muted">Our expert buyers review your submission and email you a firm offer within 24 hours.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading mb-2">Ship & Get Paid</h3>
                <p className="text-muted">Accept the offer, use our prepaid insured shipping label, and get paid via PayPal, Zelle, or Store Credit.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4">
            <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
            <p className="text-sm text-text">
              <strong className="text-primary block mb-1">We Only Accept Working Gear</strong>
              To maintain our premium marketplace standards, we do not accept cameras with mold, severe fungus, non-functional electronics, or critical structural damage.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <form className="bg-card border border-surface rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h2 className="text-2xl font-bold font-heading mb-6">Camera Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text ml-1">Brand</label>
                  <select className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition appearance-none">
                    <option value="">Select Brand</option>
                    <option value="Sony">Sony</option>
                    <option value="Canon">Canon</option>
                    <option value="Nikon">Nikon</option>
                    <option value="Fujifilm">Fujifilm</option>
                    <option value="Panasonic">Panasonic</option>
                    <option value="Leica">Leica</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text ml-1">Model / Name</label>
                  <input type="text" placeholder="e.g. A7 III, EOS R5" className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition placeholder:text-muted/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text ml-1">Condition</label>
                <select className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition appearance-none">
                  <option value="">Select Condition</option>
                  <option value="Excellent">Excellent (Like new, barely any signs of use)</option>
                  <option value="Good">Good (Normal signs of wear, fully functional)</option>
                  <option value="Fair">Fair (Noticeable cosmetic wear, perfectly functional)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text ml-1">Shutter Count (if known)</label>
                <input type="number" placeholder="e.g. 15000" className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition placeholder:text-muted/50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text ml-1">Any defects/issues we should know about?</label>
                <textarea rows={3} placeholder="Please be honest..." className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition resize-none placeholder:text-muted/50"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text ml-1">Photos (Required)</label>
                <div className="border-2 border-dashed border-surface hover:border-primary/50 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-surface/30">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-muted" />
                  </div>
                  <span className="text-sm font-medium">Click to upload photos</span>
                  <span className="text-xs text-muted">Front, Back, Sensor, and Accessories</span>
                </div>
              </div>

              <div className="pt-4 border-t border-surface">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text ml-1">Your Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text ml-1">Your Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition" />
                  </div>
                </div>
                
                <Button size="lg" className="w-full gap-2 text-lg">
                  Submit for Estimate <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
