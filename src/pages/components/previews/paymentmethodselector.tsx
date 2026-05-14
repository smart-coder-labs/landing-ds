import React from 'react'
import { PaymentMethodSelector } from '../../../components/ui/PaymentMethodSelector'

export function PaymentMethodSelectorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PaymentMethodSelector />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
