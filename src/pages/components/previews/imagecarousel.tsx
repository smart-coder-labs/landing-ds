import React from 'react'
import { ImageCarousel } from '../../../components/ui/ImageCarousel'

export function ImageCarouselPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ImageCarousel />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
