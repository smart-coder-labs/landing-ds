import React from 'react'
import { Panel } from '../../../components/ui/Panel'

export function PanelPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Panel />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
