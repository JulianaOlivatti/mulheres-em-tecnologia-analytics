# State of Data 2021–2023 — Tratamento e consolidação

## Objetivo
Consolidar os três microdados fornecidos pela usuária em uma única base de referência para o projeto Mulheres em Tech, sem substituir nem alterar a base original entregue pelo curso.

## Arquivos de origem
- 2021: 2,645 respostas × 356 colunas
- 2022: 4,271 respostas × 353 colunas
- 2023: 5,293 respostas × 399 colunas
- Base consolidada: 12,209 registros × 27 colunas

## Campos consolidados
Ano, identificador original, idade, faixa etária, gênero, cor/raça/etnia, PCD, estado, UF, região, nível de ensino, área de formação, situação de trabalho, setor, indicador de gestão, cargo de gestor, cargo atual, nível profissional, faixa salarial, experiência em dados, experiência prévia em TI e modelo de trabalho.

## Padronizações
- `Centro-oeste` → `Centro-Oeste`.
- `Júnior` → `Junior`; `Sênior` → `Senior`.
- Modelos de trabalho agrupados em `Remoto`, `Hibrido` e `Presencial`.
- A faixa salarial original foi preservada.
- Foi criada `salario_ponto_medio_estimado` apenas para permitir análises aproximadas de faixas. O valor é o ponto médio dos limites publicados.
- A faixa aberta `Acima de R$ 40.001/mês` NÃO recebeu valor estimado, pois não existe limite superior informado.
- Cor/raça/etnia e PCD ficam vazios em 2021 porque esses campos não estão presentes no arquivo fornecido daquele ano.

## Cuidados metodológicos
A pesquisa State of Data é uma pesquisa com profissionais da área de dados. Ela não deve ser tratada como representação direta de todo o mercado brasileiro de tecnologia. Para o projeto, a base consolidada deve funcionar como referência externa/benchmark.

Os arquivos brutos devem ser mantidos intactos no repositório. A recomendação é separar:
`dados/raw/` para os três arquivos originais e `dados/processed/` para esta base tratada.

O campo de salário é categórico no dado original. Qualquer média baseada em `salario_ponto_medio_estimado` é uma aproximação e deve ser descrita dessa forma.

## Arquivos gerados
1. `state_of_data_2021_2023_tratada.csv` — base consolidada.
2. `state_of_data_2021_2023_benchmarks.csv` — indicadores simples calculados diretamente dos microdados.
3. `state_of_data_2021_2023_dicionario.csv` — dicionário dos campos e tratamentos.

## Fonte
Data Hackers — State of Data Brazil, datasets públicos disponibilizados no Kaggle.
