import React from 'react'
import { SecurityOTPInput } from '../../../components/ui/SecurityOTPInput'

export function SecurityOTPInputPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SecurityOTPInput />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
