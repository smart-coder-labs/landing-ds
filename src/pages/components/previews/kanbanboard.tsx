import React from 'react'
import { KanbanBoard } from '../../../components/ui/KanbanBoard'

export function KanbanBoardPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <KanbanBoard />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
