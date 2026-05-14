import React from 'react'
import { LoadingOverlay } from '../../../components/ui/LoadingOverlay'

export function LoadingOverlayPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <LoadingOverlay />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
