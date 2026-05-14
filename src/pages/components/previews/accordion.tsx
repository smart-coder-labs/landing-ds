import React from 'react'
import { Accordion } from '../../../components/ui/Accordion'

export function AccordionPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Accordion />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
