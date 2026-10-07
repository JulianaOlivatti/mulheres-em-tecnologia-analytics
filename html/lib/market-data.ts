import { salaryBySeniority } from './dashboard-data'

export const seniorityLevels = ['Júnior', 'Pleno', 'Sênior', 'Lead / Staff', 'Diretoria / C-Level'] as const
export const marketAreas = ['Dados', 'Desenvolvimento', 'Infraestrutura', 'Produto', 'Segurança'] as const

export type Seniority = (typeof seniorityLevels)[number]
export type MarketArea = (typeof marketAreas)[number]

export const STANDARD_WEEKLY_HOURS = 40

const areaMultiplier: Record<MarketArea, number> = {
  Dados: 1.08,
  Desenvolvimento: 1,
  Infraestrutura: 0.96,
  Produto: 1.05,
  Segurança: 1.12,
}

export function marketReference(level: Seniority, area: MarketArea) {
  const base = salaryBySeniority.find((s) => s.level === level) ?? salaryBySeniority[0]
  const m = areaMultiplier[area]
  const homens = base.homens * m
  const mulheres = base.mulheres * m
  return { homens, mulheres, media: (homens + mulheres) / 2 }
}

const roles: { cargo: string; area: MarketArea; senioridade: Seniority }[] = [
  { cargo: 'Analista de Dados', area: 'Dados', senioridade: 'Júnior' },
  { cargo: 'Cientista de Dados', area: 'Dados', senioridade: 'Pleno' },
  { cargo: 'Engenheira(o) de Dados', area: 'Dados', senioridade: 'Sênior' },
  { cargo: 'Desenvolvedor(a) Front-end', area: 'Desenvolvimento', senioridade: 'Júnior' },
  { cargo: 'Desenvolvedor(a) Back-end', area: 'Desenvolvimento', senioridade: 'Pleno' },
  { cargo: 'Desenvolvedor(a) Full Stack', area: 'Desenvolvimento', senioridade: 'Sênior' },
  { cargo: 'Tech Lead', area: 'Desenvolvimento', senioridade: 'Lead / Staff' },
  { cargo: 'Analista de Suporte', area: 'Infraestrutura', senioridade: 'Júnior' },
  { cargo: 'Engenheira(o) DevOps / SRE', area: 'Infraestrutura', senioridade: 'Sênior' },
  { cargo: 'Product Manager', area: 'Produto', senioridade: 'Pleno' },
  { cargo: 'Head de Produto', area: 'Produto', senioridade: 'Diretoria / C-Level' },
  { cargo: 'Analista de Segurança', area: 'Segurança', senioridade: 'Pleno' },
  { cargo: 'Staff Security Engineer', area: 'Segurança', senioridade: 'Lead / Staff' },
  { cargo: 'CTO', area: 'Desenvolvimento', senioridade: 'Diretoria / C-Level' },
]

export type MarketRecord = {
  id: string
  cargo: string
  area: MarketArea
  senioridade: Seniority
  homens: number
  mulheres: number
  gap: number
  amostra: number
}

export type ScrapeResponse = {
  status: number
  statusText: string
  endpoint: string
  source: string
  fetchedAt: string
  durationMs: number
  log: string[]
  records: MarketRecord[]
}

const jitter = (spread: number) => 1 + (Math.random() - 0.5) * spread
const roundTo = (value: number, step: number) => Math.round(value / step) * step

export function buildMarketSnapshot(): MarketRecord[] {
  return roles.map((role, i) => {
    const ref = marketReference(role.senioridade, role.area)
    const homens = roundTo(ref.homens * jitter(0.06), 10)
    const mulheres = roundTo(ref.mulheres * jitter(0.06), 10)
    return {
      id: `role-${i}`,
      ...role,
      homens,
      mulheres,
      gap: Math.round(((homens - mulheres) / homens) * 10000) / 100,
      amostra: Math.round(180 + Math.random() * 900),
    }
  })
}
