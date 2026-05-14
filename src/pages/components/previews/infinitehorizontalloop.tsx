import React from 'react'
import { InfiniteHorizontalLoop } from '../../../components/ui/InfiniteHorizontalLoop'

export function InfiniteHorizontalLoopPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <InfiniteHorizontalLoop />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
