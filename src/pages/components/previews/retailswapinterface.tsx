import React from 'react'
import { RetailSwapInterface } from '../../../components/ui/RetailSwapInterface'

export function RetailSwapInterfacePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RetailSwapInterface />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
