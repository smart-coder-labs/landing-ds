import React from 'react'
import { UnscramblingText } from '../../../components/ui/UnscramblingText'

export function UnscramblingTextPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <UnscramblingText />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
