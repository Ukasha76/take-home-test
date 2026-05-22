import { useState } from 'react'
import { useBrands } from '../hooks/useBrands'
import BrandCard from '../components/BrandCard'
import Pagination from '../components/Pagination'

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { brands, totalPages, loading, error } = useBrands(currentPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Brand Products</h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-8">{error}</div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {brands.map((brand) => (
                <BrandCard
                  key={brand.brand}
                  brand={brand.brand}
                  minPrice={brand.minPrice}
                  maxPrice={brand.maxPrice}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
