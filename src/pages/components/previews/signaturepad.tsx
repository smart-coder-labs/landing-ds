import React from 'react'
import { SignaturePad } from '../../../components/ui/SignaturePad'

export function SignaturePadPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SignaturePad />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
