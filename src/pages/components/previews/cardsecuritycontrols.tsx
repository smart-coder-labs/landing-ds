import React from 'react'
import { CardSecurityControls } from '../../../components/ui/CardSecurityControls'

export function CardSecurityControlsPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CardSecurityControls />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
