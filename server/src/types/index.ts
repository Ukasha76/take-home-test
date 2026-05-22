export interface Brand {
  brand: string;
  minPrice: number;
  maxPrice: number;
}

export interface PaginatedBrands {
  brands: Brand[];
  total: number;
  page: number;
  totalPages: number;
}

export interface BrandOptions {
  lengths: number[];
  widthsByLength: Record<string, number[]>;
}

export interface SkuResult {
  sku: string;
  price: number;
}
