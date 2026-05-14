import React from 'react'
import { VoiceRecorder } from '../../../components/ui/VoiceRecorder'

export function VoiceRecorderPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <VoiceRecorder />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
