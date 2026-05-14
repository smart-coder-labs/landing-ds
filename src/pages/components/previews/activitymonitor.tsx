import React from 'react'
import { ActivityMonitor } from '../../../components/ui/ActivityMonitor'

export function ActivityMonitorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ActivityMonitor />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
