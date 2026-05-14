import React from 'react'
import { StatisticDisplay } from '../../../components/ui/StatisticDisplay'

export function StatisticDisplayPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <StatisticDisplay />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
