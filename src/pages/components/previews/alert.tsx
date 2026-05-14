import React from 'react'
import { Alert } from '../../../components/ui/Alert'

export function AlertPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Alert />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
