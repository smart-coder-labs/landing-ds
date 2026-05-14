import React from 'react'
import { JargonTooltip } from '../../../components/ui/JargonTooltip'

export function JargonTooltipPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <JargonTooltip />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
