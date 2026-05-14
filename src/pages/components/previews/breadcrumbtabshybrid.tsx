import React from 'react'
import { BreadcrumbTabsHybrid } from '../../../components/ui/BreadcrumbTabsHybrid'

export function BreadcrumbTabsHybridPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <BreadcrumbTabsHybrid />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
