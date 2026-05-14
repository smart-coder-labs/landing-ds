import React from 'react'
import { Avatar } from '../../../components/ui/Avatar'

export function AvatarPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Avatar />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
