import React from 'react'
import { ProductCard } from '../../../components/ui/ProductCard'

export function ProductCardPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ProductCard />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
