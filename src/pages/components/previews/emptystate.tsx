import React from 'react'
import { EmptyState } from '../../../components/ui/EmptyState'

export function EmptyStatePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <EmptyState />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
