import React from 'react'
import { Text } from '../../../components/ui/Text'

export function TextPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Text />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
