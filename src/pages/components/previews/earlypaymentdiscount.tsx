import React from 'react'
import { EarlyPaymentDiscount } from '../../../components/ui/EarlyPaymentDiscount'

export function EarlyPaymentDiscountPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <EarlyPaymentDiscount />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
