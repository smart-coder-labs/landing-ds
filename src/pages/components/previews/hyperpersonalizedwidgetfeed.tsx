import React from 'react'
import { HyperPersonalizedWidgetFeed } from '../../../components/ui/HyperPersonalizedWidgetFeed'

export function HyperPersonalizedWidgetFeedPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <HyperPersonalizedWidgetFeed />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
