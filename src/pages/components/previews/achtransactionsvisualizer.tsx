import React from 'react'
import { AchTransactionsVisualizer } from '../../../components/ui/AchTransactionsVisualizer'

export function AchTransactionsVisualizerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AchTransactionsVisualizer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
