'use client'

import { EquityCalculator } from './equity-calculator'
import { MarketDataTable } from './market-data-table'
import { ScrapeTerminal } from './scrape-terminal'

export function CalculatorTab() {
  return (
    <div className="flex flex-col gap-5">
      <EquityCalculator />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,26rem)_1fr]">
        <ScrapeTerminal />
        <MarketDataTable />
      </div>
    </div>
  )
}
