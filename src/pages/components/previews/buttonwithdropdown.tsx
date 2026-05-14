import React from 'react'
import { ButtonWithDropdown } from '../../../components/ui/ButtonWithDropdown'

export function ButtonWithDropdownPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <ButtonWithDropdown />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
