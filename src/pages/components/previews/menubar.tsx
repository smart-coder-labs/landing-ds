import React from 'react'
import { MenuBar } from '../../../components/ui/MenuBar'

export function MenuBarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <MenuBar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
