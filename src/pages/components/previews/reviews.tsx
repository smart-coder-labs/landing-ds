import React from 'react'
import { Reviews } from '../../../components/ui/Reviews'

export function ReviewsPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Reviews />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
