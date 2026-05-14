import React from 'react'
import { TransferForm } from '../../../components/ui/TransferForm'

export function TransferFormPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <TransferForm />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
