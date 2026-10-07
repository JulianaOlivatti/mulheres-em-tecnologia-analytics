'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { COLORS, brl, salaryBySeniority } from '@/lib/dashboard-data'
import { Legend } from './primitives'

export function SalaryBySeniorityChart({ height = 280 }: { height?: number }) {
  const data = [...salaryBySeniority].reverse()
  return (
    <>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }} barGap={3}>
            <CartesianGrid stroke={COLORS.grid} horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(v) => `R$ ${brl(v)}`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: COLORS.muted, fontSize: 12 }}
            />
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
              formatter={(v) => `R$ ${Number(v).toLocaleString('pt-BR')}`}
            />
            <Bar dataKey="homens" name="Salário masculino" fill={COLORS.slate} radius={[0, 4, 4, 0]} barSize={12} />
            <Bar dataKey="mulheres" name="Salário feminino" fill={COLORS.sage} radius={[0, 4, 4, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Legend
        items={[
          { label: 'Salário masculino', color: COLORS.slate },
          { label: 'Salário feminino', color: COLORS.sage },
        ]}
      />
    </>
  )
}
