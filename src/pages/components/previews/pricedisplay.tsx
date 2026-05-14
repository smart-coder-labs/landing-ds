import React from 'react'
import { PriceDisplay } from '../../../components/ui/PriceDisplay'

export function PriceDisplayPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PriceDisplay />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
