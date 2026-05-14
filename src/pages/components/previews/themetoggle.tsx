import React from 'react'
import { ThemeToggle } from '../../../components/ui/ThemeToggle'

export function ThemeTogglePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ThemeToggle />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
