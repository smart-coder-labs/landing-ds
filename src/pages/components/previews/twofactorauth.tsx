import React from 'react'
import { TwoFactorAuth } from '../../../components/ui/TwoFactorAuth'

export function TwoFactorAuthPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <TwoFactorAuth />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
