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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <div className="w-2 h-6 bg-blue-600 rounded-full" />
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">Brand Catalog</h1>
            <p className="text-xs text-gray-400 mt-0.5">Select dimensions to find your SKU</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-9 h-9 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-64">
            <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-sm text-red-600">
              {error}
            </div>
          </div>
        )}

        {!loading && !error && brands.length === 0 && (
          <p className="text-center text-gray-400 py-16">No brands found.</p>
        )}

        {!loading && !error && brands.length > 0 && (
          <>
            <div className="mb-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.map((brand) => (
                <BrandCard
                  key={brand.brand}
                  brand={brand.brand}
                  minPrice={brand.minPrice}
                  maxPrice={brand.maxPrice}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default HomePage
