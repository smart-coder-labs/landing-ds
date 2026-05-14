import React from 'react'
import { DataGrid } from '../../../components/ui/DataGrid'

export function DataGridPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <DataGrid />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
