import React from 'react'
import { PromptSuggestionChips } from '../../../components/ui/PromptSuggestionChips'

export function PromptSuggestionChipsPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PromptSuggestionChips />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
