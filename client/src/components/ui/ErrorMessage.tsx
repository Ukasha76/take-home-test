interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="text-sm text-red-500">{message}</p>
)

export default ErrorMessage
