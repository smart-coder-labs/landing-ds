import React from 'react'
import { SplitButton } from '../../../components/ui/SplitButton'

export function SplitButtonPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SplitButton />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
