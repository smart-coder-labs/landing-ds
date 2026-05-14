import React from 'react'
import { Popover } from '../../../components/ui/Popover'

export function PopoverPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Popover />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
