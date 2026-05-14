import React from 'react'
import { NavigationDrawer } from '../../../components/ui/NavigationDrawer'

export function NavigationDrawerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <NavigationDrawer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
