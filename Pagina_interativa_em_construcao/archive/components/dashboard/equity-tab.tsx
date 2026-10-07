'use client'

import { BarChart3, Users } from 'lucide-react'
import { useId, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { COLORS, filterOptions, representationGap } from '@/lib/dashboard-data'
import { FilterBar } from './filter-bar'
import { ChartCard, Legend } from './primitives'
import { SalaryBySeniorityChart } from './salary-chart'

const FEMALE_SALARY = 7730
const MALE_SALARY = 13790
const WOMEN_TO_ADJUST = 7000
const TOTAL_PAYROLL = 426_000_000
const GAP = (MALE_SALARY - FEMALE_SALARY) / MALE_SALARY

const fmt = (v: number, digits = 2) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits })

export function EquityTab() {
  return (
    <div className="flex flex-col gap-5">
      <FilterBar
        filters={[
          { key: 'ano', label: 'Ano', options: filterOptions.ano, defaultValue: '2022' },
          { key: 'area', label: 'Área', options: filterOptions.area },
          { key: 'regiao', label: 'Região', options: filterOptions.regiao },
          { key: 'senioridade', label: 'Senioridade', options: filterOptions.senioridade },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="relative isolate flex flex-col gap-5 overflow-hidden rounded-xl bg-peach-soft p-5 shadow-sm sm:flex-row sm:items-center">
          <span aria-hidden="true" className="absolute -bottom-12 -right-6 -z-10 size-40 rounded-full bg-peach/50 blur-sm" />
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/70 text-peach-deep">
            <Users className="size-6" aria-hidden="true" />
          </span>
          <div className="grid flex-1 grid-cols-2 divide-x divide-peach">
            <div className="pr-4">
              <p className="text-sm text-muted-foreground">Salário feminino</p>
              <p className="text-3xl font-semibold text-navy tabular-nums">R$ 7,73 mil</p>
            </div>
            <div className="pl-4">
              <p className="text-sm text-muted-foreground">Salário masculino</p>
              <p className="text-3xl font-semibold text-navy tabular-nums">R$ 13,79 mil</p>
            </div>
          </div>
        </div>

        <div className="relative isolate flex flex-col gap-5 overflow-hidden rounded-xl bg-sage-soft p-5 shadow-sm sm:flex-row sm:items-center">
          <span aria-hidden="true" className="absolute -bottom-12 -right-6 -z-10 size-40 rounded-full bg-sage/40 blur-sm" />
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/70 text-sage-deep">
            <BarChart3 className="size-6" aria-hidden="true" />
          </span>
          <div className="grid flex-1 grid-cols-2 divide-x divide-sage">
            <div className="pr-4">
              <p className="text-sm text-muted-foreground">Gap salarial</p>
              <p className="text-3xl font-semibold text-navy tabular-nums">{fmt(GAP * 100)}%</p>
            </div>
            <div className="pl-4">
              <p className="text-sm font-semibold text-navy">Análise estatística</p>
              <p className="text-sm text-muted-foreground">Diferença significativa por senioridade</p>
              <p className="text-sm italic text-navy">{'Welch · p < 0,001'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Salário por senioridade" subtitle="Comparativo entre mulheres e homens">
          <SalaryBySeniorityChart height={240} />
        </ChartCard>

        <ChartCard title="Representatividade × Gap salarial" subtitle="Comparativo por senioridade (%)">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...representationGap].reverse()}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
              >
                <CartesianGrid stroke={COLORS.grid} horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="level"
                  width={120}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: COLORS.navy, fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: '#F7F4ED' }}
                  contentStyle={{ borderRadius: 8, border: `1px solid ${COLORS.grid}`, fontSize: 12 }}
                  formatter={(v) => `${fmt(Number(v))}%`}
                />
                <Bar dataKey="gap" name="Gap salarial" stackId="a" fill={COLORS.navy} barSize={20}>
                  <LabelList dataKey="gap" position="insideRight" fill="#fff" fontSize={11} formatter={(v) => `${fmt(Number(v))}%`} />
                </Bar>
                <Bar dataKey="mulheres" name="Mulheres" stackId="a" fill={COLORS.sage} radius={[0, 4, 4, 0]} barSize={20}>
                  <LabelList dataKey="mulheres" position="insideRight" fill={COLORS.navy} fontSize={11} formatter={(v) => `${fmt(Number(v))}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Legend
            items={[
              { label: 'Gap salarial', color: COLORS.navy },
              { label: 'Mulheres (%)', color: COLORS.sage },
            ]}
          />
        </ChartCard>
      </div>

      <EquitySimulator />
    </div>
  )
}

function EquitySimulator() {
  const [reduction, setReduction] = useState(26)
  const id = useId()
  const share = reduction / 100
  const investment = WOMEN_TO_ADJUST * (MALE_SALARY - FEMALE_SALARY) * share
  const payrollImpact = (investment / TOTAL_PAYROLL) * 100
  const residualGap = GAP * (1 - share) * 100

  return (
    <section className="relative isolate overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm">
      <span aria-hidden="true" className="absolute -bottom-20 right-10 -z-10 size-56 rounded-full bg-navy/5 blur-xl" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-center">
        <div>
          <h3 className="font-serif text-xl text-navy">Simulador de equidade salarial</h3>
          <p className="text-sm text-muted-foreground">Cenário de investimento para redução do gap</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor={id} className="text-sm font-medium text-navy">
                Redução do gap
              </label>
              <output htmlFor={id} className="text-lg font-semibold text-navy tabular-nums">
                {reduction}%
              </output>
            </div>
            <input
              id={id}
              type="range"
              min={0}
              max={100}
              step={1}
              value={reduction}
              onChange={(e) => setReduction(Number(e.target.value))}
              className="w-full cursor-pointer accent-navy"
            />
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:divide-x sm:divide-border">
          <SimStat label="Investimento mensal" value={`R$ ${fmt(investment / 1_000_000)} mi`} />
          <SimStat label="Impacto na folha" value={`${fmt(payrollImpact)}%`} />
          <SimStat label="Gap residual" value={`${fmt(residualGap)}%`} />
          <SimStat label="Ajustes necessários" value="7 mil" />
        </dl>
      </div>
    </section>
  )
}

function SimStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="sm:px-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-semibold text-navy tabular-nums">{value}</dd>
    </div>
  )
}
