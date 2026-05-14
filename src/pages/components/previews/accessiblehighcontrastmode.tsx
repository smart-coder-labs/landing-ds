import React from 'react'
import { AccessibleHighContrastMode } from '../../../components/ui/AccessibleHighContrastMode'

export function AccessibleHighContrastModePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AccessibleHighContrastMode />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
