CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `projeto`.`gender_pay_gap` AS
    SELECT 
        `m`.`senioridade` AS `senioridade`,
        `s`.`ordem_hierarquica` AS `ordem_hierarquica`,
        ROUND(AVG((CASE
                    WHEN (`m`.`genero` = 'Masculino') THEN `m`.`salario_mensal_brl`
                END)),
                2) AS `salario_medio_homens_brl`,
        ROUND(AVG((CASE
                    WHEN (`m`.`genero` = 'Feminino') THEN `m`.`salario_mensal_brl`
                END)),
                2) AS `salario_medio_mulheres_brl`,
        ROUND((AVG((CASE
                    WHEN (`m`.`genero` = 'Masculino') THEN `m`.`salario_mensal_brl`
                END)) - AVG((CASE
                    WHEN (`m`.`genero` = 'Feminino') THEN `m`.`salario_mensal_brl`
                END))),
                2) AS `gap_salarial_absoluto_brl`,
        ROUND((((AVG((CASE
                    WHEN (`m`.`genero` = 'Masculino') THEN `m`.`salario_mensal_brl`
                END)) - AVG((CASE
                    WHEN (`m`.`genero` = 'Feminino') THEN `m`.`salario_mensal_brl`
                END))) * 100.0) / AVG((CASE
                    WHEN (`m`.`genero` = 'Masculino') THEN `m`.`salario_mensal_brl`
                END))),
                2) AS `gender_pay_gap_pct`
    FROM
        (`projeto`.`fato_mercado_salarios_tech` `m`
        JOIN `projeto`.`dim_senioridade` `s` ON ((`m`.`senioridade` = `s`.`senioridade`)))
    GROUP BY `m`.`senioridade` , `s`.`ordem_hierarquica`
    ORDER BY `s`.`ordem_hierarquica`