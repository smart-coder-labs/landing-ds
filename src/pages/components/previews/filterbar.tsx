import React from 'react'
import { FilterBar } from '../../../components/ui/FilterBar'

export function FilterBarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <FilterBar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
