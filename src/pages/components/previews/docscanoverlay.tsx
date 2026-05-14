import React from 'react'
import { DocScanOverlay } from '../../../components/ui/DocScanOverlay'

export function DocScanOverlayPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <DocScanOverlay />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
