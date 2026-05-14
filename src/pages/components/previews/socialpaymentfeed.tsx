import React from 'react'
import { SocialPaymentFeed } from '../../../components/ui/SocialPaymentFeed'

export function SocialPaymentFeedPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SocialPaymentFeed />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
