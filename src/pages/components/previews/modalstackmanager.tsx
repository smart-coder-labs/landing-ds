import React from 'react'
import { ModalStackManager } from '../../../components/ui/ModalStackManager'

export function ModalStackManagerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ModalStackManager />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
