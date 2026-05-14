import React from 'react'
import { Divider } from '../../../components/ui/Divider'

export function DividerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Divider />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
