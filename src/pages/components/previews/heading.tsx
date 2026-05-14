import React from 'react'
import { Heading } from '../../../components/ui/Heading'

export function HeadingPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Heading />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
