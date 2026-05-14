import React from 'react'
import { LoginForm } from '../../../components/ui/LoginForm'

export function LoginFormPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <LoginForm />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
