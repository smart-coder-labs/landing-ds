import React from 'react'
import { Callout } from '../../../components/ui/Callout'

export function CalloutPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Callout />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
