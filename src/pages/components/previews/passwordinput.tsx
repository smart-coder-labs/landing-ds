import React from 'react'
import { PasswordInput } from '../../../components/ui/PasswordInput'

export function PasswordInputPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PasswordInput />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
