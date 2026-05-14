import React from 'react'
import { GridSystem } from '../../../components/ui/GridSystem'

export function GridSystemPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <GridSystem />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
