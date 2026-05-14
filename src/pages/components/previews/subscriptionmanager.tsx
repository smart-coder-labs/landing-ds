import React from 'react'
import { SubscriptionManager } from '../../../components/ui/SubscriptionManager'

export function SubscriptionManagerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SubscriptionManager />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
