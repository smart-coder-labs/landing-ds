import React from 'react'
import { VideoPlayer } from '../../../components/ui/VideoPlayer'

export function VideoPlayerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <VideoPlayer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
