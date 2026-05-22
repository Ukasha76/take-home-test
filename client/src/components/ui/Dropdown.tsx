interface DropdownProps {
  value: string
  onChange: (value: string) => void
  options: number[]
  placeholder: string
  disabled?: boolean
}

const Dropdown = ({ value, onChange, options, placeholder, disabled = false }: DropdownProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-blue-500"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}

export default Dropdown
