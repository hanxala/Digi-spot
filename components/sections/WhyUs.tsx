"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Camera as CameraIcon, RotateCcw, Truck } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "100% Vetted & Tested",
    description: "Every camera passes a rigorous 40-point inspection by our specialized technicians before it's listed.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Not quite the right fit? Return it within 30 days, no questions asked. We believe in gear that clicks.",
  },
  {
    icon: CameraIcon,
    title: "6-Month Warranty",
    description: "Used doesn't mean unprotected. All purchases include a complimentary 6-month mechanical warranty.",
  },
  {
    icon: Truck,
    title: "Fast, Insured Shipping",
    description: "Your gear is packed securely and shipped fast via insured overnight or 2-day delivery.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Why Choose Digi Spot?
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            We're built by photographers, for photographers. We eliminate the uncertainty of buying used gear online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-surface hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{reason.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
