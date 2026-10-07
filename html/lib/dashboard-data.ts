export const COLORS = {
  navy: '#123B5D',
  sage: '#A8C4A4',
  peach: '#F8C2A8',
  peachDeep: '#C8613A',
  slate: '#58636A',
  grid: '#E8E4DA',
  muted: '#66727A',
}

export const courseComparison = [
  { course: 'Análise e Desenv. de Sistemas', ingresso: 17.3, conclusao: 14.0 },
  { course: 'Engenharia de Computação', ingresso: 17.1, conclusao: 15.0 },
  { course: 'Sistemas de Informação', ingresso: 17.0, conclusao: 14.1 },
  { course: 'Ciência da Computação', ingresso: 16.9, conclusao: 14.8 },
  { course: 'Engenharia de Software', ingresso: 16.7, conclusao: 14.9 },
]

export const dropoutByGender = [
  { name: 'Evasão feminina', value: 53.84, color: COLORS.navy },
  { name: 'Evasão masculina', value: 46.16, color: COLORS.sage },
]

export const formationJourney = [
  { year: '2021', evasao: 62, ingressantes: 16.2, concluintes: 14.1 },
  { year: '2022', evasao: 64, ingressantes: 16.9, concluintes: 14.6 },
  { year: '2023', evasao: 63, ingressantes: 17.8, concluintes: 15.0 },
]

export const inepComparison = [
  { year: '2021', inep: 14.2, sintetica: 14.0 },
  { year: '2022', inep: 14.6, sintetica: 14.4 },
  { year: '2023', inep: 15.1, sintetica: 14.8 },
]

export const salaryBySeniority = [
  { level: 'Júnior', homens: 5200, mulheres: 4600 },
  { level: 'Pleno', homens: 9800, mulheres: 8300 },
  { level: 'Sênior', homens: 17600, mulheres: 14700 },
  { level: 'Lead / Staff', homens: 24800, mulheres: 19800 },
  { level: 'Diretoria / C-Level', homens: 41800, mulheres: 28900 },
]

export const representationGap = [
  { level: 'Pleno', gap: 16.61, mulheres: 22.39 },
  { level: 'Sênior', gap: 19.59, mulheres: 11.99 },
  { level: 'Lead / Staff', gap: 22.22, mulheres: 5.61 },
  { level: 'Diretoria / C-Level', gap: 26.72, mulheres: 4.44 },
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function buildScatter(count: number, seed: number, slope: number, base: number) {
  const rand = seededRandom(seed)
  return Array.from({ length: count }, () => {
    const exp = Math.round(rand() * 16 * 10) / 10
    const noise = (rand() - 0.5) * (4000 + exp * 1500)
    const salary = Math.max(2500, base + exp * slope + noise)
    return { experiencia: exp, salario: Math.round(salary) }
  })
}

export const experienceSalary = {
  masculino: buildScatter(220, 42, 2400, 4200),
  feminino: buildScatter(70, 7, 1650, 3800),
}

export const filterOptions = {
  regiao: ['Todos', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
  ano: ['Todos', '2021', '2022', '2023'],
  curso: [
    'Todos',
    'Análise e Desenv. de Sistemas',
    'Ciência da Computação',
    'Engenharia de Computação',
    'Engenharia de Software',
    'Sistemas de Informação',
  ],
  area: ['Todos', 'Dados', 'Desenvolvimento', 'Infraestrutura', 'Produto', 'Segurança'],
  senioridade: ['Todos', 'Júnior', 'Pleno', 'Sênior', 'Lead / Staff', 'Diretoria / C-Level'],
}

export const brl = (value: number) =>
  new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
