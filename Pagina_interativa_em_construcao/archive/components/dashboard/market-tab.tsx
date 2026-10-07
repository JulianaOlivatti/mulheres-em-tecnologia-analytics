'use client'

import { Coins, GraduationCap, TrendingUp } from 'lucide-react'
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import { COLORS, brl, experienceSalary, filterOptions } from '@/lib/dashboard-data'
import { FilterBar } from './filter-bar'
import { ChartCard, Legend, MetricCard } from './primitives'
import { SalaryBySeniorityChart } from './salary-chart'

export function MarketTab() {
  return (
    <div className="flex flex-col gap-5">
      <FilterBar
        filters={[
          { key: 'ano', label: 'Ano', options: filterOptions.ano },
          { key: 'area', label: 'Área', options: filterOptions.area },
          { key: 'regiao', label: 'Região', options: filterOptions.regiao },
          { key: 'senioridade', label: 'Senioridade', options: filterOptions.senioridade },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          icon={Coins}
          tone="peach"
          label="Senioridade mais ocupada"
          value="Júnior"
          detail="47,36% das mulheres"
        />
        <MetricCard icon={TrendingUp} tone="sage" label="Mulheres na liderança" value="6,60%" />
        <MetricCard icon={GraduationCap} tone="navy" label="Mulheres no mercado tech" value="20,69%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Experiência × Salário" subtitle="Relação por gênero (salário mensal)">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid stroke={COLORS.grid} />
                <XAxis
                  type="number"
                  dataKey="experiencia"
                  name="Experiência"
                  unit=" anos"
                  domain={[0, 16]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: COLORS.muted, fontSize: 12 }}
                />
                <YAxis
                  type="number"
                  dataKey="salario"
                  name="Salário"
                  tickFormatter={(v) => `R$ ${brl(v)}`}
                  tickLine={false}
                  axisLine={false}
                  width={64}
                  tick={{ fill: COLORS.muted, fontSize: 12 }}
                />
                <ZAxis range={[28, 28]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: 8, border: `1px solid ${COLORS.grid}`, fontSize: 12 }}
                  formatter={(v, name) =>
                    name === 'Salário' ? `R$ ${Number(v).toLocaleString('pt-BR')}` : `${v} anos`
                  }
                />
                <Scatter name="Masculino" data={experienceSalary.masculino} fill={COLORS.slate} fillOpacity={0.55} shape="triangle" />
                <Scatter name="Feminino" data={experienceSalary.feminino} fill={COLORS.peachDeep} fillOpacity={0.85} shape="diamond" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <Legend
            items={[
              { label: 'Feminino', color: COLORS.peachDeep },
              { label: 'Masculino', color: COLORS.slate },
            ]}
          />
        </ChartCard>

        <ChartCard title="Salário por senioridade" subtitle="Comparativo entre mulheres e homens">
          <SalaryBySeniorityChart height={288} />
        </ChartCard>
      </div>
    </div>
  )
}
