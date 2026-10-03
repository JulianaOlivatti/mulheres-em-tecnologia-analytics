'use client'

import { Fragment, useRef } from 'react'
import { cn } from '@/lib/utils'

export type StepTab = { id: string; label: string }

export function StepTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: StepTab[]
  active: string
  onChange: (id: string) => void
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
    refs.current[next]?.focus()
    onChange(tabs[next].id)
  }

  return (
    <div
      role="tablist"
      aria-label="Seções do dashboard"
      className="flex items-center gap-2 overflow-x-auto rounded-xl border border-border bg-card p-2 shadow-sm sm:gap-4 sm:px-4"
    >
      {tabs.map((tab, index) => {
        const isActive = tab.id === active
        return (
          <Fragment key={tab.id}>
            {index > 0 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'hidden h-px min-w-6 flex-1 sm:block',
                  index <= tabs.findIndex((t) => t.id === active) ? 'bg-navy' : 'bg-border',
                )}
              />
            ) : null}
            <button
              ref={(el) => {
                refs.current[index] = el
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-lg px-2 py-1.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-navy/30',
                isActive ? 'text-navy' : 'text-muted-foreground hover:text-navy',
              )}
            >
              <span
                className={cn(
                  'flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                  isActive ? 'bg-navy text-white' : 'bg-muted text-muted-foreground',
                )}
              >
                {index + 1}
              </span>
              <span className={cn('font-serif text-base sm:text-lg', isActive && 'text-navy')}>
                {tab.label}
              </span>
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}
