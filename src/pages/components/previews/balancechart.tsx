import React from 'react'
import { BalanceChart } from '../../../components/ui/BalanceChart'

export function BalanceChartPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <BalanceChart />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
