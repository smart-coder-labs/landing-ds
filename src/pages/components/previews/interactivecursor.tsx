import React from 'react'
import { InteractiveCursor } from '../../../components/ui/InteractiveCursor'

export function InteractiveCursorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <InteractiveCursor />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
