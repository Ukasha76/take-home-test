import { formatPrice, formatPriceRange } from '../../utils/formatters'
import { useBrandCard } from '../../hooks/useBrandCard'
import Dropdown from '../ui/Dropdown'
import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorMessage from '../ui/ErrorMessage'

interface BrandCardProps {
  brand: string
  minPrice: number
  maxPrice: number
}

const BrandCard = ({ brand, minPrice, maxPrice }: BrandCardProps) => {
  const {
    options,
    selectedLength,
    selectedWidth,
    skuResult,
    availableWidths,
    loadingOptions,
    loadingSku,
    error,
    handleLengthChange,
    handleWidthChange,
  } = useBrandCard(brand)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-base">{brand}</h2>
        {loadingOptions && <LoadingSpinner />}
      </div>

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
              <span className="text-lg font-bold text-gray-900 leading-none">
                {formatPrice(skuResult.price)}
              </span>
              <span className="text-xs text-gray-400 font-mono tracking-wide bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">
                {skuResult.sku}
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-500 font-medium">
              {formatPriceRange(minPrice, maxPrice)}
            </span>
          )}
          {loadingSku && <LoadingSpinner />}
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default BrandCard
