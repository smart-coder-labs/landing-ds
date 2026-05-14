import React from 'react'
import { Card } from '../../../components/ui/Card'

export function CardPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Card />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
