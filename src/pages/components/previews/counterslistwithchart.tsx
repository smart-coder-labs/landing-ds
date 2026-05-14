import React from 'react'
import { CountersListWithChart } from '../../../components/ui/CountersListWithChart'

export function CountersListWithChartPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CountersListWithChart />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
