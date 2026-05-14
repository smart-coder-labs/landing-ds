import React from 'react'
import { VoiceCommandOverlay } from '../../../components/ui/VoiceCommandOverlay'

export function VoiceCommandOverlayPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <VoiceCommandOverlay />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
