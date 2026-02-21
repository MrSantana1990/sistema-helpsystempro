# HelpSystem Pro (static)

Este repositório contém o **build estático** do site (HTML/CSS/JS) para deploy automático no Netlify via GitHub.

## Ferramentas

- Acesse em `/tools/` (ex: `https://helpsystempro.netlify.app/tools/`)

## Deploy no Netlify (GitHub)

1. Suba estes arquivos no repositório `sistema-helpsystempro`.
2. No Netlify: **Add new site → Import an existing project → GitHub**.
3. Configure:
   - **Base directory**: vazio
   - **Build command**: nenhum (o `netlify.toml` já define um comando “no build”)
   - **Publish directory**: `.`

## Observações

- SPA redirect está configurado em `netlify.toml` e `_redirects`.
- O `index.html` referencia os arquivos na raiz (`/index-gfcmobev.js`, `/index-dvhyc5uy.css`).
