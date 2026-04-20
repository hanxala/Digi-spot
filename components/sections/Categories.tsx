"use client";

import { motion } from "framer-motion";
import CategoryCard from "../ui/CategoryCard";

const categories = [
  {
    title: "Mirrorless",
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&q=80&w=800",
    href: "/shop?type=Mirrorless",
  },
  {
    title: "DSLRs",
    image: "https://images.unsplash.com/photo-1527011045974-e15a7ee48281?auto=format&fit=crop&q=80&w=800",
    href: "/shop?type=DSLR",
  },
  {
    title: "Point & Shoot",
    image: "https://images.unsplash.com/photo-1621644787948-4e89bbde3488?auto=format&fit=crop&q=80&w=800",
    href: "/shop?type=Point-and-Shoot",
  },
  {
    title: "Film Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    href: "/shop?type=Film",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-surface/50 border-y border-surface relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Find exactly what you're looking for, whether it's the tactile feel of film or the cutting-edge autofocus of modern mirrorless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard {...category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
