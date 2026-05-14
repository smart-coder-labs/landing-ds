import React from 'react'
import { SignupForm } from '../../../components/ui/SignupForm'

export function SignupFormPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <SignupForm />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
