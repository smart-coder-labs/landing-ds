import React from 'react'
import { DockBar } from '../../../components/ui/DockBar'

export function DockBarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <DockBar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
