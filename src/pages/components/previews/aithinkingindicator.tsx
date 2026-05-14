import React from 'react'
import { AIThinkingIndicator } from '../../../components/ui/AIThinkingIndicator'

export function AIThinkingIndicatorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AIThinkingIndicator />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
