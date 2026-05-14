import React from 'react'
import { NotificationCenterPanel } from '../../../components/ui/NotificationCenterPanel'

export function NotificationCenterPanelPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <NotificationCenterPanel />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
