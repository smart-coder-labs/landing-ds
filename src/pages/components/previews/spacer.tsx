import React from 'react'
import { Spacer } from '../../../components/ui/Spacer'

export function SpacerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Spacer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
