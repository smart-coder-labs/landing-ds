import React from 'react'
import { CommentThread } from '../../../components/ui/CommentThread'

export function CommentThreadPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CommentThread />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
