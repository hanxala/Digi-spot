export type Condition = "Excellent" | "Good" | "Fair";
export type CameraType = "DSLR" | "Mirrorless" | "Point-and-Shoot" | "Film" | "Compact";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  type: CameraType;
  price: number;
  condition: Condition;
  images: string[];
  description: string;
  specs: {
    megapixel: number;
    sensorFormat: string;
    mount?: string;
    videoResolution?: string;
  };
  seller: {
    name: string;
    rating: number;
    since: string;
  };
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
