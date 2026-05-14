import React from 'react'
import { SmartInsightsCard } from '../../../components/ui/SmartInsightsCard'

export function SmartInsightsCardPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SmartInsightsCard />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
