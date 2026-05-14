import React from 'react'
import { Select } from '../../../components/ui/Select'

export function SelectPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Select />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
