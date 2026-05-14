import React from 'react'
import { VirtualCardPreview } from '../../../components/ui/VirtualCardPreview'

export function VirtualCardPreviewPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <VirtualCardPreview />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
