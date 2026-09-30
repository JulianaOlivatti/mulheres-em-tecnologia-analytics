from pathlib import Path

import pandas as pd
import streamlit as st


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data" / "synthetic"

st.set_page_config(
    page_title="Calculadora DE&I Tech",
    page_icon="👩‍💻",
    layout="wide",
)


@st.cache_data
def carregar_dados():
    mercado = pd.read_csv(
        DATA_DIR / "fato_mercado_salarios_tech.csv"
    )
    educacao = pd.read_csv(
        DATA_DIR / "fato_censo_educacao_ti.csv"
    )
    return mercado, educacao


try:
    df_mercado, df_educacao = carregar_dados()
except Exception as erro:
    st.error(f"Erro ao carregar os dados: {erro}")
    st.stop()


st.title(
    "👩‍💻 Painel Estratégico DE&I "
    "& Calculadora de Paridade Salarial"
)

st.write(
    "Aplicação de People Analytics para analisar "
    "representatividade feminina e simular custos "
    "de equiparação salarial."
)

st.caption(
    "Os dados utilizados são sintéticos e destinados "
    "a fins educacionais e analíticos."
)


st.sidebar.header("Filtros")

cargo = st.sidebar.selectbox(
    "Cargo",
    sorted(df_mercado["Cargo"].dropna().unique()),
)

senioridade = st.sidebar.selectbox(
    "Senioridade",
    [
        "Junior",
        "Pleno",
        "Senior",
        "Lead / Staff Specialist",
        "Diretoria / C-Level",
    ],
)

regiao = st.sidebar.selectbox(
    "Região",
    sorted(df_mercado["Regiao"].dropna().unique()),
)


recorte = df_mercado[
    (df_mercado["Cargo"] == cargo)
    & (df_mercado["Senioridade"] == senioridade)
    & (df_mercado["Regiao"] == regiao)
]

if recorte.empty:
    st.warning(
        "Não existem registros para essa combinação "
        "de cargo, senioridade e região."
    )
    st.stop()


salario_homens = recorte.loc[
    recorte["Genero"] == "Masculino",
    "Salario_Mensal_BRL",
].mean()

salario_mulheres = recorte.loc[
    recorte["Genero"] == "Feminino",
    "Salario_Mensal_BRL",
].mean()

if pd.isna(salario_homens) or pd.isna(salario_mulheres):
    st.warning(
        "O recorte selecionado não possui registros "
        "dos dois gêneros para comparação salarial."
    )
    st.stop()


gap_valor = salario_homens - salario_mulheres
gap_pct = (gap_valor / salario_homens) * 100

total_profissionais = len(recorte)
total_mulheres = (
    recorte["Genero"] == "Feminino"
).sum()

pct_mulheres = (
    total_mulheres / total_profissionais
) * 100


st.subheader("Indicadores do recorte")

col1, col2, col3, col4 = st.columns(4)

col1.metric(
    "Salário Médio - Homens",
    f"R$ {salario_homens:,.2f}",
)

col2.metric(
    "Salário Médio - Mulheres",
    f"R$ {salario_mulheres:,.2f}",
)

col3.metric(
    "Gender Pay Gap",
    f"{gap_pct:.1f}%",
    delta=f"-R$ {gap_valor:,.2f}",
    delta_color="inverse",
)

col4.metric(
    "Mulheres no Recorte",
    f"{pct_mulheres:.1f}%",
)


st.divider()

st.subheader("💰 Simulador de Equiparação Salarial")

col_sim1, col_sim2 = st.columns(2)

with col_sim1:
    qtd_mulheres = st.slider(
        "Quantidade de mulheres na equipe",
        min_value=1,
        max_value=50,
        value=5,
    )

with col_sim2:
    ajuste_pct = st.slider(
        "Percentual do gap a corrigir",
        min_value=10,
        max_value=100,
        value=100,
    )

correcao_individual = (
    gap_valor * (ajuste_pct / 100)
)

custo_mensal = (
    qtd_mulheres * correcao_individual
)

custo_anual = (
    custo_mensal * 13.33 * 1.40
)

st.success(
    "Orçamento anual estimado para correção: "
    f"R$ {custo_anual:,.2f}"
)

st.caption(
    "Estimativa simplificada: 13,33 para anualização "
    "e 1,40 para encargos considerados no modelo."
)


st.divider()

st.subheader("🎓 Participação Feminina no Câmpus")

recorte_educacao = df_educacao[
    df_educacao["Regiao"] == regiao
]

evolucao = (
    recorte_educacao
    .groupby("Ano")[
        [
            "Total_Concluintes",
            "Concluintes_Mulheres",
        ]
    ]
    .sum()
    .reset_index()
)

evolucao["% Mulheres Concluintes"] = (
    evolucao["Concluintes_Mulheres"]
    / evolucao["Total_Concluintes"]
) * 100

st.line_chart(
    evolucao
    .set_index("Ano")["% Mulheres Concluintes"]
)

st.caption(
    f"Proporção simulada de mulheres concluintes "
    f"em cursos de tecnologia na região {regiao}."
)


with st.expander("Visualizar dados do recorte"):
    st.dataframe(
        recorte,
        use_container_width=True,
    )


st.divider()

st.caption(
    "Projeto educacional de People Analytics & DE&I | "
    "Python • Pandas • Streamlit"
)
