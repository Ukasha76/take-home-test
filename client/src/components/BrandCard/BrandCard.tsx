import { formatPriceRange } from '../../utils/formatters'

interface BrandCardProps {
  brand: string
  minPrice: number
  maxPrice: number
}

const BrandCard = ({ brand, minPrice, maxPrice }: BrandCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <p className="font-semibold text-gray-800 mb-1">{brand}</p>
      <p className="text-sm text-gray-500 mb-3">{formatPriceRange(minPrice, maxPrice)}</p>
      {/* Dropdowns and SKU display implemented in Phase 5 */}
    </div>
  )
}

export default BrandCard
