import React from 'react'
import { MessageReactions } from '../../../components/ui/MessageReactions'

export function MessageReactionsPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <MessageReactions />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
