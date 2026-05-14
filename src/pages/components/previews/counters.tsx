import React from 'react'
import { Counters } from '../../../components/ui/Counters'

export function CountersPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Counters />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
