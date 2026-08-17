<div align="center">

# ◈ HelpSystem Pro

### Tecnologia simples por fora. Poderosa por dentro.

Site oficial, central de produtos e ferramentas técnicas da marca HelpSystem Pro.

[![Produção](https://img.shields.io/badge/produção-online-22c55e?style=for-the-badge)](https://helpsystempro.site)
[![HTTPS](https://img.shields.io/badge/HTTPS-Cloudflare-f38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://helpsystempro.site)
[![Docker](https://img.shields.io/badge/deploy-Docker-2496ed?style=for-the-badge&logo=docker&logoColor=white)](#executar-localmente)
[![Mobile](https://img.shields.io/badge/interface-responsiva-22d3d3?style=for-the-badge)](#ecossistema)

[Site](https://helpsystempro.site) · [Soluções](https://helpsystempro.site/produtos/) · [Ferramentas](https://helpsystempro.site/tools/) · [Bot](https://bot.helpsystempro.site) · [Crédito](https://credito.helpsystempro.site)

</div>

---

## ✦ Sobre

Este repositório contém o **build estático de produção** do portal HelpSystem Pro. Ele apresenta o portfólio, centraliza os produtos e oferece utilitários para analistas, DBAs e desenvolvedores.

> Este é o resultado compilado. Alterações profundas no React devem ser feitas no projeto-fonte e recompiladas.

## 🧩 Ecossistema

| Produto | Finalidade | Acesso |
|---|---|---|
| **Central de soluções** | Visão unificada dos produtos | [Abrir](https://helpsystempro.site/produtos/) |
| **HelpSystemPro Crédito** | Clientes, contratos e recebimentos | [Abrir](https://credito.helpsystempro.site) |
| **Ferramentas técnicas** | JSON, XML, API, SOAP, IP e rede | [Abrir](https://helpsystempro.site/tools/) |
| **Automação Binance** | Apresentação do projeto operacional | [Conhecer](https://bot.helpsystempro.site) |

## 🧰 Ferramentas

- formatação, validação e minificação de JSON/XML;
- decodificação de Base64 para JSON;
- montagem de requisições API/SOAP;
- geração de comandos PowerShell e cURL;
- consulta de IP público e reverse DNS;
- teste aproximado de velocidade.

As operações de formatação acontecem no navegador. O proxy de API permanece **negado por padrão** até receber uma allowlist segura.

## 🏗️ Estrutura

    .
    ├── index.html          # portal principal
    ├── produtos/           # central de soluções
    ├── tools/              # ferramentas técnicas
    ├── bot/                # landing da automação
    ├── nginx.conf          # rotas e segurança
    ├── Dockerfile
    └── docker-compose.yml

## 🚀 Executar localmente

    cd D:\DEV\Helpsystem_Pro
    docker compose up -d --build

Acesse http://127.0.0.1:8092.

## 🛡️ Segurança e privacidade

- HTTPS e proteção de borda pela Cloudflare;
- contêiner somente leitura e sem elevação de privilégios;
- cabeçalhos de segurança no Nginx;
- nenhuma credencial deve ser adicionada ao repositório;
- proxy externo com allowlist explícita.

## 📦 Publicação

O domínio principal roda em Docker na VPS, acessível por Cloudflare Tunnel. A antiga publicação Netlify pode ser mantida apenas como contingência.

---

<div align="center">

**HelpSystem Pro** · Soluções digitais com clareza, segurança e propósito.

</div>
