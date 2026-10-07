'use client'

import { RefreshCw } from 'lucide-react'
import { SCRAPE_ENDPOINT, useMarketScrape } from '@/hooks/use-market-scrape'
import { cn } from '@/lib/utils'

const time = (iso: string) => new Date(iso).toLocaleTimeString('pt-BR')

export function ScrapeTerminal() {
  const { data, error, isValidating, mutate } = useMarketScrape()

  return (
    <section
      aria-labelledby="scrape-title"
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <h3 id="scrape-title" className="font-serif text-xl text-navy">
            Raspagem de dados de mercado
          </h3>
          <p className="text-sm text-muted-foreground">Conexão via API com atualização a cada 30s</p>
        </div>
        <button
          type="button"
          onClick={() => mutate()}
          disabled={isValidating}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-navy/20 bg-background px-3 text-sm font-medium text-navy shadow-sm transition hover:bg-navy-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 disabled:opacity-60"
        >
          <RefreshCw className={cn('size-4', isValidating && 'animate-spin')} aria-hidden="true" />
          {isValidating ? 'Executando...' : 'Executar raspagem'}
        </button>
      </header>

      <div className="flex flex-1 flex-col bg-navy font-mono text-[13px] leading-relaxed text-white/90">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-peach" />
          <span className="size-2.5 rounded-full bg-sage" />
          <span className="size-2.5 rounded-full bg-white/30" />
          <span className="ml-3 text-xs text-white/50">people-analytics — market-scraper</span>
        </div>
        <div role="log" aria-live="polite" aria-busy={isValidating} className="flex-1 overflow-auto p-4">
          <p>
            <span className="text-sage">$</span> curl -X POST {SCRAPE_ENDPOINT}
          </p>
          {data ? (
            <>
              {data.log.map((line) => (
                <p key={line} className="text-white/70">
                  <span className="text-white/40">[{time(data.fetchedAt)}]</span> {line}
                </p>
              ))}
              <p className="mt-2">
                <span className="text-white/50">Status:</span>{' '}
                <span className="font-semibold text-sage">
                  {data.status} {data.statusText}
                </span>{' '}
                <span className="text-white/40">· {data.durationMs}ms</span>
              </p>
              <p>
                <span className="text-white/50">Fonte:</span> {data.source}
              </p>
            </>
          ) : null}
          {error ? (
            <p className="mt-2 text-peach">
              <span className="text-white/50">Status:</span> Erro — {error.message}
            </p>
          ) : null}
          <p className="mt-2 text-white/70">
            {isValidating ? (
              <>
                Aguardando resposta
                <span className="ml-1 inline-block h-3.5 w-2 animate-pulse bg-white/80 align-middle" />
              </>
            ) : data ? (
              <span className="text-peach">
                Dados atualizados em tempo real · {time(data.fetchedAt)}
              </span>
            ) : null}
          </p>
        </div>
      </div>
    </section>
  )
}
