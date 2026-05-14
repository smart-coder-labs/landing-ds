import React from 'react'
import { Layout } from '../../../components/ui/Layout'

export function LayoutPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Layout />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
