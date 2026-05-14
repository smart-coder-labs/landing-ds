import React from 'react'
import { SegmentedInput } from '../../../components/ui/SegmentedInput'

export function SegmentedInputPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SegmentedInput />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
