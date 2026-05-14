import React from 'react'
import { Caption } from '../../../components/ui/Caption'

export function CaptionPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Caption />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
