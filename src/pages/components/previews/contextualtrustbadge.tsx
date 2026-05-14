import React from 'react'
import { ContextualTrustBadge } from '../../../components/ui/ContextualTrustBadge'

export function ContextualTrustBadgePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ContextualTrustBadge />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
