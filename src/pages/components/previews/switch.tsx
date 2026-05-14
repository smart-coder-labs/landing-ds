import React from 'react'
import { Switch } from '../../../components/ui/Switch'

export function SwitchPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Switch />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
