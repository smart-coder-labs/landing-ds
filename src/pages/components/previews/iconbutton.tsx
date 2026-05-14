import React from 'react'
import { IconButton } from '../../../components/ui/IconButton'

export function IconButtonPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <IconButton />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
