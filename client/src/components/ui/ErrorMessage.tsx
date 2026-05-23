interface ErrorMessageProps {
  message: string
  variant?: 'inline' | 'page'
}

const ErrorMessage = ({ message, variant = 'inline' }: ErrorMessageProps) => {
  if (variant === 'page') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-sm text-red-600">
        {message}
      </div>
    )
  }
  return <p className="text-sm text-red-500">{message}</p>
}

export default ErrorMessage
