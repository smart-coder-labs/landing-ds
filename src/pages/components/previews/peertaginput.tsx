import React from 'react'
import { PeerTagInput } from '../../../components/ui/PeerTagInput'

export function PeerTagInputPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <PeerTagInput />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
