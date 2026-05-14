import React from 'react'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'

export function ConfirmDialogPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ConfirmDialog />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
