"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Professional Wedding Shooter",
    text: "Digi Spot saved me in a pinch. I needed an A7 IV as a backup body fast. It arrived exactly as described, heavily discounted compared to brand new.",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Enthusiast",
    text: "The rating system is spot on. I bought an 'Excellent' condition Fujifilm X100V and I honestly couldn't tell it wasn't brand new. Brilliant service.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Travel Vlogger",
    text: "Selling my old gear here was seamless. Got a fair valuation within 24 hours, shipped it, and got paid immediately. No lowballers to deal with.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Hear From Our Community
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Thousands of creators trust Digi Spot for their next piece of essential gear.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl relative border border-surface shadow-lg"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/10" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < test.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-text leading-relaxed mb-6 italic">"{test.text}"</p>
              <div>
                <p className="font-bold font-heading">{test.name}</p>
                <p className="text-sm text-muted">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
