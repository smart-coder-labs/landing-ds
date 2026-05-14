import React from 'react'
import { ParallaxBanner } from '../../../components/ui/ParallaxBanner'

export function ParallaxBannerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ParallaxBanner />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
