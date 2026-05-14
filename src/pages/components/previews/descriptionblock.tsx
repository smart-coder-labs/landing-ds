import React from 'react'
import { DescriptionBlock } from '../../../components/ui/DescriptionBlock'

export function DescriptionBlockPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <DescriptionBlock />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
