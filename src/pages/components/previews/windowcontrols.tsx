import React from 'react'
import { WindowControls } from '../../../components/ui/WindowControls'

export function WindowControlsPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <WindowControls />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
