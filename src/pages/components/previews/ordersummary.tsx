import React from 'react'
import { OrderSummary } from '../../../components/ui/OrderSummary'

export function OrderSummaryPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <OrderSummary />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
