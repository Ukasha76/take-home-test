import { useEffect, useRef, useState } from 'react'
import { brandService } from '../services/brandService'
import type { BrandOptions, SkuResult } from '../types'

interface UseBrandCardResult {
  options: BrandOptions | null
  selectedLength: number | null
  selectedWidth: number | null
  skuResult: SkuResult | null
  availableWidths: number[]
  loadingOptions: boolean
  loadingSku: boolean
  error: string | null
  handleLengthChange: (value: string) => void
  handleWidthChange: (value: string) => Promise<void>
}

export const useBrandCard = (brand: string): UseBrandCardResult => {
  const [options, setOptions] = useState<BrandOptions | null>(null)
  const [selectedLength, setSelectedLength] = useState<number | null>(null)
  const [selectedWidth, setSelectedWidth] = useState<number | null>(null)
  const [skuResult, setSkuResult] = useState<SkuResult | null>(null)
  const [loadingOptions, setLoadingOptions] = useState(true)
  const [loadingSku, setLoadingSku] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const skuRequestId = useRef(0)

  useEffect(() => {
    let cancelled = false
    setLoadingOptions(true)
    setError(null)

    const fetchOptions = async () => {
      try {
        const res = await brandService.getBrandOptions(brand)
        if (!cancelled) setOptions(res.data)
      } catch {
        if (!cancelled) setError('Failed to load options')
      } finally {
        if (!cancelled) setLoadingOptions(false)
      }
    }

    fetchOptions()
    return () => { cancelled = true }
  }, [brand])

  const availableWidths =
    selectedLength && options
      ? (options.widthsByLength[String(selectedLength)] ?? [])
      : []

  const handleLengthChange = (value: string) => {
    skuRequestId.current++
    setSelectedLength(value ? Number(value) : null)
    setSelectedWidth(null)
    setSkuResult(null)
    setError(null)
  }

  const handleWidthChange = async (value: string) => {
    if (!value) return
    const width = Number(value)
    setSelectedWidth(width)
    setSkuResult(null)
    setError(null)
    if (!selectedLength) return

    const requestId = ++skuRequestId.current
    setLoadingSku(true)
    try {
      const res = await brandService.getSku(brand, selectedLength, width)
      if (skuRequestId.current === requestId) setSkuResult(res.data)
    } catch {
      if (skuRequestId.current === requestId) setError('Failed to load SKU')
    } finally {
      if (skuRequestId.current === requestId) setLoadingSku(false)
    }
  }

  return {
    options,
    selectedLength,
    selectedWidth,
    skuResult,
    availableWidths,
    loadingOptions,
    loadingSku,
    error,
    handleLengthChange,
    handleWidthChange,
  }
}
