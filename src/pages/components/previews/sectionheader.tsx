import React from 'react'
import { SectionHeader } from '../../../components/ui/SectionHeader'

export function SectionHeaderPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SectionHeader />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
