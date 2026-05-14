import React from 'react'
import { BankAccountCard } from '../../../components/ui/BankAccountCard'

export function BankAccountCardPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <BankAccountCard />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
