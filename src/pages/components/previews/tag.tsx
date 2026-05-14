import React from 'react'
import { Tag } from '../../../components/ui/Tag'

export function TagPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Tag />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
