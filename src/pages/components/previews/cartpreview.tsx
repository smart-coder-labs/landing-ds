import React from 'react'
import { CartPreview } from '../../../components/ui/CartPreview'

export function CartPreviewPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <CartPreview />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
