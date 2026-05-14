import React from 'react'
import { ScrollProgressBar } from '../../../components/ui/ScrollProgressBar'

export function ScrollProgressBarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ScrollProgressBar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
