import React from 'react'
import { Snackbar } from '../../../components/ui/Snackbar'

export function SnackbarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Snackbar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
