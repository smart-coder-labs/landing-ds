import React from 'react'
import { ScrollRevealCards } from '../../../components/ui/ScrollRevealCards'

export function ScrollRevealCardsPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ScrollRevealCards />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
