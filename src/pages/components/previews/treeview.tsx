import React from 'react'
import { TreeView } from '../../../components/ui/TreeView'

export function TreeViewPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <TreeView />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
