import React from 'react'
import { HamburgerMenuIcon } from '../../../components/ui/HamburgerMenuIcon'

export function HamburgerMenuIconPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <HamburgerMenuIcon />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
