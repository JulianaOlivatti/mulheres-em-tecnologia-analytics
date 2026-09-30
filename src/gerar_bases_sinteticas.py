from pathlib import Path
import sqlite3

import numpy as np
import pandas as pd


np.random.seed(42)

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data" / "synthetic"

REGIOES_BR = [
    ("Sudeste", ["SP", "RJ", "MG"], 0.48),
    ("Sul", ["PR", "SC", "RS"], 0.22),
    ("Nordeste", ["BA", "PE", "CE"], 0.16),
    ("Centro-Oeste", ["DF", "GO"], 0.08),
    ("Norte", ["PA", "AM"], 0.06),
]

CURSOS_TI = [
    ("Ciencia da Computacao", "Bacharelado", 5),
    ("Engenharia de Software", "Bacharelado", 5),
    ("Sistemas de Informacao", "Bacharelado", 4),
    ("Analise e Desenv. de Sistemas (ADS)", "Tecnologo", 2.5),
    ("Engenharia de Computacao", "Bacharelado", 5),
]

CARGOS_AREAS = [
    ("Engenheira(o) de Software", "Software Engineering"),
    ("Cientista de Dados", "Data & AI"),
    ("Analista de Dados / BI", "Data & AI"),
    ("Engenheira(o) de Dados", "Data & AI"),
    ("DevOps & Cloud Specialist", "Cloud & Infrastructure"),
    ("Product Manager (PM)", "Product & Agile"),
    ("Especialista em Ciberseguranca", "Security"),
    ("Tech Lead / Engineering Manager", "Leadership & Management"),
]

SENIORIDADES = [
    ("Junior", 1, 1.5, 4800, 4400, 0.28),
    ("Pleno", 2, 4.0, 9200, 7900, 0.22),
    ("Senior", 3, 7.5, 16500, 13800, 0.14),
    ("Lead / Staff Specialist", 4, 10.5, 23000, 18900, 0.09),
    ("Diretoria / C-Level", 5, 14.0, 38000, 29500, 0.06),
]


def gerar_base_educacao():
    registros = []
    anos = range(2018, 2024)

    for ano in anos:
        for regiao, ufs, peso_regiao in REGIOES_BR:
            for uf in ufs:
                for curso, grau, duracao in CURSOS_TI:
                    total_ingressantes = int(
                        np.random.normal(850 * peso_regiao * 3, 80)
                    )
                    total_ingressantes = max(120, total_ingressantes)

                    prop_mulheres = np.clip(
                        np.random.normal(
                            0.155 + (ano - 2018) * 0.004,
                            0.015,
                        ),
                        0.11,
                        0.22,
                    )

                    ingressantes_mulheres = int(
                        total_ingressantes * prop_mulheres
                    )
                    ingressantes_homens = (
                        total_ingressantes - ingressantes_mulheres
                    )

                    total_matriculados = int(
                        total_ingressantes
                        * duracao
                        * np.random.uniform(0.75, 0.90)
                    )
                    matriculados_mulheres = int(
                        total_matriculados * prop_mulheres * 0.92
                    )
                    matriculados_homens = (
                        total_matriculados - matriculados_mulheres
                    )

                    evasao_mulheres = np.clip(
                        np.random.normal(0.68, 0.04),
                        0.55,
                        0.80,
                    )
                    evasao_homens = np.clip(
                        np.random.normal(0.58, 0.03),
                        0.48,
                        0.70,
                    )

                    concluintes_mulheres = max(
                        5,
                        int(
                            (ingressantes_mulheres / duracao)
                            * (1 - evasao_mulheres)
                        ),
                    )
                    concluintes_homens = max(
                        25,
                        int(
                            (ingressantes_homens / duracao)
                            * (1 - evasao_homens)
                        ),
                    )
                    total_concluintes = (
                        concluintes_mulheres + concluintes_homens
                    )

                    registros.append({
                        "Ano": ano,
                        "Regiao": regiao,
                        "UF": uf,
                        "Curso_Nome": curso,
                        "Grau_Academico": grau,
                        "Duracao_Anos": duracao,
                        "Total_Ingressantes": total_ingressantes,
                        "Ingressantes_Mulheres": ingressantes_mulheres,
                        "Ingressantes_Homens": ingressantes_homens,
                        "Pct_Mulheres_Ingressantes": round(
                            ingressantes_mulheres
                            * 100
                            / total_ingressantes,
                            2,
                        ),
                        "Total_Matriculados": total_matriculados,
                        "Matriculados_Mulheres": matriculados_mulheres,
                        "Matriculados_Homens": matriculados_homens,
                        "Total_Concluintes": total_concluintes,
                        "Concluintes_Mulheres": concluintes_mulheres,
                        "Concluintes_Homens": concluintes_homens,
                        "Pct_Mulheres_Concluintes": round(
                            concluintes_mulheres
                            * 100
                            / total_concluintes,
                            2,
                        ),
                        "Taxa_Evasao_Feminina_Estimada_%": round(
                            evasao_mulheres * 100,
                            1,
                        ),
                        "Taxa_Evasao_Masculina_Estimada_%": round(
                            evasao_homens * 100,
                            1,
                        ),
                    })

    return pd.DataFrame(registros)


def gerar_base_mercado(num_registros=3600):
    registros = []
    anos = [2021, 2022, 2023, 2024]
    formatos = ["Remoto", "Hibrido", "Presencial"]

    for i in range(1, num_registros + 1):
        ano = np.random.choice(
            anos,
            p=[0.15, 0.25, 0.30, 0.30],
        )

        indice_regiao = np.random.choice(
            len(REGIOES_BR),
            p=[regiao[2] for regiao in REGIOES_BR],
        )
        regiao, ufs, _ = REGIOES_BR[indice_regiao]
        uf = np.random.choice(ufs)

        cargo, area = CARGOS_AREAS[
            np.random.choice(len(CARGOS_AREAS))
        ]

        indice_senioridade = np.random.choice(
            len(SENIORIDADES),
            p=[0.35, 0.32, 0.20, 0.09, 0.04],
        )
        (
            senioridade,
            ordem,
            experiencia_media,
            salario_homens,
            salario_mulheres,
            proporcao_mulheres,
        ) = SENIORIDADES[indice_senioridade]

        genero = (
            "Feminino"
            if np.random.random() < proporcao_mulheres
            else "Masculino"
        )

        anos_experiencia = max(
            0.5,
            round(
                np.random.normal(experiencia_media, 1.2),
                1,
            ),
        )

        fator_ano = 1 + (ano - 2021) * 0.06
        salario_base = (
            salario_homens
            if genero == "Masculino"
            else salario_mulheres
        ) * fator_ano

        desvio = 0.10 if genero == "Masculino" else 0.09
        salario = int(
            np.random.normal(
                salario_base,
                salario_base * desvio,
            )
        )
        salario = max(3200, salario)

        registros.append({
            "Employee_ID": f"TECH_{i:05d}",
            "Ano": ano,
            "Regiao": regiao,
            "UF": uf,
            "Cargo": cargo,
            "Area_Tech": area,
            "Senioridade": senioridade,
            "Ordem_Senioridade": ordem,
            "Genero": genero,
            "Anos_Experiencia": anos_experiencia,
            "Salario_Mensal_BRL": salario,
            "Formato_Trabalho": np.random.choice(
                formatos,
                p=[0.55, 0.35, 0.10],
            ),
        })

    return pd.DataFrame(registros)


def criar_dimensoes(df_educacao):
    dim_curso = (
        df_educacao[
            ["Curso_Nome", "Grau_Academico", "Duracao_Anos"]
        ]
        .drop_duplicates()
        .reset_index(drop=True)
    )
    dim_curso["Curso_ID"] = [
        f"CRS_{i + 1:02d}"
        for i in range(len(dim_curso))
    ]

    dim_senioridade = pd.DataFrame([
        {
            "Senioridade_ID": f"SEN_{sen[1]:02d}",
            "Senioridade": sen[0],
            "Ordem_Hierarquica": sen[1],
            "Classificacao_Lideranca": (
                "Lideranca / Executivo"
                if sen[1] >= 4
                else "Operacional / Especialista"
            ),
        }
        for sen in SENIORIDADES
    ])

    dim_regiao = pd.DataFrame([
        {
            "UF": uf,
            "Regiao": regiao,
        }
        for regiao, ufs, _ in REGIOES_BR
        for uf in ufs
    ])

    return dim_curso, dim_senioridade, dim_regiao


def exportar_bases():
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    df_educacao = gerar_base_educacao()
    df_mercado = gerar_base_mercado()

    dim_curso, dim_senioridade, dim_regiao = criar_dimensoes(
        df_educacao
    )

    tabelas = {
        "fato_censo_educacao_ti": df_educacao,
        "fato_mercado_salarios_tech": df_mercado,
        "dim_curso_stem": dim_curso,
        "dim_senioridade": dim_senioridade,
        "dim_regiao": dim_regiao,
    }

    for nome, tabela in tabelas.items():
        tabela.to_csv(
            DATA_DIR / f"{nome}.csv",
            index=False,
            encoding="utf-8-sig",
        )

    with sqlite3.connect(
        DATA_DIR / "people_analytics_dei.db"
    ) as conexao:
        for nome, tabela in tabelas.items():
            tabela.to_sql(
                nome,
                conexao,
                if_exists="replace",
                index=False,
            )

    print("Bases sintéticas geradas com sucesso.")
    print(f"Registros educação: {len(df_educacao)}")
    print(f"Registros mercado: {len(df_mercado)}")


if __name__ == "__main__":
    exportar_bases()
