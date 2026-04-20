import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </Link>
        <h1 className="text-3xl font-heading font-bold">Add New Product</h1>
      </div>
      <ProductForm />
    </div>
  );
}
