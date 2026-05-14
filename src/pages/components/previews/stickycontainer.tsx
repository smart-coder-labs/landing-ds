import React from 'react'
import { StickyContainer } from '../../../components/ui/StickyContainer'

export function StickyContainerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <StickyContainer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
