import React from 'react'
import { RadioGroup } from '../../../components/ui/RadioGroup'

export function RadioGroupPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RadioGroup />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
