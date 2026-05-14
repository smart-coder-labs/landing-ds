import React from 'react'
import { QuantitySelector } from '../../../components/ui/QuantitySelector'

export function QuantitySelectorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <QuantitySelector />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
