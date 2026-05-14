import React from 'react'
import { ProgressiveDisclosurePanel } from '../../../components/ui/ProgressiveDisclosurePanel'

export function ProgressiveDisclosurePanelPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ProgressiveDisclosurePanel />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
