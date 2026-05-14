import React from 'react'
import { GestureCard } from '../../../components/ui/GestureCard'

export function GestureCardPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <GestureCard />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
