import { NextResponse } from 'next/server'
import { buildMarketSnapshot, type ScrapeResponse } from '@/lib/market-data'

export const dynamic = 'force-dynamic'

const SOURCES = ['Portal de vagas A', 'Pesquisa salarial B', 'Comunidade tech C']

export async function POST() {
  const started = performance.now()
  const records = buildMarketSnapshot()
  const samples = records.reduce((sum, r) => sum + r.amostra, 0)

  const body: ScrapeResponse = {
    status: 200,
    statusText: 'OK',
    endpoint: '/api/scrape-market-data',
    source: 'Base sintética de mercado (simulação de raspagem)',
    fetchedAt: new Date().toISOString(),
    durationMs: 0,
    log: [
      `Conectando a ${SOURCES.length} fontes de mercado...`,
      ...SOURCES.map((s) => `GET ${s} → 200`),
      `Normalizando ${samples.toLocaleString('pt-BR')} registros por cargo e gênero`,
      `${records.length} cargos consolidados`,
    ],
    records,
  }
  body.durationMs = Math.max(1, Math.round(performance.now() - started))

  return NextResponse.json(body, { headers: { 'Cache-Control': 'no-store' } })
}
