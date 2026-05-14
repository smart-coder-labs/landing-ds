import React from 'react'
import { BehavioralAuthSimulator } from '../../../components/ui/BehavioralAuthSimulator'

export function BehavioralAuthSimulatorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <BehavioralAuthSimulator />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
