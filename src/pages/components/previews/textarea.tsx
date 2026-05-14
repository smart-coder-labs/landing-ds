import React from 'react'
import { Textarea } from '../../../components/ui/Textarea'

export function TextareaPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Textarea />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
