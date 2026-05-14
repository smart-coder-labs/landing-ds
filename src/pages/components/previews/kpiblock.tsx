import React from 'react'
import { KPIBlock } from '../../../components/ui/KPIBlock'

export function KPIBlockPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <KPIBlock />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
