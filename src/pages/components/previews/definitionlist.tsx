import React from 'react'
import { DefinitionList } from '../../../components/ui/DefinitionList'

export function DefinitionListPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <DefinitionList />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
