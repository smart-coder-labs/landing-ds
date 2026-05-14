import React from 'react'
import { Lightbox } from '../../../components/ui/Lightbox'

export function LightboxPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Lightbox />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
