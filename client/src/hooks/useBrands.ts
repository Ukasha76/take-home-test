import { useEffect, useState } from 'react'
import { brandService } from '../services/brandService'
import type { Brand } from '../types'

interface UseBrandsResult {
  brands: Brand[]
  totalPages: number
  loading: boolean
  error: string | null
}

export const useBrands = (page: number): UseBrandsResult => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchBrands = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await brandService.getBrands(page)
        if (!cancelled) {
          setBrands(res.data.brands)
          setTotalPages(res.data.totalPages)
        }
      } catch {
        if (!cancelled) setError('Failed to load brands')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchBrands()
    return () => { cancelled = true }
  }, [page])

  return { brands, totalPages, loading, error }
}
