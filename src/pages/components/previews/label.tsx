import React from 'react'
import { Label } from '../../../components/ui/Label'

export function LabelPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Label />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
