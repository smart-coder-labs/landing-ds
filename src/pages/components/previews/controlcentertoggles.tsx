import React from 'react'
import { ControlCenterToggles } from '../../../components/ui/ControlCenterToggles'

export function ControlCenterTogglesPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ControlCenterToggles />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
