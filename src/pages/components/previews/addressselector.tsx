import React from 'react'
import { AddressSelector } from '../../../components/ui/AddressSelector'

export function AddressSelectorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AddressSelector />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
