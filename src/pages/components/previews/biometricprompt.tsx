import React from 'react'
import { BiometricPrompt } from '../../../components/ui/BiometricPrompt'

export function BiometricPromptPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <BiometricPrompt />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
