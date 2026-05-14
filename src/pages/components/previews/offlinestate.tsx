import React from 'react'
import { OfflineState } from '../../../components/ui/OfflineState'

export function OfflineStatePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <OfflineState />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
