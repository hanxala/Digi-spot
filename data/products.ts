import { Product } from "@/types";

const images = [
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", // Vintage camera
  "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=800", // Camera top down
  "https://images.unsplash.com/photo-1502982720700-baf97d4220a0?auto=format&fit=crop&q=80&w=800", // Person holding camera
  "https://images.unsplash.com/photo-1527011045974-e15a7ee48281?auto=format&fit=crop&q=80&w=800", // DSLR close
  "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&q=80&w=800", // Mirrorless table
  "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800", // Retro
  "https://images.unsplash.com/photo-1617005082833-28adcb9af0d3?auto=format&fit=crop&q=80&w=800", // Sony Alpha
  "https://images.unsplash.com/photo-1621644787948-4e89bbde3488?auto=format&fit=crop&q=80&w=800", // Fujifilm
];

export const products: Product[] = Array.from({ length: 30 }).map((_, i) => {
  const brands = ["Sony", "Canon", "Nikon", "Fujifilm", "Panasonic", "Leica"];
  const types: Product["type"][] = ["Mirrorless", "DSLR", "Point-and-Shoot", "Film"];
  const conditions: Product["condition"][] = ["Excellent", "Good", "Fair"];

  const brand = brands[i % brands.length];
  const type = types[i % types.length];
  const condition = conditions[i % conditions.length];

  // Pseudo-random but deterministic names based on index
  const modelNames = {
    Sony: ["A7 III", "A7 IV", "A6400", "A6600", "FX3"],
    Canon: ["EOS R5", "EOS R6", "5D Mark IV", "M50 Mark II", "Rebel T7"],
    Nikon: ["Z6 II", "Z7", "D850", "D3500", "Z50"],
    Fujifilm: ["X-T4", "X-T30 II", "X100V", "X-Pro3", "GFX 50S"],
    Panasonic: ["Lumix GH5", "Lumix S5", "Lumix G9", "Lumix GH6"],
    Leica: ["Q2", "M10", "SL2"],
  };

  const models = modelNames[brand as keyof typeof modelNames] || ["Camera"];
  const model = models[i % models.length];

  return {
    id: `cam-${i + 1}`,
    slug: `${brand.toLowerCase()}-${model.toLowerCase().replace(/\\s+/g, "-")}-${i + 1}`,
    name: `${brand} ${model}`,
    brand,
    type,
    price: Math.floor(400 + (i * 123.4) % 3000), // Range roughly 400 - 3400
    condition,
    images: [
      images[i % images.length],
      images[(i + 1) % images.length],
      images[(i + 2) % images.length],
    ],
    description: `A highly capable ${type} camera from ${brand}. The ${model} offers outstanding image quality and robust performance, perfect for both enthusiasts and professionals. It features a high-resolution sensor and advanced autofocus, ensuring you capture every moment with precision. This unit is in ${condition} condition.`,
    specs: {
      megapixel: 24 + (i % 3) * 12, // 24, 36, 48
      sensorFormat: type === "Point-and-Shoot" ? "1-inch" : (i % 2 === 0 ? "Full-Frame" : "APS-C"),
      mount: type === "DSLR" ? "EF/F-mount" : "E/RF/Z-mount",
      videoResolution: i % 3 === 0 ? "8K 30p" : "4K 60p",
    },
    seller: {
      name: `Seller${i + 100}`,
      rating: 4.0 + (i % 10) / 10, // 4.0 to 4.9
      since: `202${i % 4}`,
    },
    featured: i % 7 === 0 || i === 0, // Mark some as featured
  };
});
