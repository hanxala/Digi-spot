"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-heading font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted leading-relaxed">
            Have a question about a specific camera? Need help with an order? Our gear experts are here to help you get back to shooting.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-card p-8 rounded-2xl border border-surface text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold font-heading mb-2">Email Us</h3>
          <p className="text-muted mb-4 text-sm">We aim to reply within 24 hours.</p>
          <a href="mailto:hello@digispot.com" className="text-text font-medium hover:text-primary transition-colors">hello@digispot.com</a>
        </div>
        
        <div className="bg-card p-8 rounded-2xl border border-surface text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold font-heading mb-2">Call Us</h3>
          <p className="text-muted mb-4 text-sm">Mon-Fri from 9am to 6pm EST.</p>
          <a href="tel:+18001234567" className="text-text font-medium hover:text-primary transition-colors">+1 (800) 123-4567</a>
        </div>
        
        <div className="bg-card p-8 rounded-2xl border border-surface text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold font-heading mb-2">Visit HQ</h3>
          <p className="text-muted mb-4 text-sm">Drop-offs and pickups by appointment.</p>
          <span className="text-text font-medium">100 Aperture Way,<br />New York, NY 10001</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <form className="bg-card border border-surface rounded-3xl p-8 sm:p-10 shadow-2xl">
          <h2 className="text-2xl font-bold font-heading mb-6 text-center">Send a Message</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text ml-1">Name</label>
                <input type="text" placeholder="Jane Doe" className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text ml-1">Email</label>
                <input type="email" placeholder="jane@example.com" className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text ml-1">Subject</label>
              <input type="text" placeholder="How can we help?" className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text ml-1">Message</label>
              <textarea rows={5} placeholder="Write your message here..." className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none transition resize-none"></textarea>
            </div>
            
            <Button size="lg" className="w-full text-lg">Send Message</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
