import { useEffect, useState } from 'react'
import { brandService } from '../../services/brandService'
import { formatPrice, formatPriceRange } from '../../utils/formatters'
import type { BrandOptions, SkuResult } from '../../types'
import Dropdown from '../ui/Dropdown'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorMessage from '../ui/ErrorMessage'

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

  useEffect(() => {
    let cancelled = false
    setLoadingOptions(true)
    setError(null)

    brandService
      .getBrandOptions(brand)
      .then(res => { if (!cancelled) setOptions(res.data) })
      .catch(() => { if (!cancelled) setError('Failed to load options') })
      .finally(() => { if (!cancelled) setLoadingOptions(false) })

    return () => { cancelled = true }
  }, [brand])

  const availableWidths =
    selectedLength && options
      ? (options.widthsByLength[String(selectedLength)] ?? [])
      : []

  const handleLengthChange = (value: string) => {
    setSelectedLength(value ? Number(value) : null)
    setSelectedWidth(null)
    setSkuResult(null)
    setError(null)
  }

  const handleWidthChange = (value: string) => {
    const width = Number(value)
    setSelectedWidth(width)
    setError(null)
    if (!selectedLength) return

    setLoadingSku(true)
    brandService
      .getSku(brand, selectedLength, width)
      .then(res => setSkuResult(res.data))
      .catch(() => setError('Failed to load SKU'))
      .finally(() => setLoadingSku(false))
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <p className="font-semibold text-gray-800 mb-3">{brand}</p>

      <div className="flex items-center gap-2 flex-wrap">
        <Dropdown
          value={selectedLength ? String(selectedLength) : ''}
          onChange={handleLengthChange}
          options={options?.lengths ?? []}
          placeholder="Length"
          disabled={!options}
        />

        <Dropdown
          value={selectedWidth ? String(selectedWidth) : ''}
          onChange={handleWidthChange}
          options={availableWidths}
          placeholder="Width"
          disabled={!options || !selectedLength}
        />

        <div className="flex items-center gap-2 ml-1">
          {skuResult ? (
            <>
              <span className="font-semibold text-gray-900">
                {formatPrice(skuResult.price)}
              </span>
              <span className="text-sm text-gray-500">{skuResult.sku}</span>
            </>
          ) : (
            <span className="text-sm text-gray-600">
              {formatPriceRange(minPrice, maxPrice)}
            </span>
          )}
          {(loadingOptions || loadingSku) && <LoadingSpinner />}
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default BrandCard
