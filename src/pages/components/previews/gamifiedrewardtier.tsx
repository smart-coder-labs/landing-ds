import React from 'react'
import { GamifiedRewardTier } from '../../../components/ui/GamifiedRewardTier'

export function GamifiedRewardTierPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <GamifiedRewardTier />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
