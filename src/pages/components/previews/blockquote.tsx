import React from 'react'
import { Blockquote } from '../../../components/ui/Blockquote'

export function BlockquotePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Blockquote />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
