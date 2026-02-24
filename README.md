# HelpSystem Pro (static)

Este repositÃ³rio Ã© o **site no ar** (build estÃ¡tico: HTML/CSS/JS) do HelpSystem Pro + um â€œmini-sistemaâ€ de ferramentas para analistas/DBA/dev.

Ele foi pensado para:

- Servir como **site/portfolio** (Home / Sobre / Projetos / Contato).
- Entregar **ferramentas Ãºteis e rÃ¡pidas** para o dia a dia, num layout simples (sem depender de instalar apps).
- Hospedar uma **landing page de venda** do Bot em `/bot/`.

> Importante: este repo contÃ©m o **build final**. Se vocÃª quiser mudar componentes do React, pÃ¡ginas, etc, o ideal Ã© ter o **cÃ³digo-fonte** (ex: projeto Vite/React com `src/` e `package.json`). Aqui Ã© o resultado compilado.

## Ferramentas (Sistema)

As ferramentas ficam em `/tools/`:

- `https://helpsystempro.netlify.app/tools/`

## Landing (Bot)

A landing page fica em `/bot/`:

- `https://helpsystempro.netlify.app/bot/`

Dentro de `/tools/` vocÃª tem abas:

- **Formatar**: formatar/minificar/validar **JSON** e **XML** (Ãºtil para anÃ¡lise e troubleshooting).
  - Extra: **Base64 â†’ JSON** (cola um Base64 e ele tenta decodificar e mostrar o JSON formatado).
- **API/SOAP**: um â€œSoapUI/Postman simplesâ€:
  - VocÃª informa **URL**, **mÃ©todo**, **headers** e **body**.
  - O sistema monta automaticamente um **comando PowerShell** (recomendado) ou **cURL** para vocÃª rodar fora do navegador.
  - Para SOAP, aceita placeholders no XML tipo `{{token}}` e cria inputs para preencher.
- **Meu IP**: mostra o IP pÃºblico e faz reverse DNS (PTR) quando possÃ­vel.
- **Velocidade**: roda um teste aproximado de download (o sistema escolhe automaticamente um alvo de teste e faz fallback).

## Privacidade e seguranÃ§a

- As ferramentas rodam **no navegador**.
- O sistema **nÃ£o salva** seu JSON/XML nem seus requests em servidor.
- Alguns recursos usam serviÃ§os pÃºblicos (ex: â€œMeu IPâ€ e reverse DNS) para funcionar.

### API/SOAP e CORS

No navegador, muitas APIs (principalmente SOAP/enterprise) bloqueiam chamadas diretas por **CORS**.

Por isso o sistema tem duas alternativas:

- **Copiar comando** (PowerShell/cURL) e executar fora do navegador.
- **Proxy (Netlify Function)**: quando habilitado na aba API/SOAP, o site chama uma function do Netlify que faz a requisiÃ§Ã£o por vocÃª.

> SeguranÃ§a: o proxy Ã© **deny-by-default** e precisa de allowlist.

ConfiguraÃ§Ã£o no Netlify (Environment variables):

- `PROXY_ALLOWLIST` (obrigatÃ³rio): lista de hosts permitidos (ex: `jsonplaceholder.typicode.com,httpbin.org`)
- `PROXY_TOKEN` (opcional): se definido, o proxy exige header `x-hsp-proxy-token`

No frontend, o token pode ser preenchido no campo **â€œToken (opcional)â€** ao habilitar **â€œUsar proxy (CORS)â€** (ele fica salvo no `localStorage` do navegador).

## LimitaÃ§Ãµes (normal para web)

- Requests de API podem ser bloqueados por **CORS** no navegador. Por isso existe o botÃ£o de â€œcopiar comandoâ€ (PowerShell/cURL).
- Teste de velocidade Ã© **aproximado** e varia com a rota/servidor/rede. O resultado tende a ficar mais â€œrealâ€ no site publicado do que em `localhost`.

## Rodar localmente (teste rÃ¡pido)

No PowerShell:

```powershell
cd D:\DEV\Helpsystem_Pro
py -m http.server 4173
```

Abra:

- `http://localhost:4173/`
- `http://localhost:4173/tools/`
- `http://localhost:4173/bot/`

## Deploy no Netlify (via GitHub)

1. No Netlify: **Add new site â†’ Import an existing project â†’ GitHub**.
2. Selecione o repo `sistema-helpsystempro`.
3. ConfiguraÃ§Ã£o:
   - **Base directory**: vazio
   - **Build command**: nenhum (o `netlify.toml` jÃ¡ define â€œno buildâ€)
   - **Publish directory**: `.`

## Estrutura do repositÃ³rio

- `index.html`: entrada do site (SPA).
- `index-*.js`, `index-*.css`: bundle do build.
- `tools/index.html`: sistema de ferramentas (abas).
- `bot/index.html`: landing page (Bot).
- `netlify.toml` e `_redirects`: redirects (SPA e rotas de `/tools/`).
