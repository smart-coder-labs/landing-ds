import React from 'react'
import { DateRangePicker } from '../../../components/ui/DateRangePicker'

export function DateRangePickerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <DateRangePicker />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
