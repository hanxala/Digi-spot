"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, deleteProduct } from "@/lib/actions/product.actions";
import { Edit, Trash2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import ConditionBadge from "@/components/ui/ConditionBadge";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await getProducts();
    if (res.success) {
      setProducts(res.products);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await deleteProduct(id);
      if (res.success) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-muted">Loading inventory...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold">Inventory</h1>
        <Link href="/admin/products/new">
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-2xl border border-surface shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <AlertCircle className="w-12 h-12 text-muted mb-4" />
            <h3 className="text-xl font-bold mb-2">No Products Found</h3>
            <p className="text-muted mb-6">Looks like the inventory is currently empty.</p>
            <Link href="/admin/products/new">
              <Button>Create First Product</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface/50 border-b border-surface text-sm font-medium text-muted">
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium hidden md:table-cell">Brand & Type</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Condition</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface text-sm">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-surface/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                          {product.images?.[0] ? (
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted">N/A</div>
                          )}
                        </div>
                        <div className="font-semibold text-text truncate max-w-[200px]">{product.name}</div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted">
                      {product.brand} &bull; {product.type}
                    </td>
                    <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                    <td className="p-4 hidden sm:table-cell">
                      <ConditionBadge condition={product.condition} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/products/${product._id}/edit`}>
                          <button className="p-2 text-muted hover:text-primary transition-colors bg-surface rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-muted hover:text-accent transition-colors bg-surface rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
