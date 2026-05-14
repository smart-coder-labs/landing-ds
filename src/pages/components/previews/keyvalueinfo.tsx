import React from 'react'
import { KeyValueInfo } from '../../../components/ui/KeyValueInfo'

export function KeyValueInfoPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <KeyValueInfo />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
