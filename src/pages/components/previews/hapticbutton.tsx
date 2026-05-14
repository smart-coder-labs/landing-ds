import React from 'react'
import { HapticButton } from '../../../components/ui/HapticButton'

export function HapticButtonPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <HapticButton />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
