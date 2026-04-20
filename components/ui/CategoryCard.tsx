import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
  className?: string;
}

export default function CategoryCard({ title, image, href, className }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-64 overflow-hidden rounded-2xl md:h-80",
        className
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      </div>

      <div className="relative mt-auto p-6 flex items-center justify-between w-full">
        <h3 className="font-heading text-2xl font-bold text-text">{title}</h3>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 backdrop-blur-md text-primary transition-transform group-hover:translate-x-2">
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
}
