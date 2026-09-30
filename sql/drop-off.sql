CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `projeto`.`drop_off` AS
    SELECT 
        `c`.`ano` AS `ano`,
        `c`.`curso_nome` AS `curso_nome`,
        SUM(`c`.`total_ingressantes`) AS `total_ingressantes`,
        SUM(`c`.`ingressantes_mulheres`) AS `ingressantes_mulheres`,
        ROUND(((SUM(`c`.`ingressantes_mulheres`) * 100.0) / SUM(`c`.`total_ingressantes`)),
                2) AS `pct_mulheres_ingresso`,
        SUM(`c`.`total_concluintes`) AS `total_concluintes`,
        SUM(`c`.`concluintes_mulheres`) AS `concluintes_mulheres`,
        ROUND(((SUM(`c`.`concluintes_mulheres`) * 100.0) / SUM(`c`.`total_concluintes`)),
                2) AS `pct_mulheres_conclusao`,
        ROUND((((SUM(`c`.`ingressantes_mulheres`) * 100.0) / SUM(`c`.`total_ingressantes`)) - ((SUM(`c`.`concluintes_mulheres`) * 100.0) / SUM(`c`.`total_concluintes`))),
                2) AS `perda_representatividade_funil_pp`,
        ((SUM(`c`.`concluintes_mulheres`) / SUM(`c`.`ingressantes_mulheres`)) * 100) AS `Pct_Qm_Formou`,
        (((SUM(`c`.`concluintes_mulheres`) / SUM(`c`.`ingressantes_mulheres`)) - 1) * -(100)) AS `Evasao`
    FROM
        `projeto`.`fato_censo_educacao_ti` `c`
    GROUP BY `c`.`ano` , `c`.`curso_nome`
    ORDER BY `c`.`ano` DESC , `perda_representatividade_funil_pp` DESC