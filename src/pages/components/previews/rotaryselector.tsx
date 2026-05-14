import React from 'react'
import { RotarySelector } from '../../../components/ui/RotarySelector'

export function RotarySelectorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RotarySelector />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
