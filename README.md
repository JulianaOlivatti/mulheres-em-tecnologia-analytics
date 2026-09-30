# Mulheres em Tecnologia — People Analytics & DE&I

Projeto de análise de dados desenvolvido com o objetivo de estudar a trajetória feminina da formação acadêmica ao mercado de tecnologia, observando representatividade, progressão profissional e diferenças salariais.

O projeto integra **Python, SQL, análise estatística, Streamlit e Power BI**, utilizando dados sintéticos para construção das análises e dados oficiais como referência para validação.

## Objetivo

Analisar a participação feminina em diferentes etapas da trajetória em tecnologia, buscando identificar possíveis pontos de perda de representatividade entre a formação acadêmica e o avanço profissional.

Entre as principais questões analisadas estão:

- participação feminina no ingresso e conclusão de cursos de tecnologia;
- representatividade de mulheres nos diferentes níveis de senioridade;
- presença feminina em posições de liderança;
- diferença salarial entre homens e mulheres;
- significância estatística do Gender Pay Gap;
- estimativa de investimento para redução da diferença salarial.

---

## Dados

O projeto utiliza duas categorias de dados:

### Dados sintéticos

As bases principais de educação e mercado de trabalho foram geradas para fins acadêmicos e permitem simular diferentes cenários de People Analytics.

Estão disponíveis em:

`data/synthetic/`

A pasta contém as tabelas fato, dimensões auxiliares e o banco SQLite utilizados nas análises.

### Dados de referência

Além das bases sintéticas utilizadas no desenvolvimento das análises, o projeto utiliza dados oficiais do **INEP — Censo da Educação Superior** como referência para comparação dos indicadores educacionais.

Os dados reais permitem comparar os resultados do cenário simulado com informações oficiais sobre a participação feminina entre concluintes da área de Computação e Tecnologias da Informação e Comunicação (TIC).

Esses dados estão disponíveis em:

`data/reference/`

As análises principais do projeto foram desenvolvidas com as bases sintéticas disponíveis em `data/synthetic/`, enquanto os dados oficiais foram utilizados como referência para validação e comparação.

---

## Análises desenvolvidas

Até o momento, o projeto contempla análises de:

**Funil educacional**  
Comparação da participação feminina entre ingresso e conclusão dos cursos de tecnologia.

**Teto de vidro**  
Análise da representatividade feminina conforme o avanço dos níveis de senioridade.

**Gender Pay Gap**  
Comparação dos salários médios de homens e mulheres dentro dos níveis profissionais.

**Teste estatístico**  
Aplicação do teste t para avaliar a significância estatística das diferenças salariais observadas.

**Zero Gap**  
Simulação do orçamento necessário para reduzir diferenças salariais entre homens e mulheres.

---

## Python e análise estatística

Os notebooks registram as etapas de exploração e desenvolvimento da análise estatística:

```text
notebooks/
├── 01_exploracao_estatistica_salarios.ipynb
├── 02_teste_t_global.ipynb
└── 03_teste_t_por_senioridade.ipynb
```

Os scripts finais do projeto estão concentrados em `src/`:

```text
src/
├── analise_estatistica_ttest.py
├── app_calculadora_dei_streamlit.py
├── gerar_bases_sinteticas.py
└── validar_consultas_sql.py
```

---

## SQL

As consultas SQL foram organizadas de acordo com as principais perguntas de negócio:

```text
sql/
├── drop-off.sql
├── gender_pay.sql
├── teto_vidro.sql
└── zero_gap.sql
```

As consultas apoiam as análises de funil educacional, representatividade em posições hierárquicas, diferença salarial e estimativa de orçamento para equiparação.

---

## Streamlit

O projeto também possui uma aplicação interativa desenvolvida em Streamlit para explorar indicadores de People Analytics.

A aplicação permite selecionar cargo, senioridade e região, visualizar indicadores de representatividade e Gender Pay Gap e simular o custo de redução da diferença salarial.

O código está disponível em:

`src/app_calculadora_dei_streamlit.py`

---

## Power BI

O dashboard em Power BI está atualmente em desenvolvimento.

A proposta é consolidar os principais indicadores do projeto em uma visão executiva, incluindo formação acadêmica, mercado de trabalho, representatividade feminina, liderança e diferença salarial.

O arquivo final será disponibilizado em:

`powerbi/`

---

## Documentação

A documentação metodológica está disponível em `docs/`.

```text
docs/
├── dicionario_dados.md
└── premissas.md
```

O dicionário apresenta os principais campos e indicadores utilizados nas análises, enquanto o documento de premissas registra as regras e decisões metodológicas adotadas no projeto.

---

## Estrutura do repositório

```text
mulheres-em-tecnologia-analytics/
│
├── data/
│   ├── reference/
│   └── synthetic/
│
├── docs/
├── notebooks/
├── powerbi/
├── sql/
├── src/
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

## Tecnologias utilizadas

- Python
- Pandas
- NumPy
- SciPy
- Jupyter Notebook
- SQL
- SQLite
- Streamlit
- Power BI
- Git e GitHub

---

## 🚧 Status do projeto

O projeto está em desenvolvimento.

Até o momento foram concluídas a organização das bases, documentação inicial, consultas SQL, exploração estatística, teste de hipótese e desenvolvimento inicial da aplicação em Streamlit.

As próximas etapas incluem a finalização do dashboard em Power BI, consolidação dos resultados e preparação da apresentação final.
