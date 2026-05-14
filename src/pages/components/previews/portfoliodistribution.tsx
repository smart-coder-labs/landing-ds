import React from 'react'
import { PortfolioDistribution } from '../../../components/ui/PortfolioDistribution'

export function PortfolioDistributionPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PortfolioDistribution />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
