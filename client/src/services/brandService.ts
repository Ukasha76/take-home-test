import type { BrandOptionsResponse, PaginatedBrandsResponse, SkuResponse } from '../types'

const API_BASE = '/api'

export const brandService = {
  getBrands: async (page: number): Promise<PaginatedBrandsResponse> => {
    const res = await fetch(`${API_BASE}/brands?page=${page}&limit=12`)
    if (!res.ok) throw new Error('Failed to fetch brands')
    return res.json()
  },

  getBrandOptions: async (brand: string): Promise<BrandOptionsResponse> => {
    const res = await fetch(`${API_BASE}/brands/${encodeURIComponent(brand)}/options`)
    if (!res.ok) throw new Error('Failed to fetch brand options')
    return res.json()
  },

  getSku: async (brand: string, length: number, width: number): Promise<SkuResponse> => {
    const res = await fetch(
      `${API_BASE}/brands/${encodeURIComponent(brand)}/sku?length=${length}&width=${width}`
    )
    if (!res.ok) throw new Error('Failed to fetch SKU')
    return res.json()
  },
}
