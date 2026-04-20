"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Built for Creators,<br />By Creators.</h1>
        <p className="text-xl text-muted leading-relaxed">
          Digi Spot was founded on a simple principle: to make the world's best digital cameras accessible without the premium of buying new, and without the risk of buying from strangers on the internet.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
        <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-surface">
          <Image
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000"
            alt="Photographer taking a picture"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted leading-relaxed text-lg">
              <p>
                In 2021, we got tired of playing Russian roulette with used gear marketplaces. Missing accessories, undisclosed shutter counts, and hidden sensor scratches were all too common.
              </p>
              <p>
                So we built Digi Spot. A marketplace that acts as an uncompromising intermediary. Every single camera that comes through our doors is physically inspected, tested, and graded by a master technician with over 15 years of industry experience.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold mb-4">The Promise</h2>
            <div className="space-y-4 text-muted leading-relaxed text-lg">
              <p>
                When you buy from us, you're not just buying a piece of metal and glass. You're buying peace of mind. We stand by our rigorous 40-point inspection so confidently that we include a 6-month mechanical warranty with every single purchase. No catches, no asterisks.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-surface/30 rounded-3xl p-8 lg:p-16 border border-surface text-center">
        <h2 className="text-3xl font-heading font-bold mb-8">By The Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-5xl font-bold text-primary mb-2 font-heading">15k+</p>
            <p className="text-muted font-medium">Cameras Sold</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-primary mb-2 font-heading">0.5%</p>
            <p className="text-muted font-medium">Return Rate</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-primary mb-2 font-heading">4.9</p>
            <p className="text-muted font-medium">Average Rating</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-primary mb-2 font-heading">40</p>
            <p className="text-muted font-medium">Point Inspection</p>
          </div>
        </div>
      </div>
    </div>
  );
}
