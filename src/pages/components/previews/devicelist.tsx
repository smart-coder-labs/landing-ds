import React from 'react'
import { DeviceList } from '../../../components/ui/DeviceList'

export function DeviceListPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <DeviceList />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
