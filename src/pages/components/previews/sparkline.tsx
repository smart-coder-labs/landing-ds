import React from 'react'
import { Sparkline } from '../../../components/ui/Sparkline'

export function SparklinePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Sparkline />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
