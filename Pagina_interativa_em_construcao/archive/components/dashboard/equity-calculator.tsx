'use client'

import { Calculator, Scale, TrendingUp, Wallet } from 'lucide-react'
import { useId, useState } from 'react'
import {
  type MarketArea,
  marketAreas,
  marketReference,
  STANDARD_WEEKLY_HOURS,
  type Seniority,
  seniorityLevels,
} from '@/lib/market-data'
import { cn } from '@/lib/utils'

const currency = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const pct = (v: number) =>
  `${v.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`

type Result = {
  ajuste: number
  ajustePct: number
  gapMercado: number
  gapParidade: number
  impactoAnual: number
  normalizado: number
  mediaMercado: number
  referenciaParidade: number
}

function calculate(salary: number, level: Seniority, area: MarketArea, hours: number): Result {
  const ref = marketReference(level, area)
  const hoursFactor = hours / STANDARD_WEEKLY_HOURS
  const normalizado = salary / hoursFactor
  const referenciaParidade = ref.homens * hoursFactor
  const ajuste = Math.max(0, referenciaParidade - salary)
  return {
    ajuste,
    ajustePct: (ajuste / salary) * 100,
    gapMercado: ((ref.media - normalizado) / ref.media) * 100,
    gapParidade: ((ref.homens - normalizado) / ref.homens) * 100,
    impactoAnual: ajuste * 13.33,
    normalizado,
    mediaMercado: ref.media,
    referenciaParidade: ref.homens,
  }
}

const fieldClass =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-navy shadow-sm outline-none transition focus-visible:border-navy focus-visible:ring-2 focus-visible:ring-navy/20 aria-invalid:border-peach-deep'

export function EquityCalculator() {
  const id = useId()
  const [salary, setSalary] = useState('8500')
  const [level, setLevel] = useState<Seniority>('Pleno')
  const [area, setArea] = useState<MarketArea>('Desenvolvimento')
  const [hours, setHours] = useState('40')
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const s = Number(salary.replace(/\./g, '').replace(',', '.'))
    const h = Number(hours)
    if (!Number.isFinite(s) || s <= 0) return setError('Informe um salário atual válido.')
    if (!Number.isFinite(h) || h < 1 || h > 80) return setError('Horas semanais devem estar entre 1 e 80.')
    setError(null)
    setResult(calculate(s, level, area, h))
  }

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="grid gap-5 rounded-lg border border-border bg-card p-5 shadow-sm lg:grid-cols-[minmax(0,22rem)_1fr]"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <header className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
            <Calculator className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 id={`${id}-title`} className="font-serif text-xl text-navy">
              Calculadora de equidade salarial
            </h3>
            <p className="text-sm text-muted-foreground">Compare com a média e a paridade de mercado</p>
          </div>
        </header>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-salary`} className="text-sm font-medium text-navy">
            Salário atual (R$)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
              R$
            </span>
            <input
              id={`${id}-salary`}
              inputMode="decimal"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              aria-invalid={error?.includes('salário') || undefined}
              className={cn(fieldClass, 'pl-9 tabular-nums')}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-level`} className="text-sm font-medium text-navy">
              Senioridade
            </label>
            <select
              id={`${id}-level`}
              value={level}
              onChange={(e) => setLevel(e.target.value as Seniority)}
              className={fieldClass}
            >
              {seniorityLevels.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-area`} className="text-sm font-medium text-navy">
              Área
            </label>
            <select
              id={`${id}-area`}
              value={area}
              onChange={(e) => setArea(e.target.value as MarketArea)}
              className={fieldClass}
            >
              {marketAreas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-hours`} className="text-sm font-medium text-navy">
            Horas semanais
          </label>
          <input
            id={`${id}-hours`}
            type="number"
            min={1}
            max={80}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            aria-invalid={error?.includes('Horas') || undefined}
            className={cn(fieldClass, 'tabular-nums')}
          />
        </div>

        {error ? (
          <p role="alert" className="text-sm font-medium text-peach-deep">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-navy px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:ring-offset-2"
        >
          <Scale className="size-4" aria-hidden="true" />
          Calcular Paridade e Impacto
        </button>
      </form>

      <div aria-live="polite" className="flex flex-col gap-4">
        {result ? (
          <CalculatorResults result={result} />
        ) : (
          <div className="flex h-full min-h-56 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center">
            <Scale className="size-8 text-sage-deep" aria-hidden="true" />
            <p className="font-serif text-lg text-navy">Preencha os dados e calcule</p>
            <p className="max-w-sm text-sm text-muted-foreground text-pretty">
              O resultado mostra o ajuste recomendado para atingir a paridade com a média masculina e o
              gap em relação à média do mercado.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function CalculatorResults({ result }: { result: Result }) {
  const belowMarket = result.gapMercado > 0
  const max = Math.max(result.normalizado, result.mediaMercado, result.referenciaParidade)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          icon={Wallet}
          tone="peach"
          label="Ajuste recomendado"
          value={currency(result.ajuste)}
          detail={result.ajuste > 0 ? `+${pct(result.ajustePct)} ao mês` : 'Já em paridade'}
        />
        <ResultCard
          icon={TrendingUp}
          tone="sage"
          label="Gap vs. média do mercado"
          value={pct(Math.abs(result.gapMercado))}
          detail={belowMarket ? 'abaixo da média' : 'acima da média'}
        />
        <ResultCard
          icon={Scale}
          tone="navy"
          label="Impacto anual estimado"
          value={currency(result.impactoAnual)}
          detail="inclui 13º e 1/3 de férias"
        />
      </div>

      <div className="rounded-lg border border-border bg-background p-4">
        <p className="text-sm font-medium text-navy">Comparativo normalizado (40h semanais)</p>
        <dl className="mt-3 flex flex-col gap-3">
          <CompareBar label="Seu salário" value={result.normalizado} max={max} color="bg-peach" />
          <CompareBar label="Média do mercado" value={result.mediaMercado} max={max} color="bg-sage" />
          <CompareBar
            label="Referência de paridade (homens)"
            value={result.referenciaParidade}
            max={max}
            color="bg-navy"
          />
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">
          Gap em relação à paridade: <span className="font-semibold text-navy">{pct(result.gapParidade)}</span>
        </p>
      </div>
    </>
  )
}

const toneMap = {
  peach: 'bg-peach-soft text-peach-deep',
  sage: 'bg-sage-soft text-sage-deep',
  navy: 'bg-navy-soft text-navy',
}

function ResultCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: typeof Wallet
  label: string
  value: string
  detail: string
  tone: keyof typeof toneMap
}) {
  return (
    <div className={cn('flex flex-col gap-2 rounded-lg p-4 shadow-sm', toneMap[tone].split(' ')[0])}>
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-full bg-white/70',
          toneMap[tone].split(' ')[1],
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tracking-tight text-navy tabular-nums">{value}</p>
      <p className="text-xs text-navy/80">{detail}</p>
    </div>
  )
}

function CompareBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <dt className="text-muted-foreground">{label}</dt>
        <dd className="font-semibold text-navy tabular-nums">{currency(value)}</dd>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div
          className={cn('h-full rounded-full transition-[width] duration-500', color)}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  )
}
