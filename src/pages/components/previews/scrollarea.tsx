import React from 'react'
import { ScrollArea } from '../../../components/ui/ScrollArea'

export function ScrollAreaPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ScrollArea />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
