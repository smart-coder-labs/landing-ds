import React from 'react'
import { TopActionBar } from '../../../components/ui/TopActionBar'

export function TopActionBarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <TopActionBar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
