"use server";

import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { revalidatePath } from "next/cache";

// Type definition matches our Mongoose schema but allows form input
export async function createProduct(data: any) {
  try {
    await connectToDatabase();
    
    // Auto-generate slug if not provided
    if (!data.slug && data.name && data.brand) {
      data.slug = `${data.brand.toLowerCase()}-${data.name.toLowerCase().replace(/\\s+/g, "-")}-${Date.now()}`;
    }

    const newProduct = await Product.create(data);
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true, product: JSON.parse(JSON.stringify(newProduct)) };
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return { success: false, error: error.message };
  }
}

export async function getProducts(query = {}) {
  try {
    await connectToDatabase();
    const products = await Product.find(query).sort({ createdAt: -1 });
    return { success: true, products: JSON.parse(JSON.stringify(products)) };
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    return { success: false, error: error.message };
  }
}

export async function getProductById(id: string) {
  try {
    await connectToDatabase();
    const product = await Product.findById(id);
    if (!product) return { success: false, error: "Product not found" };
    return { success: true, product: JSON.parse(JSON.stringify(product)) };
  } catch (error: any) {
    console.error("Failed to fetch product:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    await connectToDatabase();
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath(`/product/${updatedProduct.slug}`);
    return { success: true, product: JSON.parse(JSON.stringify(updatedProduct)) };
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return { success: false, error: error.message };
  }
}
