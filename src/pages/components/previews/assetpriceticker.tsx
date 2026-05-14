import React from 'react'
import { AssetPriceTicker } from '../../../components/ui/AssetPriceTicker'

export function AssetPriceTickerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AssetPriceTicker />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
