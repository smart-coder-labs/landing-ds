import React from 'react'
import { Combobox } from '../../../components/ui/Combobox'

export function ComboboxPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Combobox />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
