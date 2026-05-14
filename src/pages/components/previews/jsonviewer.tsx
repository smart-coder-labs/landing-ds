import React from 'react'
import { JsonViewer } from '../../../components/ui/JsonViewer'

export function JsonViewerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <JsonViewer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
