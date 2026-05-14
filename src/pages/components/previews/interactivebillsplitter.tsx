import React from 'react'
import { InteractiveBillSplitter } from '../../../components/ui/InteractiveBillSplitter'

export function InteractiveBillSplitterPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <InteractiveBillSplitter />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
