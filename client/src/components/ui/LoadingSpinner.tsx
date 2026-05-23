interface LoadingSpinnerProps {
  size?: 'sm' | 'lg'
}

const LoadingSpinner = ({ size = 'sm' }: LoadingSpinnerProps) => (
  <div
    className={
      size === 'lg'
        ? 'w-9 h-9 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin'
        : 'w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'
    }
  />
)

export default LoadingSpinner
