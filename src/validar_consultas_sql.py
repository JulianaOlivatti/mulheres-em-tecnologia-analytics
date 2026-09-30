from pathlib import Path
import sqlite3

import pandas as pd


BASE_DIR = Path(__file__).resolve().parents[1]
DB_PATH = (
    BASE_DIR
    / "data"
    / "synthetic"
    / "people_analytics_dei.db"
)

CONSULTAS = [
    (
        "Funil de Liderança - Teto de Vidro",
        """
        SELECT
            s.Ordem_Hierarquica,
            s.Senioridade,
            COUNT(*) AS Total_Profissionais,
            SUM(
                CASE
                    WHEN m.Genero = 'Feminino'
                    THEN 1
                    ELSE 0
                END
            ) AS Mulheres,
            ROUND(
                SUM(
                    CASE
                        WHEN m.Genero = 'Feminino'
                        THEN 1
                        ELSE 0
                    END
                ) * 100.0 / COUNT(*),
                1
            ) AS Pct_Mulheres
        FROM fato_mercado_salarios_tech AS m
        JOIN dim_senioridade AS s
            ON m.Senioridade = s.Senioridade
        GROUP BY
            s.Ordem_Hierarquica,
            s.Senioridade
        ORDER BY s.Ordem_Hierarquica;
        """,
    ),
    (
        "Gender Pay Gap por Senioridade",
        """
        SELECT
            m.Senioridade,
            ROUND(
                AVG(
                    CASE
                        WHEN m.Genero = 'Masculino'
                        THEN m.Salario_Mensal_BRL
                    END
                ),
                0
            ) AS Sal_Homens_BRL,
            ROUND(
                AVG(
                    CASE
                        WHEN m.Genero = 'Feminino'
                        THEN m.Salario_Mensal_BRL
                    END
                ),
                0
            ) AS Sal_Mulheres_BRL,
            ROUND(
                (
                    AVG(
                        CASE
                            WHEN m.Genero = 'Masculino'
                            THEN m.Salario_Mensal_BRL
                        END
                    )
                    -
                    AVG(
                        CASE
                            WHEN m.Genero = 'Feminino'
                            THEN m.Salario_Mensal_BRL
                        END
                    )
                )
                * 100.0
                /
                AVG(
                    CASE
                        WHEN m.Genero = 'Masculino'
                        THEN m.Salario_Mensal_BRL
                    END
                ),
                1
            ) AS Gap_Pct
        FROM fato_mercado_salarios_tech AS m
        JOIN dim_senioridade AS s
            ON m.Senioridade = s.Senioridade
        GROUP BY
            m.Senioridade,
            s.Ordem_Hierarquica
        ORDER BY s.Ordem_Hierarquica;
        """,
    ),
]


def main():
    with sqlite3.connect(DB_PATH) as conexao:
        for titulo, consulta in CONSULTAS:
            resultado = pd.read_sql_query(
                consulta,
                conexao,
            )

            print(f"\n{titulo}")
            print("-" * len(titulo))
            print(resultado.to_string(index=False))


if __name__ == "__main__":
    main()
