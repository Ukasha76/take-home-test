export interface Brand {
  brand: string;
  minPrice: number;
  maxPrice: number;
}

export interface PaginatedBrandsResponse {
  data: {
    brands: Brand[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface BrandOptions {
  lengths: number[];
  widthsByLength: Record<string, number[]>;
}

export interface BrandOptionsResponse {
  data: BrandOptions;
}

export interface SkuResult {
  sku: string;
  price: number;
}

export interface SkuResponse {
  data: SkuResult;
}
