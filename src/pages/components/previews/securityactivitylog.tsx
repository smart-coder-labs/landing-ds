import React from 'react'
import { SecurityActivityLog } from '../../../components/ui/SecurityActivityLog'

export function SecurityActivityLogPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SecurityActivityLog />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
