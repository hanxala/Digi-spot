"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { Button } from "@/components/ui/Button";

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    brand: initialData?.brand || "",
    type: initialData?.type || "Mirrorless",
    price: initialData?.price || "",
    condition: initialData?.condition || "Excellent",
    images: initialData?.images?.join(", ") || "",
    description: initialData?.description || "",
    megapixels: initialData?.specs?.megapixel || "",
    sensorFormat: initialData?.specs?.sensorFormat || "",
    mount: initialData?.specs?.mount || "",
    videoResolution: initialData?.specs?.videoResolution || "",
    sellerName: initialData?.seller?.name || "Digi Spot Internal",
    sellerSince: initialData?.seller?.since || new Date().getFullYear().toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: formData.name,
        brand: formData.brand,
        type: formData.type,
        price: Number(formData.price),
        condition: formData.condition,
        images: formData.images.split(",").map((img: string) => img.trim()).filter(Boolean),
        description: formData.description,
        specs: {
          megapixel: Number(formData.megapixels),
          sensorFormat: formData.sensorFormat,
          mount: formData.mount,
          videoResolution: formData.videoResolution,
        },
        seller: {
          name: formData.sellerName,
          since: formData.sellerSince,
          rating: 5,
        },
      };

      const res = isEditing
        ? await updateProduct(initialData._id, payload)
        : await createProduct(payload);

      if (res.success) {
        router.push("/admin/products");
      } else {
        setError(res.error || "An error occurred");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl border border-surface shadow-sm max-w-4xl">
      {error && <div className="mb-6 p-4 bg-accent/10 border border-accent/20 text-accent rounded-lg">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name</label>
          <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none" placeholder="e.g. A7 III" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Brand</label>
          <input required name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none" placeholder="e.g. Sony" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <select required name="type" value={formData.type} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none">
            <option value="Mirrorless">Mirrorless</option>
            <option value="DSLR">DSLR</option>
            <option value="Point-and-Shoot">Point-and-Shoot</option>
            <option value="Film">Film</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Condition</label>
          <select required name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none">
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price (₹)</label>
          <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Image URLs (comma separated)</label>
          <input required name="images" value={formData.images} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none" placeholder="https://..." />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none resize-none" />
        </div>
      </div>

      <h3 className="text-xl font-heading font-bold mb-4">Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-t border-surface pt-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Megapixels</label>
          <input required type="number" name="megapixels" value={formData.megapixels} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sensor Format</label>
          <input required name="sensorFormat" value={formData.sensorFormat} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none" placeholder="e.g. Full-Frame" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Mount</label>
          <input name="mount" value={formData.mount} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Video Resolution</label>
          <input name="videoResolution" value={formData.videoResolution} onChange={handleChange} className="w-full bg-surface border border-surface focus:border-primary rounded-xl px-4 py-3 outline-none" />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button disabled={loading}>{loading ? "Saving..." : isEditing ? "Update Product" : "Create Product"}</Button>
      </div>
    </form>
  );
}
