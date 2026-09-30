from pathlib import Path

import pandas as pd
from scipy import stats


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_PATH = (
    BASE_DIR
    / "data"
    / "synthetic"
    / "fato_mercado_salarios_tech.csv"
)

ALPHA = 0.05

SENIORIDADES = [
    "Junior",
    "Pleno",
    "Senior",
    "Lead / Staff Specialist",
    "Diretoria / C-Level",
]


def teste_global(df):
    homens = df.loc[
        df["Genero"] == "Masculino",
        "Salario_Mensal_BRL",
    ]
    mulheres = df.loc[
        df["Genero"] == "Feminino",
        "Salario_Mensal_BRL",
    ]

    t_stat, p_valor = stats.ttest_ind(
        homens,
        mulheres,
        equal_var=False,
    )

    gap = (
        (homens.mean() - mulheres.mean())
        / homens.mean()
    ) * 100

    print("\nTESTE T GLOBAL")
    print(f"Média homens: R$ {homens.mean():.2f}")
    print(f"Média mulheres: R$ {mulheres.mean():.2f}")
    print(f"Gender Pay Gap: {gap:.2f}%")
    print(f"Estatística t: {t_stat:.4f}")
    print(f"P-valor: {p_valor:.4e}")

    if p_valor < ALPHA:
        print("Resultado: rejeita-se H0.")
    else:
        print("Resultado: não se rejeita H0.")


def teste_por_senioridade(df):
    resultados = []

    for senioridade in SENIORIDADES:
        grupo = df[df["Senioridade"] == senioridade]

        homens = grupo.loc[
            grupo["Genero"] == "Masculino",
            "Salario_Mensal_BRL",
        ]
        mulheres = grupo.loc[
            grupo["Genero"] == "Feminino",
            "Salario_Mensal_BRL",
        ]

        t_stat, p_valor = stats.ttest_ind(
            homens,
            mulheres,
            equal_var=False,
        )

        media_homens = homens.mean()
        media_mulheres = mulheres.mean()

        gap = (
            (media_homens - media_mulheres)
            / media_homens
        ) * 100

        resultados.append({
            "Senioridade": senioridade,
            "Media_Homens_R$": round(media_homens, 2),
            "Media_Mulheres_R$": round(media_mulheres, 2),
            "Pay_Gap_%": round(gap, 2),
            "Estatistica_T": round(t_stat, 3),
            "P_Valor": p_valor,
            "Significativo": (
                "Sim"
                if p_valor < ALPHA
                else "Não"
            ),
        })

    resultado = pd.DataFrame(resultados)

    print("\nTESTE T POR SENIORIDADE")
    print(resultado.to_string(index=False))

    if (resultado["P_Valor"] < ALPHA).all():
        print(
            "\nA diferença salarial foi significativa "
            "em todas as senioridades analisadas."
        )
    else:
        print(
            "\nNem todas as senioridades apresentaram "
            "diferença salarial significativa."
        )


def main():
    df = pd.read_csv(DATA_PATH)

    print("H0: as médias salariais são iguais.")
    print("H1: as médias salariais são diferentes.")
    print(f"Nível de significância: {ALPHA}")

    teste_global(df)
    teste_por_senioridade(df)


if __name__ == "__main__":
    main()
