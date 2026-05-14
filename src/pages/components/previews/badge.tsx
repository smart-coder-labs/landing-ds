import React from 'react'
import { Badge } from '../../../components/ui/Badge'

export function BadgePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Badge />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
