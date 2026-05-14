import React from 'react'
import { Progress } from '../../../components/ui/Progress'

export function ProgressPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Progress />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
