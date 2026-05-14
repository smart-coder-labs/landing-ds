import React from 'react'
import { Table } from '../../../components/ui/Table'

export function TablePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Table />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
