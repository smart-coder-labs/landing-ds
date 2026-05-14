import React from 'react'
import { RichTextEditor } from '../../../components/ui/RichTextEditor'

export function RichTextEditorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RichTextEditor />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
