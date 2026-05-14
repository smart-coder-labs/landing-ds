import React from 'react'
import { Input } from '../../../components/ui/Input'

export function InputPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Input />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
