import React from 'react'
import { PaymentConfirmationModal } from '../../../components/ui/PaymentConfirmationModal'

export function PaymentConfirmationModalPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PaymentConfirmationModal />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
