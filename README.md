# HelpSystem Pro (static)

Este repositório é o **site no ar** (build estático: HTML/CSS/JS) do HelpSystem Pro + um “mini-sistema” de ferramentas para analistas/DBA/dev.

Ele foi pensado para:

- Servir como **site/portfolio** (Home / Sobre / Projetos / Contato).
- Entregar **ferramentas úteis e rápidas** para o dia a dia, num layout simples (sem depender de instalar apps).

> Importante: este repo contém o **build final**. Se você quiser mudar componentes do React, páginas, etc, o ideal é ter o **código-fonte** (ex: projeto Vite/React com `src/` e `package.json`). Aqui é o resultado compilado.

## Ferramentas (Sistema)

As ferramentas ficam em `/tools/`:

- `https://helpsystempro.netlify.app/tools/`

Dentro de `/tools/` você tem abas:

- **Formatar**: formatar/minificar/validar **JSON** e **XML** (útil para análise e troubleshooting).
  - Extra: **Base64 → JSON** (cola um Base64 e ele tenta decodificar e mostrar o JSON formatado).
- **API/SOAP**: um “SoapUI/Postman simples”:
  - Você informa **URL**, **método**, **headers** e **body**.
  - O sistema monta automaticamente um **comando PowerShell** (recomendado) ou **cURL** para você rodar fora do navegador.
  - Para SOAP, aceita placeholders no XML tipo `{{token}}` e cria inputs para preencher.
- **Meu IP**: mostra o IP público e faz reverse DNS (PTR) quando possível.
- **Velocidade**: roda um teste aproximado de download (o sistema escolhe automaticamente um alvo de teste e faz fallback).

## Privacidade e segurança

- As ferramentas rodam **no navegador**.
- O sistema **não salva** seu JSON/XML nem seus requests em servidor.
- Alguns recursos usam serviços públicos (ex: “Meu IP” e reverse DNS) para funcionar.

## Limitações (normal para web)

- Requests de API podem ser bloqueados por **CORS** no navegador. Por isso existe o botão de “copiar comando” (PowerShell/cURL).
- Teste de velocidade é **aproximado** e varia com a rota/servidor/rede. O resultado tende a ficar mais “real” no site publicado do que em `localhost`.

## Rodar localmente (teste rápido)

No PowerShell:

```powershell
cd D:\DEV\Helpsystem_Pro
py -m http.server 4173
```

Abra:

- `http://localhost:4173/`
- `http://localhost:4173/tools/`

## Deploy no Netlify (via GitHub)

1. No Netlify: **Add new site → Import an existing project → GitHub**.
2. Selecione o repo `sistema-helpsystempro`.
3. Configuração:
   - **Base directory**: vazio
   - **Build command**: nenhum (o `netlify.toml` já define “no build”)
   - **Publish directory**: `.`

## Estrutura do repositório

- `index.html`: entrada do site (SPA).
- `index-*.js`, `index-*.css`: bundle do build.
- `tools/index.html`: sistema de ferramentas (abas).
- `netlify.toml` e `_redirects`: redirects (SPA e rotas de `/tools/`).
