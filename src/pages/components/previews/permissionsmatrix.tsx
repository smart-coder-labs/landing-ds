import React from 'react'
import { PermissionsMatrix } from '../../../components/ui/PermissionsMatrix'

export function PermissionsMatrixPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PermissionsMatrix />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
