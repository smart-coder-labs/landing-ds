import React from 'react'
import { MultiFileUpload } from '../../../components/ui/MultiFileUpload'

export function MultiFileUploadPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <MultiFileUpload />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
