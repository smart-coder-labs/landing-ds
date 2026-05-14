import React from 'react'
import { AudioPlayer } from '../../../components/ui/AudioPlayer'

export function AudioPlayerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AudioPlayer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
