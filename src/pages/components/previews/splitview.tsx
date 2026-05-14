import React from 'react'
import { SplitView } from '../../../components/ui/SplitView'

export function SplitViewPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SplitView />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
