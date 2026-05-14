import React from 'react'
import { CurrencyConverterWidget } from '../../../components/ui/CurrencyConverterWidget'

export function CurrencyConverterWidgetPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CurrencyConverterWidget />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
