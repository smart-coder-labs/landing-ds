import React from 'react'
import { QuickTransferBar } from '../../../components/ui/QuickTransferBar'

export function QuickTransferBarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <QuickTransferBar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
