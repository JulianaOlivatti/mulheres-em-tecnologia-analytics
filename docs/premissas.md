# Premissas do Projeto

Este documento registra as principais premissas adotadas no desenvolvimento
do projeto **Mulheres em Tecnologia Analytics**.

## Natureza dos dados

As bases principais utilizadas nas análises educacionais e de mercado são
dados sintéticos, gerados para fins acadêmicos.

Os resultados obtidos a partir dessas bases representam o cenário simulado
do projeto e não devem ser interpretados como estatísticas oficiais do
mercado de tecnologia brasileiro.

Dados oficiais do INEP são utilizados separadamente como referência para
comparação e validação dos indicadores educacionais.

## Cursos considerados

A análise educacional considera os seguintes cursos da área de tecnologia:

- Ciência da Computação
- Engenharia de Software
- Sistemas de Informação
- Análise e Desenvolvimento de Sistemas
- Engenharia de Computação

## Senioridades consideradas

A análise do mercado de trabalho utiliza os seguintes níveis:

- Junior
- Pleno
- Senior
- Lead/Staff
- Diretoria/C-Level

A ordem hierárquica é utilizada para analisar a evolução da representação
feminina ao longo da carreira.

## Critério de liderança

Os níveis profissionais são classificados por meio da dimensão
`dim_senioridade`.

A classificação de liderança utilizada nas análises segue os valores
definidos nessa dimensão.

## Período analisado

A base educacional sintética contempla o período de 2018 a 2023.

A base sintética de mercado de trabalho contempla o período de 2021 a 2024.

Quando forem utilizados dados oficiais de referência, o período será
informado juntamente com a respectiva fonte.

## Regiões consideradas

São consideradas as cinco regiões brasileiras:

- Norte
- Nordeste
- Centro-Oeste
- Sudeste
- Sul

## Análise de diferença salarial

O Gender Pay Gap é calculado comparando o salário médio de homens e mulheres
dentro do mesmo nível de senioridade.

O salário médio masculino é utilizado como referência percentual:

`(salário médio masculino - salário médio feminino) / salário médio masculino × 100`

## Simulação de orçamento para redução do gap

A estimativa de orçamento utiliza a diferença entre o salário médio masculino
e feminino dentro do mesmo cargo e senioridade.

O cálculo adotado é:

`quantidade de mulheres × diferença salarial × 13,33 × 1,40`

O fator `13,33` representa a anualização considerada no modelo e o fator
`1,40` representa os encargos utilizados na simulação.

## Limitações

Os resultados dependem das características e parâmetros utilizados na
geração das bases sintéticas.

As análises demonstram a aplicação de técnicas de People Analytics,
SQL, Python, estatística e visualização de dados, mas não representam,
isoladamente, a realidade de toda a população brasileira.

Indicadores educacionais baseados na relação entre ingressantes e concluintes
de um mesmo ano devem ser interpretados com cautela, pois não acompanham
individualmente uma mesma turma ao longo do curso.
