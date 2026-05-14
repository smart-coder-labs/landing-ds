import React from 'react'
import { InstallmentSimulator } from '../../../components/ui/InstallmentSimulator'

export function InstallmentSimulatorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <InstallmentSimulator />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
