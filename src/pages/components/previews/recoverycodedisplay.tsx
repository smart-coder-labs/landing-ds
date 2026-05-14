import React from 'react'
import { RecoveryCodeDisplay } from '../../../components/ui/RecoveryCodeDisplay'

export function RecoveryCodeDisplayPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RecoveryCodeDisplay />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
