'use client'

import { useState } from 'react'
import { CalculatorTab } from './calculator-tab'
import { EquityTab } from './equity-tab'
import { MarketTab } from './market-tab'
import { type HeroContent, PageHero } from './page-hero'
import { StepTabs } from './step-tabs'
import { StudiesTab } from './studies-tab'

const sections: { id: string; label: string; hero: HeroContent; Content: () => React.ReactNode }[] = [
  {
    id: 'estudos',
    label: 'Trajetória nos Estudos',
    hero: {
      title: 'Trajetória Feminina',
      subtitle: 'Nos estudos de tech',
      tagline: ['Da sala de aula', 'a novas possibilidades'],
      image: '/images/studies.png',
      imageAlt: 'Jovem mulher de perfil olhando para o horizonte ao pôr do sol',
    },
    Content: StudiesTab,
  },
  {
    id: 'mercado',
    label: 'Mercado de Trabalho',
    hero: {
      title: 'Mulheres no Mercado de Tecnologia',
      subtitle: 'Oportunidades em tecnologia',
      tagline: ['Dados para carreiras', 'mais equitativas'],
      image: '/images/market.png',
      imageAlt: 'Profissional de tecnologia sorrindo e olhando para cima',
    },
    Content: MarketTab,
  },
  {
    id: 'equidade',
    label: 'Equidade Salarial',
    hero: {
      title: 'Equidade Salarial',
      subtitle: 'Da evidência à ação',
      tagline: ['Dados para carreiras', 'mais equitativas'],
      image: '/images/equity.png',
      imageAlt: 'Profissional sorridente apoiando o queixo na mão em frente ao notebook',
    },
    Content: EquityTab,
  },
  {
    id: 'calculadora',
    label: 'Calculadora & Análise',
    hero: {
      title: 'Calculadora & Análise',
      subtitle: 'Paridade em números',
      tagline: ['Dados de mercado', 'em tempo real'],
      image: '/images/calculator.png',
      imageAlt: 'Analista de dados trabalhando em um notebook com gráficos',
    },
    Content: CalculatorTab,
  },
]

export function Dashboard() {
  const [active, setActive] = useState(sections[0].id)
  const current = sections.find((s) => s.id === active) ?? sections[0]
  const { Content } = current

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 md:px-6 md:py-8">
      <PageHero {...current.hero} />
      <StepTabs tabs={sections} active={active} onChange={setActive} />
      <div
        key={current.id}
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
      >
        <Content />
      </div>
      <footer className="pt-2 text-center text-xs text-muted-foreground">
        Fontes: INEP e base sintética de People Analytics. Valores ilustrativos.
      </footer>
    </main>
  )
}
