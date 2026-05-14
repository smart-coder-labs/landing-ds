import React from 'react'
import { Sheet } from '../../../components/ui/Sheet'

export function SheetPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Sheet />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
