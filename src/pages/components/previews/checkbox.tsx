import React from 'react'
import { Checkbox } from '../../../components/ui/Checkbox'

export function CheckboxPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Checkbox />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
