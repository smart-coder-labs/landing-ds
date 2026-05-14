import React from 'react'
import { RatingInput } from '../../../components/ui/RatingInput'

export function RatingInputPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RatingInput />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
