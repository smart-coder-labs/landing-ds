import React from 'react'
import { ResizablePanel } from '../../../components/ui/ResizablePanel'

export function ResizablePanelPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ResizablePanel />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
