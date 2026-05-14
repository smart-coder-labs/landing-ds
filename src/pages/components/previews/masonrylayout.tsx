import React from 'react'
import { MasonryLayout } from '../../../components/ui/MasonryLayout'

export function MasonryLayoutPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <MasonryLayout />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
