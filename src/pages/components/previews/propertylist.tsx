import React from 'react'
import { PropertyList } from '../../../components/ui/PropertyList'

export function PropertyListPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PropertyList />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
