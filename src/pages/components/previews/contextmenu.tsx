import React from 'react'
import { ContextMenu } from '../../../components/ui/ContextMenu'

export function ContextMenuPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ContextMenu />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
