import React from 'react'
import { Toast } from '../../../components/ui/Toast'

export function ToastPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Toast />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
