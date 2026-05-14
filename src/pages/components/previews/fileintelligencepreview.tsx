import React from 'react'
import { FileIntelligencePreview } from '../../../components/ui/FileIntelligencePreview'

export function FileIntelligencePreviewPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <FileIntelligencePreview />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
