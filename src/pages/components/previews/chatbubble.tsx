import React from 'react'
import { ChatBubble } from '../../../components/ui/ChatBubble'

export function ChatBubblePreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ChatBubble />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
