import React from 'react'
import { Modal } from '../../../components/ui/Modal'

export function ModalPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Modal />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
