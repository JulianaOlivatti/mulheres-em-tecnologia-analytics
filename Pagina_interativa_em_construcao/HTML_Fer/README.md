# Mulheres em Tecnologia — Site

Versão estruturada do MVP de storytelling.

## Estrutura
- `index.html` — conteúdo
- `css/style.css` — estilos
- `js/main.js` — interações
- `assets/images/equipe/` — pasta preparada para fotos locais

## Power BI
O Dashboard já contém o embed do relatório `dashboard_final (1)` com o reportId `2846a68b-0129-4454-85cc-a8c599e31515`.

Como o endereço usa `reportEmbed` e `autoAuth=true`, as permissões e autenticação continuam sendo controladas pelo Power BI.

## Teste local
Não abra apenas o arquivo index.html. Rode um servidor:

    python -m http.server 8000

Depois abra `http://localhost:8000`.

Para o teste mais fiel do Power BI, publique o projeto em HTTPS.

## GitHub Pages
1. Envie o conteúdo desta pasta para o repositório.
2. Abra Settings > Pages.
3. Em Build and deployment, escolha Deploy from a branch.
4. Selecione `main` e `/ (root)`.
5. Salve e aguarde a URL HTTPS.

## Vercel / Netlify
O projeto é HTML/CSS/JS estático e pode ser importado diretamente, sem etapa de build.

## Fotos
Por enquanto, os cards continuam usando os avatares do GitHub. A pasta `assets/images/equipe/` fica preparada para migrarmos as imagens para arquivos locais depois.
