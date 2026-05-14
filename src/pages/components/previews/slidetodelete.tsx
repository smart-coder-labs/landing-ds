import React from 'react'
import { SlideToDelete } from '../../../components/ui/SlideToDelete'

export function SlideToDeletePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SlideToDelete />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
