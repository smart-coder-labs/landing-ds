import React from 'react'
import { Tabs } from '../../../components/ui/Tabs'

export function TabsPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Tabs />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
