import React from 'react'
import { FintechDashboardPreview } from '../../../components/ui/FintechDashboardPreview'

export function FintechDashboardPreviewPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <FintechDashboardPreview />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
