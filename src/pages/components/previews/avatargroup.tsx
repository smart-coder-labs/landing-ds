import React from 'react'
import { AvatarGroup } from '../../../components/ui/AvatarGroup'

export function AvatarGroupPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <AvatarGroup />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
