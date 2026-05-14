import React from 'react'
import { ErrorBoundary } from '../../../components/ui/ErrorBoundary'

export function ErrorBoundaryPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ErrorBoundary />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
