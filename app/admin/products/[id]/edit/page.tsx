"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/lib/actions/product.actions";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await getProductById(id);
      if (res.success) {
        setProduct(res.product);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="py-20 text-muted">Loading product data...</div>;
  if (!product) return <div className="py-20 text-accent">Product not found.</div>;

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </Link>
        <h1 className="text-3xl font-heading font-bold">Edit Product</h1>
      </div>
      <ProductForm initialData={product} />
    </div>
  );
}
