export const formatPrice = (price: number): string => `$${Math.round(price)}`

export const formatPriceRange = (min: number, max: number): string =>
  `${formatPrice(min)} – ${formatPrice(max)}`
