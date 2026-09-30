# Dicionario de Dados

Este documento descreve os campos utilizados nas principais views analíticas
do projeto **Mulheres em Tecnologia Analytics**.

As análises utilizam dados sintéticos de educação e mercado de trabalho,
organizados em tabelas fato e dimensões auxiliares.

---

## 1. View `drop_off`

Analisa a participação feminina entre o ingresso e a conclusão dos cursos
de tecnologia, agrupada por ano e curso.

| Campo | Tipo | Descrição |
|---|---|---|
| `ano` | Inteiro | Ano de referência dos dados educacionais. |
| `curso_nome` | Texto | Nome do curso de graduação em tecnologia. |
| `total_ingressantes` | Inteiro | Total de pessoas ingressantes no curso no ano analisado. |
| `ingressantes_mulheres` | Inteiro | Quantidade de mulheres ingressantes no curso. |
| `pct_mulheres_ingresso` | Decimal (%) | Percentual de mulheres entre o total de ingressantes. |
| `total_concluintes` | Inteiro | Total de pessoas concluintes do curso no ano analisado. |
| `concluintes_mulheres` | Inteiro | Quantidade de mulheres entre os concluintes. |
| `pct_mulheres_conclusao` | Decimal (%) | Percentual de mulheres entre o total de concluintes. |
| `perda_representatividade_funil_pp` | Decimal (p.p.) | Diferença, em pontos percentuais, entre a participação feminina no ingresso e na conclusão. |
| `Pct_Qm_Formou` | Decimal (%) | Relação percentual entre concluintes mulheres e ingressantes mulheres do agrupamento analisado. |
| `Evasao` | Decimal (%) | Indicador estimado a partir da diferença entre ingressantes e concluintes mulheres. Não representa acompanhamento individual de uma mesma coorte. |

**Origem:** `fato_censo_educacao_ti`

---

## 2. View `teto_vidro`

Analisa a representação de mulheres e homens nos diferentes níveis de
senioridade, permitindo observar a participação feminina conforme aumenta
o nível hierárquico.

| Campo | Tipo | Descrição |
|---|---|---|
| `ordem_hierarquica` | Inteiro | Ordem numérica utilizada para organizar os níveis de senioridade. |
| `senioridade` | Texto | Nível profissional, como Junior, Pleno, Senior, Lead/Staff ou Diretoria/C-Level. |
| `classificacao_lideranca` | Texto | Classificação do nível entre Operacional/Especialista ou Liderança/Executivo. |
| `total_profissionais` | Inteiro | Quantidade total de profissionais no nível de senioridade. |
| `total_mulheres` | Inteiro | Quantidade de mulheres no nível de senioridade. |
| `total_homens` | Inteiro | Quantidade de homens no nível de senioridade. |
| `pct_mulheres` | Decimal (%) | Percentual de mulheres no nível de senioridade. |
| `pct_homens` | Decimal (%) | Percentual de homens no nível de senioridade. |

**Origem:** `fato_mercado_salarios_tech` + `dim_senioridade`

**Relacionamento utilizado:** campo `senioridade`.

---

## 3. View `gender_pay_gap`

Compara o salário médio de mulheres e homens dentro de cada nível de
senioridade e calcula a diferença salarial por gênero.

| Campo | Tipo | Descrição |
|---|---|---|
| `senioridade` | Texto | Nível de senioridade profissional. |
| `ordem_hierarquica` | Inteiro | Ordem utilizada para organizar os níveis de senioridade. |
| `salario_medio_homens_brl` | Decimal (R$) | Salário mensal médio dos homens no nível analisado. |
| `salario_medio_mulheres_brl` | Decimal (R$) | Salário mensal médio das mulheres no nível analisado. |
| `gap_salarial_absoluto_brl` | Decimal (R$) | Diferença em reais entre o salário médio masculino e o feminino. |
| `gender_pay_gap_pct` | Decimal (%) | Diferença salarial percentual, tomando o salário médio masculino como referência. |

**Origem:** `fato_mercado_salarios_tech` + `dim_senioridade`

**Cálculo do Gender Pay Gap:**

`(salário médio homens - salário médio mulheres) / salário médio homens × 100`

---

## 4. View `zero_gap`

Estima o orçamento necessário para reduzir a diferença salarial entre
mulheres e homens por cargo e senioridade.

| Campo | Tipo | Descrição |
|---|---|---|
| `cargo` | Texto | Cargo profissional analisado. |
| `senioridade` | Texto | Nível de senioridade do cargo. |
| `qtd_mulheres` | Inteiro | Quantidade de mulheres existentes naquele cargo e senioridade. |
| `sal_referencia_masculino` | Decimal (R$) | Salário médio masculino utilizado como referência para a simulação. |
| `sal_atual_feminino` | Decimal (R$) | Salário médio feminino no mesmo cargo e senioridade. |
| `diferenca_unitaria_brl` | Decimal (R$) | Diferença entre o salário médio masculino e feminino por profissional. |
| `orcamento_anual_com_encargos_brl` | Decimal (R$) | Estimativa anual do orçamento necessário para equiparação, incluindo os fatores definidos no modelo para remuneração anual e encargos. |

**Origem:** `fato_mercado_salarios_tech`

**Cálculo utilizado no modelo:**

`quantidade de mulheres × diferença salarial × 13,33 × 1,40`

O fator `13,33` representa a anualização adotada no modelo e o fator `1,40`
representa os encargos considerados na simulação.

---

## Observações metodológicas

Os dados utilizados nas análises de mercado e na base educacional principal
são sintéticos e foram gerados para fins acadêmicos.

Os indicadores produzidos pelas views devem, portanto, ser interpretados como
resultados do cenário simulado e não como estimativas diretas da população
brasileira.

Dados oficiais do INEP são mantidos separadamente em `data/reference/` para
comparação e validação da plausibilidade dos indicadores educacionais.
