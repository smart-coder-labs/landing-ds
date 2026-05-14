import React from 'react'
import { Spinner } from '../../../components/ui/Spinner'

export function SpinnerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Spinner />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
