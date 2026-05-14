import React from 'react'
import { CodeBlock } from '../../../components/ui/CodeBlock'

export function CodeBlockPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CodeBlock />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
