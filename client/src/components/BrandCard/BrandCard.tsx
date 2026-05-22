import { useEffect, useState } from 'react'
import { brandService } from '../../services/brandService'
import { formatPrice, formatPriceRange } from '../../utils/formatters'
import type { BrandOptions, SkuResult } from '../../types'
import Dropdown from '../ui/Dropdown'

interface BrandCardProps {
  brand: string
  minPrice: number
  maxPrice: number
}

const BrandCard = ({ brand, minPrice, maxPrice }: BrandCardProps) => {
  const [options, setOptions] = useState<BrandOptions | null>(null)
  const [selectedLength, setSelectedLength] = useState<number | null>(null)
  const [selectedWidth, setSelectedWidth] = useState<number | null>(null)
  const [skuResult, setSkuResult] = useState<SkuResult | null>(null)
  const [loadingOptions, setLoadingOptions] = useState(true)
  const [loadingSku, setLoadingSku] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Implemented in Phase 5
  useEffect(() => {
    setLoadingOptions(true)
    brandService.getBrandOptions(brand)
      .then(res => setOptions(res.data))
      .catch(() => setError('Failed to load options'))
      .finally(() => setLoadingOptions(false))
  }, [brand])

  const availableWidths = selectedLength && options
    ? (options.widthsByLength[String(selectedLength)] ?? [])
    : []

  const handleLengthChange = (value: string) => {
    setSelectedLength(Number(value))
    setSelectedWidth(null)
    setSkuResult(null)
  }

  const handleWidthChange = (value: string) => {
    const width = Number(value)
    setSelectedWidth(width)
    if (!selectedLength) return
    setLoadingSku(true)
    brandService.getSku(brand, selectedLength, width)
      .then(res => setSkuResult(res.data))
      .catch(() => setError('Failed to load SKU'))
      .finally(() => setLoadingSku(false))
  }

  // Placeholder — full implementation in Phase 5
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <p className="font-semibold text-gray-800 mb-3">{brand}</p>
      {/* Full card UI implemented in Phase 5 */}
    </div>
  )
}

export default BrandCard
