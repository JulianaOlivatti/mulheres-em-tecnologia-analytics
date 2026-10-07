'use client'

import useSWR from 'swr'
import type { ScrapeResponse } from '@/lib/market-data'

export const SCRAPE_ENDPOINT = '/api/scrape-market-data'

async function postFetcher(url: string): Promise<ScrapeResponse> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export function useMarketScrape() {
  return useSWR<ScrapeResponse, Error>(SCRAPE_ENDPOINT, postFetcher, {
    refreshInterval: 30_000,
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
}
