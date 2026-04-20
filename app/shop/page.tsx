"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import { getProducts } from "@/lib/actions/product.actions";
import { CameraType, Condition } from "@/types";

function ShopContent() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const typeParam = searchParams.get("type");
  const conditionParam = searchParams.get("condition");
  const brandParam = searchParams.get("brand");

  const [selectedTypes, setSelectedTypes] = useState<CameraType[]>(
    typeParam ? [typeParam as CameraType] : []
  );
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>(
    conditionParam ? [conditionParam as Condition] : []
  );

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await getProducts();
      if (res.success && res.products) {
        // Map MongoDB _id to id for compatibility with ProductCard
        const mapped = res.products.map((p: any) => ({ ...p, id: p._id }));
        setAllProducts(mapped);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleToggleType = (type: CameraType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleToggleCondition = (cond: Condition) => {
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const matchCondition = selectedConditions.length === 0 || selectedConditions.includes(product.condition);
      const matchBrand = !brandParam || product.brand.toLowerCase() === brandParam.toLowerCase();
      
      return matchType && matchCondition && matchBrand;
    });
  }, [allProducts, selectedTypes, selectedConditions, brandParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-4">Shop Cameras</h1>
        <p className="text-muted max-w-2xl">
          Browse our extensive collection of thoroughly vetted, used digital cameras.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <FilterSidebar
              types={["Mirrorless", "DSLR", "Point-and-Shoot", "Film"]}
              conditions={["Excellent", "Good", "Fair"]}
              selectedTypes={selectedTypes}
              selectedConditions={selectedConditions}
              onToggleType={handleToggleType}
              onToggleCondition={handleToggleCondition}
            />
          </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1 min-w-0">
          <div className="mb-6 flex justify-between items-center text-sm text-muted">
            <p>{loading ? "Loading..." : `Showing ${filteredProducts.length} results`}</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card border border-surface rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-8">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
