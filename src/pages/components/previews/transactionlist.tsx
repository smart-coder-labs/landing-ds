import React from 'react'
import { TransactionList } from '../../../components/ui/TransactionList'

export function TransactionListPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <TransactionList />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
