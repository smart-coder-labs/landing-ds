import React from 'react'
import { AgendaView } from '../../../components/ui/AgendaView'

export function AgendaViewPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AgendaView />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
