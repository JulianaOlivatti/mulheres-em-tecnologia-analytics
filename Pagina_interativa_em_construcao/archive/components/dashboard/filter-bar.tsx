'use client'

import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

export type FilterDef = { key: string; label: string; options: string[]; defaultValue?: string }

export function FilterBar({ filters }: { filters: FilterDef[] }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(filters.map((f) => [f.key, f.defaultValue ?? f.options[0]])),
  )

  return (
    <div
      role="group"
      aria-label="Filtros"
      className="grid grid-cols-2 gap-3 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
      style={{ '--cols': filters.length } as React.CSSProperties}
    >
      {filters.map((filter) => (
        <FilterSelect
          key={filter.key}
          filter={filter}
          value={values[filter.key]}
          onChange={(v) => setValues((prev) => ({ ...prev, [filter.key]: v }))}
        />
      ))}
    </div>
  )
}

function FilterSelect({
  filter,
  value,
  onChange,
}: {
  filter: FilterDef
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {filter.label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full appearance-none rounded-lg border border-input bg-card pl-3 pr-9 text-sm text-navy shadow-sm outline-none transition focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/20"
        >
          {filter.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-navy/60"
        />
      </div>
    </div>
  )
}
