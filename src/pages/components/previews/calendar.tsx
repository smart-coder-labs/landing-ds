import React from 'react'
import { Calendar } from '../../../components/ui/Calendar'

export function CalendarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Calendar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
