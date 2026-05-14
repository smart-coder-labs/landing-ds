import React from 'react'
import { AssetAllocationChart } from '../../../components/ui/AssetAllocationChart'

export function AssetAllocationChartPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AssetAllocationChart />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
