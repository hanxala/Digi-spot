import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true }, // "DSLR" | "Mirrorless" | "Point-and-Shoot" | "Film"
    price: { type: Number, required: true },
    condition: { type: String, required: true }, // "Excellent" | "Good" | "Fair"
    images: { type: [String], required: true },
    description: { type: String, required: true },
    specs: {
      megapixel: { type: Number, required: true },
      sensorFormat: { type: String, required: true },
      mount: { type: String },
      videoResolution: { type: String },
    },
    seller: {
      name: { type: String, required: true },
      rating: { type: Number, default: 5 },
      since: { type: String, required: true },
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
