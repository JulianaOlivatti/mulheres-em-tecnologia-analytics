'use client'

import { BarChart3, GraduationCap, Users } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  COLORS,
  courseComparison,
  dropoutByGender,
  filterOptions,
  formationJourney,
  inepComparison,
} from '@/lib/dashboard-data'
import { FilterBar } from './filter-bar'
import { ChartCard, HighlightStat, Legend, MetricCard } from './primitives'

const tooltipStyle = {
  borderRadius: 8,
  border: `1px solid ${COLORS.grid}`,
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  fontSize: 12,
}

const pct = (v: number) => `${v.toFixed(1).replace('.', ',')}%`

export function StudiesTab() {
  return (
    <div className="flex flex-col gap-5">
      <FilterBar
        filters={[
          { key: 'regiao', label: 'Região', options: filterOptions.regiao },
          { key: 'ano', label: 'Ano', options: filterOptions.ano },
          { key: 'curso', label: 'Curso', options: filterOptions.curso },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard icon={Users} tone="navy" label="Mulheres ingressantes em TI" value="17,02%" />
        <MetricCard
          icon={GraduationCap}
          tone="peach"
          label="Mulheres concluintes em TI"
          value="14,55%"
        />
        <MetricCard
          icon={BarChart3}
          tone="sage"
          label="Diferença entre ingresso e conclusão"
          value="3,13 p.p."
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        <ChartCard title="Ingresso × Conclusão" subtitle="Participação feminina por curso (%)">
          <DumbbellChart />
          <Legend
            items={[
              { label: 'Ingressantes', color: COLORS.sage },
              { label: 'Concluintes', color: COLORS.navy },
            ]}
          />
        </ChartCard>

        <ChartCard title="Evasão estimada por gênero" subtitle="Distribuição da evasão em cursos de TI">
          <div className="grid flex-1 items-center gap-4 sm:grid-cols-2">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dropoutByGender}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={80}
                    paddingAngle={2}
                    stroke="none"
                    label={({ value }) => pct(Number(value))}
                    labelLine={false}
                  >
                    {dropoutByGender.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => pct(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <HighlightStat label="Diferença de evasão estimada" value="9,69 p.p." />
          </div>
          <Legend items={dropoutByGender.map((d) => ({ label: d.name, color: d.color }))} />
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Jornada na formação" subtitle="Ingresso, conclusão e evasão ao longo dos anos">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={formationJourney} margin={{ top: 8, right: 0, left: -16, bottom: 0 }}>
                <CartesianGrid stroke={COLORS.grid} vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[12, 19]}
                  tickFormatter={(v) => `${v}%`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: COLORS.muted, fontSize: 12 }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar yAxisId="left" dataKey="evasao" name="Evasão (mil)" fill={COLORS.navy} radius={[6, 6, 0, 0]} barSize={56} />
                <Line yAxisId="right" dataKey="ingressantes" name="Ingressantes (%)" stroke={COLORS.sage} strokeWidth={3} dot={{ r: 4 }} />
                <Line yAxisId="right" dataKey="concluintes" name="Concluintes (%)" stroke={COLORS.peach} strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <Legend
            items={[
              { label: 'Evasão', color: COLORS.navy },
              { label: 'Ingressantes', color: COLORS.sage },
              { label: 'Concluintes', color: COLORS.peach },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Referência INEP × Cenário sintético"
          subtitle="Percentual de mulheres concluintes na área de TI"
        >
          <div className="grid flex-1 items-center gap-4 sm:grid-cols-[1fr_auto]">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inepComparison} margin={{ top: 8, right: 0, left: -16, bottom: 0 }} barGap={4}>
                  <CartesianGrid stroke={COLORS.grid} vertical={false} />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} tick={{ fill: COLORS.muted, fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => pct(Number(v))} cursor={{ fill: '#F7F4ED' }} />
                  <Bar dataKey="inep" name="Referência INEP" fill={COLORS.sage} radius={[4, 4, 0, 0]} barSize={22} />
                  <Bar dataKey="sintetica" name="Base sintética" fill={COLORS.navy} radius={[4, 4, 0, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <HighlightStat label="Aderência base sintética × INEP" value="98,11%" tone="navy" />
          </div>
          <Legend
            items={[
              { label: 'Referência INEP', color: COLORS.sage },
              { label: 'Base sintética', color: COLORS.navy },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  )
}

const MIN = 13
const MAX = 18
const position = (v: number) => `${((v - MIN) / (MAX - MIN)) * 100}%`

function DumbbellChart() {
  const ticks = [13, 14, 15, 16, 17, 18]
  return (
    <div className="flex flex-col gap-1" role="table" aria-label="Ingresso e conclusão feminina por curso">
      <div role="row" className="grid grid-cols-[minmax(0,10rem)_1fr_4rem] items-center gap-3 pb-1 text-xs font-medium text-muted-foreground sm:grid-cols-[minmax(0,13rem)_1fr_4rem]">
        <span role="columnheader">Curso</span>
        <span role="columnheader" className="sr-only">
          Ingressantes e concluintes
        </span>
        <span role="columnheader" className="text-right">
          Variação
        </span>
      </div>
      {courseComparison.map((row) => {
        const diff = row.conclusao - row.ingresso
        const left = Math.min(row.ingresso, row.conclusao)
        const right = Math.max(row.ingresso, row.conclusao)
        return (
          <div
            role="row"
            key={row.course}
            className="grid grid-cols-[minmax(0,10rem)_1fr_4rem] items-center gap-3 border-t border-border/60 py-2.5 sm:grid-cols-[minmax(0,13rem)_1fr_4rem]"
          >
            <span role="cell" className="truncate text-sm text-navy" title={row.course}>
              {row.course}
            </span>
            <div role="cell" className="relative h-6">
              <span className="sr-only">
                Ingressantes {pct(row.ingresso)}, concluintes {pct(row.conclusao)}
              </span>
              <span
                aria-hidden="true"
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-navy to-sage"
                style={{ left: position(left), width: `calc(${position(right)} - ${position(left)})` }}
              />
              <Dot value={row.ingresso} color="bg-sage" />
              <Dot value={row.conclusao} color="bg-navy" />
            </div>
            <span role="cell" className="text-right text-sm font-semibold text-peach-deep tabular-nums">
              {diff > 0 ? '+' : ''}
              {diff.toFixed(1).replace('.', ',')} p.p.
            </span>
          </div>
        )
      })}
      <div aria-hidden="true" className="grid grid-cols-[minmax(0,10rem)_1fr_4rem] gap-3 sm:grid-cols-[minmax(0,13rem)_1fr_4rem]">
        <span />
        <div className="relative h-4 text-[11px] text-muted-foreground">
          {ticks.map((t) => (
            <span key={t} className="absolute -translate-x-1/2" style={{ left: position(t) }}>
              {t}%
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Dot({ value, color }: { value: number; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{ left: position(value) }}
    >
      <span className={`size-3.5 rounded-full ring-2 ring-white shadow-sm ${color}`} />
    </span>
  )
}
