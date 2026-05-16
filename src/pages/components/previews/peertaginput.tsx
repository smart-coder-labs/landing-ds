import React from 'react'
import { PeerTagInput } from '../../../components/ui/PeerTagInput'

const SAMPLE_CONTACTS = [
  { id: '1', tag: '$alice', name: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/40?img=1', isVerified: true, recentActivity: 'Active today' },
  { id: '2', tag: '$bob', name: 'Bob Smith', avatarUrl: 'https://i.pravatar.cc/40?img=3', isVerified: false, recentActivity: '2h ago' },
  { id: '3', tag: '$carol', name: 'Carol White', avatarUrl: 'https://i.pravatar.cc/40?img=5', isVerified: true },
  { id: '4', tag: '$dave', name: 'Dave Martinez', avatarUrl: 'https://i.pravatar.cc/40?img=7', isVerified: false, recentActivity: 'Yesterday' },
  { id: '5', tag: '$emma', name: 'Emma Davis', avatarUrl: 'https://i.pravatar.cc/40?img=9', isVerified: true, recentActivity: 'Active now' },
]

export function PeerTagInputPreview() {
  try {
    return (
      <div className="flex items-center justify-center p-8 max-h-[400px]">
        <PeerTagInput contacts={SAMPLE_CONTACTS} />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
