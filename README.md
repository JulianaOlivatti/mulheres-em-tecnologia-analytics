# Mulheres em Tecnologia — Analytics

Projeto de **People Analytics & DE&I** voltado à análise da trajetória feminina da educação ao mercado de tecnologia.

## Objetivo

Mapear o funil da participação feminina em tecnologia, desde a entrada e conclusão em cursos de Computação, TI e Engenharias até a atuação no mercado de trabalho, observando empregabilidade, liderança e disparidade salarial.

## Perguntas de análise

- Como evoluiu a participação feminina em cursos de tecnologia?
- Qual é a proporção de mulheres matriculadas e concluintes?
- Como essa participação se compara à presença feminina no mercado de tecnologia?
- Há diferenças salariais por gênero nas bases analisadas?
- Como varia a presença feminina por cargo, região e faixa salarial?

## Fontes de dados previstas

- INEP — Censo da Educação Superior
- Kaggle — bases de salários em Data Science/STEM
- Stack Overflow Annual Developer Survey
- RAIS/CAGED, quando aplicável

## Pipeline do projeto

1. **Extração** — coleta das bases educacionais e de mercado.
2. **Transformação** — limpeza, filtros, padronização de cursos/cargos e tratamento de outliers.
3. **Harmonização** — criação de categorias comuns, como ano, região, gênero, cargo e faixa salarial.
4. **Carga** — organização das tabelas tratadas para análise e consumo no dashboard.
5. **Análise** — exploração dos dados com Python e SQL.
6. **Visualização** — construção do dashboard no Power BI.
7. **Storytelling** — apresentação dos principais achados e do funil feminino em tecnologia.

## Estrutura do repositório

```text
mulheres-em-tecnologia-analytics/
├── data/
│   ├── raw/
│   └── processed/
├── notebooks/
├── src/
├── sql/
├── powerbi/
├── docs/
├── images/
├── presentation/
├── .gitignore
├── requirements.txt
└── README.md
```

## Entregas previstas

- Base de dados analítica tratada
- Dicionário de dados
- Scripts de ETL e análise em Python/SQL
- Dashboard de diversidade no Power BI
- Documentação das premissas
- Apresentação executiva

> Status: em desenvolvimento.
