import React from 'react'
import { DatePicker } from '../../../components/ui/DatePicker'

export function DatePickerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <DatePicker />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
