import React from 'react'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'

export function BreadcrumbPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Breadcrumb />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
