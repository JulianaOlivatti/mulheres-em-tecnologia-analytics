# Mulheres em Tecnologia — People Analytics & DE&I

## Da formação à liderança: onde a presença feminina se perde ao longo da jornada em tecnologia?

Este projeto investiga a trajetória feminina desde a formação acadêmica até os cargos de liderança em tecnologia, combinando **análise de dados, SQL, estatística, Power BI e aplicações web**.

Mais do que identificar desigualdades, buscamos entender **onde elas aparecem, como evoluem e como os dados podem apoiar decisões mais efetivas de People Analytics e DE&I**.

### Acesse o projeto

- 🌐 **Storytelling interativo:** https://trajetoria-feminina-tech.vercel.app/
- 🧮 **Calculadora de Paridade Salarial e Simulador:** https://calculadora-murex-iota.vercel.app/
- 📊 **Dashboard Power BI:** integrado ao site de storytelling

---

## O case

O projeto foi desenvolvido a partir de um cenário de negócio fictício da **TechCorp Brasil**, uma empresa de tecnologia com mais de 5 mil colaboradores, atuante nas áreas de serviços de nuvem e engenharia de software.

Dentro da área de **People Analytics e Diversidade, Equidade & Inclusão**, a empresa estabeleceu como meta atingir:

> **40% de representatividade feminina em posições técnicas e de liderança até 2028.**

A partir desse desafio, surgiram algumas perguntas de negócio:

- Existem poucas mulheres se formando em tecnologia?
- Em qual etapa da trajetória ocorre a maior perda de representatividade?
- Mulheres conseguem avançar na carreira na mesma proporção que homens?
- Como a participação feminina muda conforme a senioridade?
- Existe diferença salarial entre homens e mulheres?
- Essa diferença é estatisticamente significativa?
- Como transformar esses achados em ações e cenários de decisão?

---

## Objetivo

Analisar a trajetória feminina em tecnologia desde a formação acadêmica até a liderança, identificando possíveis gargalos relacionados a:

- ingresso e conclusão de cursos de tecnologia;
- entrada no mercado;
- progressão profissional;
- acesso a posições de liderança;
- diferenças salariais;
- equidade ao longo dos níveis de senioridade.

Além do diagnóstico, o projeto busca transformar os resultados em ferramentas que possam apoiar decisões de negócio.

---

## Principais achados

No cenário analisado, os dados mostram um estreitamento progressivo da participação feminina ao longo da jornada.

### Formação e mercado

- **17,0%** de mulheres entre ingressantes em cursos de tecnologia;
- **13,9%** entre concluintes;
- **20,7%** de participação feminina no mercado de tecnologia;
- apenas **6,6%** em posições de liderança.

### Progressão profissional

A participação feminina também diminui conforme a senioridade aumenta:

- **29,2%** no nível Júnior;
- **23,2%** no Pleno;
- **12,8%** no Sênior;
- **7,1%** em Lead / Staff;
- **5,1%** em Diretoria / C-Level.

Esse comportamento evidencia uma possível barreira de progressão profissional, relacionada ao conceito de **teto de vidro**.

### Gender Pay Gap

A diferença salarial também cresce conforme a senioridade avança.

No cenário analisado, o menor gap aparece nos níveis iniciais da carreira e o maior ocorre em **Diretoria / C-Level**, justamente onde também encontramos a menor participação feminina.

---

## Evidências externas

Além das bases utilizadas no desenvolvimento principal do projeto, também utilizamos dados externos como referência para ampliar a análise.

### INEP — Censo da Educação Superior

Dados oficiais do INEP foram utilizados como referência para analisar a participação feminina entre estudantes e concluintes de cursos relacionados à Computação e Tecnologias da Informação e Comunicação.

### State of Data Brazil — Data Hackers

Também utilizamos dados do **State of Data Brazil** para observar diferenças salariais por outros recortes.

Entre os resultados analisados:

- um dos maiores gaps por faixa etária aparece entre **35 e 39 anos**;
- entre regiões, o **Norte** apresenta um dos maiores gaps observados.

Esses recortes reforçam que a desigualdade salarial não aparece de forma uniforme e pode variar conforme idade, região e momento da carreira.

---

## Metodologia

O projeto foi construído em diferentes etapas, utilizando tecnologias específicas para cada parte da análise.

```text
Bases de dados
      ↓
Python / Pandas
Tratamento e exploração
      ↓
SQL / SQLite
Consultas e perguntas de negócio
      ↓
Python / SciPy
Análise estatística
      ↓
Teste t de Welch
Validação da diferença salarial
      ↓
Power BI / DAX
Indicadores e visualização
      ↓
Storytelling Web
Comunicação dos resultados
      ↓
Calculadora e Simulador
Aplicação dos insights
```

---

## Python e análise de dados

Python foi utilizado principalmente para preparação, exploração e validação das bases.

Entre as principais bibliotecas utilizadas estão:

- **Pandas** — tratamento e manipulação dos dados;
- **NumPy** — operações numéricas;
- **SciPy** — análise estatística;
- **Matplotlib** — exploração visual durante a análise;
- **Jupyter Notebook** — desenvolvimento e documentação das análises exploratórias.

Os notebooks estão disponíveis em:

```text
notebooks/
├── 01_exploracao_estatistica_salarios.ipynb
├── 02_teste_t_global.ipynb
└── 03_teste_t_por_senioridade.ipynb
```

Os scripts finais estão concentrados em:

```text
src/
├── analise_estatistica_ttest.py
├── app_calculadora_dei_streamlit.py
├── gerar_bases_sinteticas.py
└── validar_consultas_sql.py
```

---

## SQL

As consultas SQL foram estruturadas de acordo com as principais perguntas de negócio do projeto.

```text
sql/
├── drop-off.sql
├── teto_vidro.sql
├── gender_pay.sql
└── zero_gap.sql
```

Cada consulta possui uma função dentro da análise:

### `drop-off.sql`

Analisa a perda de representatividade feminina entre ingresso e conclusão dos cursos de tecnologia.

### `teto_vidro.sql`

Avalia como a participação feminina muda conforme o avanço da senioridade.

### `gender_pay.sql`

Compara os salários médios de homens e mulheres dentro dos diferentes níveis profissionais.

### `zero_gap.sql`

Estima o impacto financeiro de possíveis ações de equiparação salarial.

---

## Teste estatístico — Gender Pay Gap

Além de visualizar diferenças salariais, buscamos verificar se a diferença observada entre homens e mulheres apresentava evidência estatística.

Para isso, utilizamos o **teste t de Welch**, implementado em Python com a biblioteca **SciPy**.

As hipóteses consideradas foram:

**H0 — Hipótese nula:**  
As médias salariais de homens e mulheres são iguais.

**H1 — Hipótese alternativa:**  
Existe diferença entre as médias salariais de homens e mulheres.

Foi considerado um nível de significância de:

```text
α = 0,05
```

O resultado apresentou um **p-valor inferior a 0,001**, indicando forte evidência estatística contra a hipótese de igualdade entre as médias no cenário analisado.

Também realizamos o teste separadamente por senioridade.

> O teste estatístico não determina a causa da desigualdade e não prova discriminação. Ele avalia se a diferença observada entre as médias salariais é estatisticamente significativa dentro do cenário analisado.

O script utilizado está disponível em:

```text
src/analise_estatistica_ttest.py
```

---

## Power BI

Após o tratamento, consultas e análises estatísticas, os principais indicadores foram consolidados em um dashboard desenvolvido em **Power BI**.

O dashboard apresenta análises relacionadas a:

- formação feminina em tecnologia;
- entrada no mercado;
- participação por senioridade;
- liderança;
- salários médios;
- Gender Pay Gap;
- relação entre representatividade e remuneração;
- cenários de paridade salarial.

Também foram utilizadas medidas em **DAX** para criar indicadores dinâmicos e permitir a interação com diferentes filtros e recortes.

Arquivos disponíveis:

```text
powerbi/
├── Dashboard.pbix
└── Dashboard.pdf
```

O dashboard também está incorporado ao site interativo do projeto.

---

## Storytelling interativo

Para apresentar os resultados de forma mais clara e transformar a análise em uma narrativa, desenvolvemos um site de storytelling.

🌐 **Acesse:**  
https://trajetoria-feminina-tech.vercel.app/

O site conduz o usuário por seis etapas:

```text
Formação
   ↓
Carreira
   ↓
Evidências externas
   ↓
Dashboard
   ↓
Ações
   ↓
Equipe
```

O objetivo do site não é substituir o Power BI.

Enquanto o **site conduz a história e destaca os principais achados**, o **dashboard permite explorar os dados com maior profundidade**.

A aplicação está localizada em:

```text
html/HTML_SITE/
├── index.html
├── css/
├── js/
└── assets/
```

---

## Calculadora de Paridade Salarial e Simulador

Além da análise, desenvolvemos uma ferramenta para transformar os resultados em cenários de decisão.

🧮 **Acesse:**  
https://calculadora-murex-iota.vercel.app/

A aplicação permite:

- calcular diferenças salariais entre grupos;
- visualizar o Gender Pay Gap;
- testar diferentes metas de redução do gap;
- estimar o impacto de diferentes cenários;
- apoiar análises relacionadas à equidade salarial.

A versão final está localizada em:

```text
html/HTML_SIMULADOR/
├── index.html
└── app.js
```

---

## Evolução do simulador

O desenvolvimento da solução ocorreu em duas etapas.

### Primeira versão — Streamlit

A primeira prova de conceito foi construída em **Python com Streamlit**, permitindo validar a lógica da ferramenta e testar a experiência de interação.

O código dessa versão foi mantido no repositório:

```text
src/app_calculadora_dei_streamlit.py
```

### Versão final — Aplicação Web

Após a validação do conceito, a aplicação evoluiu para uma versão independente em **HTML, CSS e JavaScript**, com maior liberdade visual e melhor integração com o storytelling do projeto.

A versão utilizada atualmente está em:

```text
html/HTML_SIMULADOR/
```

Essa evolução representa o processo de prototipação do projeto:

```text
Ideia
  ↓
Protótipo em Streamlit
  ↓
Validação da lógica
  ↓
Aplicação Web
  ↓
Deploy em produção
```

---

## Da análise à ação

A análise permitiu estruturar possíveis ações em quatro pontos da jornada feminina em tecnologia.

### 01 · Formação

Ampliar o acesso de mulheres a cursos, bolsas, bootcamps e programas de formação em tecnologia.

### 02 · Entrada

Fortalecer recrutamento ativo, vagas afirmativas e processos seletivos mais inclusivos.

### 03 · Carreira

Criar critérios mais transparentes de promoção e ampliar programas de mentoria e sponsorship.

### 04 · Remuneração

Monitorar indicadores de equidade salarial e realizar revisões periódicas das diferenças identificadas.

A calculadora e o simulador fazem parte dessa última etapa, permitindo transformar o diagnóstico em cenários que podem apoiar decisões.

---

## Dados do projeto

O projeto utiliza duas categorias principais de dados.

### Bases sintéticas

Utilizadas para o desenvolvimento das análises principais de People Analytics.

Atualmente estão armazenadas em:

```text
docs/synthetic/
├── dim_curso_stem.csv
├── dim_regiao.csv
├── dim_senioridade.csv
├── fato_censo_educacao_ti.csv
├── fato_mercado_salarios_tech.csv
└── people_analytics_dei.db
```

Essas bases foram produzidas para fins educacionais e de simulação de cenários.

### Dados de referência

Dados externos utilizados para comparação e contextualização dos resultados.

```text
docs/reference/
├── inep_referencia_concluintes_tic_2018_2023.csv
└── Kaggle/
    ├── README_state_of_data_tratamento.md
    ├── state_of_data_2021_2023_benchmarks.csv
    ├── state_of_data_2021_2023_dicionario.csv
    └── state_of_data_2021_2023_tratada.csv
```

---

## Estrutura do repositório

```text
mulheres-em-tecnologia-analytics/
│
├── docs/
│   ├── dicionario_dados.md
│   ├── premissas.md
│   ├── reference/
│   └── synthetic/
│
├── html/
│   ├── HTML_SITE/
│   │   ├── index.html
│   │   ├── css/
│   │   ├── js/
│   │   └── assets/
│   │
│   └── HTML_SIMULADOR/
│       ├── index.html
│       └── app.js
│
├── notebooks/
│   ├── 01_exploracao_estatistica_salarios.ipynb
│   ├── 02_teste_t_global.ipynb
│   └── 03_teste_t_por_senioridade.ipynb
│
├── powerbi/
│   ├── Dashboard.pbix
│   └── Dashboard.pdf
│
├── sql/
│   ├── drop-off.sql
│   ├── gender_pay.sql
│   ├── teto_vidro.sql
│   └── zero_gap.sql
│
├── src/
│   ├── analise_estatistica_ttest.py
│   ├── app_calculadora_dei_streamlit.py
│   ├── gerar_bases_sinteticas.py
│   └── validar_consultas_sql.py
│
├── .gitignore
├── README.md
└── requirements.txt
```

---

## Tecnologias utilizadas

### Análise de dados
- Python
- Pandas
- NumPy
- Jupyter Notebook

### Estatística
- SciPy
- Teste t de Welch

### Banco de dados
- SQL
- SQLite

### Business Intelligence
- Power BI
- DAX

### Desenvolvimento Web
- HTML
- CSS
- JavaScript
- Streamlit — utilizado na primeira versão do simulador

### Versionamento e deploy
- Git
- GitHub
- Vercel

---

## Documentação

Além do README principal, o projeto possui documentação complementar:

```text
docs/
├── dicionario_dados.md
└── premissas.md
```

O dicionário registra os principais campos e indicadores utilizados.

O documento de premissas reúne decisões metodológicas, limitações e regras adotadas durante o desenvolvimento.

---

## Limitações e premissas

As bases principais de mercado e formação utilizadas no desenvolvimento do case são **sintéticas e destinadas a fins educacionais**.

Dados externos do INEP e State of Data Brazil foram utilizados como referência e contextualização.

Os resultados apresentados devem ser interpretados dentro do contexto das bases e premissas adotadas no projeto.

As análises estatísticas indicam associação e diferença entre grupos, mas não devem ser interpretadas isoladamente como evidência de causalidade ou discriminação.

---

## Equipe

Projeto desenvolvido pelo **Grupo 4 — Generation Brasil | Análise de Dados AD04**.

- **Aline Kono Campos** — Analista de Dados e Gestão de Projetos
- **Andrea De Stefano Sant'Ana** — Analista de Dados
- **Andrey Chiconato Lobo** — Analista de Dados
- **Fernanda Henrique** — Analista de Dados e Risco
- **Juliana Olivatti Silva** — Análise de Dados e People Analytics
- **Priscila Oliveira** — Tecnologia & Dados
- **Vitor Gabriel Odam de Souza** — Analista de Dados

Os perfis profissionais e contatos da equipe também estão disponíveis na seção **Equipe** do site.

---

## Status

✅ Tratamento e organização das bases  
✅ Consultas SQL  
✅ Análise exploratória  
✅ Teste estatístico  
✅ Dashboard Power BI  
✅ Storytelling interativo  
✅ Calculadora de Paridade Salarial  
✅ Simulador de Redução do Gap  
✅ Deploy das aplicações  
✅ Documentação do projeto  

**Projeto concluído para apresentação do case.**

---

## Mulheres em Tecnologia

**Dados mostram onde estão as barreiras.  
Decisões podem mudar a trajetória.**
