import React from 'react'
import { CashbackWidget } from '../../../components/ui/CashbackWidget'

export function CashbackWidgetPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CashbackWidget />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
