interface DropdownProps {
  value: string
  onChange: (value: string) => void
  options: number[]
  placeholder: string
  disabled?: boolean
}

const Dropdown = ({ value, onChange, options, placeholder, disabled = false }: DropdownProps) => {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={placeholder}
        className="appearance-none border border-gray-300 rounded-lg px-3 py-1.5 pr-7 text-sm text-gray-700 bg-white
                   disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   hover:border-gray-400 transition-colors cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export default Dropdown
