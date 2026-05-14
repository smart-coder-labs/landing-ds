import React from 'react'
import { MaintenanceMode } from '../../../components/ui/MaintenanceMode'

export function MaintenanceModePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <MaintenanceMode />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
