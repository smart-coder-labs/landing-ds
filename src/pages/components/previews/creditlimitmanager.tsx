import React from 'react'
import { CreditLimitManager } from '../../../components/ui/CreditLimitManager'

export function CreditLimitManagerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CreditLimitManager />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
