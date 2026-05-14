import React from 'react'
import { TagsInput } from '../../../components/ui/TagsInput'

export function TagsInputPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <TagsInput />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
