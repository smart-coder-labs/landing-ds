import React from 'react'
import { Collapsible } from '../../../components/ui/Collapsible'

export function CollapsiblePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Collapsible />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
