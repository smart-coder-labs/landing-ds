import React from 'react'
import { MicroCommitmentStepper } from '../../../components/ui/MicroCommitmentStepper'

export function MicroCommitmentStepperPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <MicroCommitmentStepper />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
