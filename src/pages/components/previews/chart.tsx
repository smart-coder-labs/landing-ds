import React from 'react'
import { Chart } from '../../../components/ui/Chart'

export function ChartPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Chart />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
