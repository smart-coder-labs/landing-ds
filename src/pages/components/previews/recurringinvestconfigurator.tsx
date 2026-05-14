import React from 'react'
import { RecurringInvestConfigurator } from '../../../components/ui/RecurringInvestConfigurator'

export function RecurringInvestConfiguratorPreview() {
  try {
    return (
      <div className="overflow-auto max-h-[400px] max-w-full">
        <RecurringInvestConfigurator />
      </div>
    )
  } catch (error) {
    return <div className="p-4 text-red-500 text-sm">Preview error: {String(error)}</div>
  }
}
