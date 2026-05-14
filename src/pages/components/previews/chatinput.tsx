import React from 'react'
import { ChatInput } from '../../../components/ui/ChatInput'

export function ChatInputPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ChatInput />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
