import React from 'react'
import { RoundUpSavingsToggle } from '../../../components/ui/RoundUpSavingsToggle'

export function RoundUpSavingsTogglePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RoundUpSavingsToggle />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
