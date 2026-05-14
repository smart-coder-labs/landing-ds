import React from 'react'
import { Footer } from '../../../components/ui/Footer'

export function FooterPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <Footer />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
