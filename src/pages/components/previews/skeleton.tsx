import React from 'react'
import { Skeleton } from '../../../components/ui/Skeleton'

export function SkeletonPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Skeleton />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
