import React from 'react'
import { FairUseLimitTracker } from '../../../components/ui/FairUseLimitTracker'

export function FairUseLimitTrackerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <FairUseLimitTracker />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
