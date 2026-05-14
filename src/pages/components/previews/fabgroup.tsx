import React from 'react'
import { FABGroup } from '../../../components/ui/FABGroup'

export function FABGroupPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <FABGroup />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
