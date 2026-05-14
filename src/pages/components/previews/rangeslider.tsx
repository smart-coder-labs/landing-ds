import React from 'react'
import { RangeSlider } from '../../../components/ui/RangeSlider'

export function RangeSliderPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RangeSlider />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
