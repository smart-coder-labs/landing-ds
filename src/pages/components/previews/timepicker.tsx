import React from 'react'
import { TimePicker } from '../../../components/ui/TimePicker'

export function TimePickerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <TimePicker />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
