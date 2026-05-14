import React from 'react'
import { FAB } from '../../../components/ui/FAB'

export function FABPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <FAB />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
