import React from 'react'
import { ExpenseCategorizer } from '../../../components/ui/ExpenseCategorizer'

export function ExpenseCategorizerPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ExpenseCategorizer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
