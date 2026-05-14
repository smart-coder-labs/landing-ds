import React from 'react'
import { FloatingElement } from '../../../components/ui/FloatingElement'

export function FloatingElementPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <FloatingElement />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
