import React from 'react'
import { WindowFrame } from '../../../components/ui/WindowFrame'

export function WindowFramePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <WindowFrame />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
