import React from 'react'
import { Timeline } from '../../../components/ui/Timeline'

export function TimelinePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Timeline />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
