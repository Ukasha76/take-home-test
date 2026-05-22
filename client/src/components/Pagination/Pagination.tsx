interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Full implementation in Phase 5
  return (
    <div className="flex justify-center gap-1">
      {/* Pagination controls implemented in Phase 5 */}
    </div>
  )
}

export default Pagination
