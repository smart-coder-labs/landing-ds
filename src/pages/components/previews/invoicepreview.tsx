import React from 'react'
import { InvoicePreview } from '../../../components/ui/InvoicePreview'

export function InvoicePreviewPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <InvoicePreview />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
