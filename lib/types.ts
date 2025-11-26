export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string | null;
  background_url: string | null;
  color: string;
  opening_hours: string;
  delivery_time: string;
  minimum_order_value: number;
  fixed_delivery_price?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}