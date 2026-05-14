import React from 'react'
import { Pagination } from '../../../components/ui/Pagination'

export function PaginationPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Pagination />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
