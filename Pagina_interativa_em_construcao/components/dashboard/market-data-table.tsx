'use client'

import { ArrowDown, ArrowUp, ArrowUpDown, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useMarketScrape } from '@/hooks/use-market-scrape'
import { type MarketRecord, marketAreas } from '@/lib/market-data'
import { cn } from '@/lib/utils'

type SortKey = 'cargo' | 'homens' | 'mulheres' | 'gap'

const currency = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

const columns: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: 'cargo', label: 'Cargo' },
  { key: 'homens', label: 'Média salarial homens', numeric: true },
  { key: 'mulheres', label: 'Média salarial mulheres', numeric: true },
  { key: 'gap', label: 'Gap %', numeric: true },
]

function gapTone(gap: number) {
  if (gap >= 20) return 'bg-peach-deep text-white'
  if (gap >= 12) return 'bg-peach text-navy'
  return 'bg-sage text-navy'
}

export function MarketDataTable() {
  const { data, isLoading } = useMarketScrape()
  const [query, setQuery] = useState('')
  const [area, setArea] = useState('Todas')
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'gap', dir: 'desc' })

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = (data?.records ?? []).filter(
      (r) => (area === 'Todas' || r.area === area) && (!q || r.cargo.toLowerCase().includes(q)),
    )
    const factor = sort.dir === 'asc' ? 1 : -1
    return filtered.sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      return (typeof av === 'string' ? av.localeCompare(bv as string, 'pt-BR') : av - (bv as number)) * factor
    })
  }, [data, query, area, sort])

  const avgGap = rows.length ? rows.reduce((s, r) => s + r.gap, 0) / rows.length : 0

  function toggleSort(key: SortKey) {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }))
  }

  return (
    <section
      aria-labelledby="market-table-title"
      className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-sm"
    >
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 id="market-table-title" className="font-serif text-xl text-navy">
            Dados raspados do mercado
          </h3>
          <p className="text-sm text-muted-foreground">
            {rows.length} cargos · gap médio{' '}
            <span className="font-semibold text-navy tabular-nums">
              {avgGap.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative">
            <span className="sr-only">Buscar cargo</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cargo..."
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-navy shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/20 sm:w-56"
            />
          </label>
          <label>
            <span className="sr-only">Filtrar por área</span>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-navy shadow-sm outline-none focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/20 sm:w-44"
            >
              <option>Todas</option>
              {marketAreas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              {columns.map((col) => {
                const active = sort.key === col.key
                const Icon = active ? (sort.dir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className={cn('px-4 py-3 font-medium', col.numeric && 'text-right')}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded text-navy outline-none hover:text-navy/80 focus-visible:ring-2 focus-visible:ring-navy/30',
                        col.numeric && 'flex-row-reverse',
                      )}
                    >
                      {col.label}
                      <Icon className={cn('size-3.5', !active && 'opacity-40')} aria-hidden="true" />
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading && !data
              ? Array.from({ length: 6 }, (_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-4 py-3">
                      <div className="h-4 animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))
              : rows.map((r) => <Row key={r.id} record={r} />)}
            {data && rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Nenhum cargo encontrado para os filtros aplicados.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Row({ record: r }: { record: MarketRecord }) {
  return (
    <tr className="transition-colors hover:bg-navy-soft/60">
      <td className="px-4 py-3">
        <p className="font-medium text-navy">{r.cargo}</p>
        <p className="text-xs text-muted-foreground">
          {r.area} · {r.senioridade} · n={r.amostra}
        </p>
      </td>
      <td className="px-4 py-3 text-right text-navy tabular-nums">{currency(r.homens)}</td>
      <td className="px-4 py-3 text-right text-navy tabular-nums">{currency(r.mulheres)}</td>
      <td className="px-4 py-3 text-right">
        <span
          className={cn(
            'inline-flex min-w-16 justify-center rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums',
            gapTone(r.gap),
          )}
        >
          {r.gap.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}%
        </span>
      </td>
    </tr>
  )
}
