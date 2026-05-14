import React from 'react'
import { CreditScoreSimulator } from '../../../components/ui/CreditScoreSimulator'

export function CreditScoreSimulatorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CreditScoreSimulator />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
