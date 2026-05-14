import React from 'react'
import { FloatingToolbar } from '../../../components/ui/FloatingToolbar'

export function FloatingToolbarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <FloatingToolbar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
