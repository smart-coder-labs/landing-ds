import React from 'react'
import { QRCodeGenerator } from '../../../components/ui/QRCodeGenerator'

export function QRCodeGeneratorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <QRCodeGenerator />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
