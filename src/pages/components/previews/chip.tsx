import React from 'react'
import { Chip } from '../../../components/ui/Chip'

export function ChipPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Chip />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
