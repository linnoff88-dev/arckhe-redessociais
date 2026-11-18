# Redes Sociais â€” PublicaÃ§Ã£o AutomÃ¡tica

Infraestrutura completa para publicar automaticamente conteÃºdo (texto, imagem e vÃ­deo) em **Instagram, TikTok, Facebook, YouTube, X (Twitter) e LinkedIn** usando o [Postiz](https://github.com/gitroomhq/postiz-app) self-hosted + Node.js.

---

## SumÃ¡rio

- [VisÃ£o Geral](#visÃ£o-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [PrÃ©-requisitos](#prÃ©-requisitos)
- [InstalaÃ§Ã£o e ConfiguraÃ§Ã£o](#instalaÃ§Ã£o-e-configuraÃ§Ã£o)
  - [1. Clonar o repositÃ³rio](#1-clonar-o-repositÃ³rio)
  - [2. Configurar variÃ¡veis de ambiente](#2-configurar-variÃ¡veis-de-ambiente)
  - [3. Subir o Postiz com Docker](#3-subir-o-postiz-com-docker)
  - [4. Configurar o painel do Postiz](#4-configurar-o-painel-do-postiz)
  - [5. Instalar dependÃªncias Node.js](#5-instalar-dependÃªncias-nodejs)
- [Criando Apps nas Redes Sociais](#criando-apps-nas-redes-sociais)
  - [Facebook + Instagram (Meta)](#facebook--instagram-meta)
  - [TikTok](#tiktok)
  - [YouTube (Google)](#youtube-google)
  - [X (Twitter)](#x-twitter)
  - [LinkedIn](#linkedin)
- [Como Publicar](#como-publicar)
  - [Publicar texto](#publicar-texto)
  - [Publicar imagem](#publicar-imagem)
  - [Publicar vÃ­deo / Reels / Shorts](#publicar-vÃ­deo--reels--shorts)
  - [Agendar publicaÃ§Ã£o](#agendar-publicaÃ§Ã£o)
- [API do PostizClient](#api-do-postizjsclient)
- [LimitaÃ§Ãµes Importantes](#limitaÃ§Ãµes-importantes)
- [Parar / Reiniciar os containers](#parar--reiniciar-os-containers)

---

## VisÃ£o Geral

```
VocÃª (script Node.js)
       â”‚
       â–¼
Postiz API (http://localhost:4007)   â† self-hosted, grÃ¡tis, open source
       â”‚
       â”œâ”€â–º Instagram (Meta Graph API)
       â”œâ”€â–º TikTok (Content Posting API)
       â”œâ”€â–º Facebook (Meta Graph API)
       â”œâ”€â–º YouTube (YouTube Data API v3)
       â”œâ”€â–º X / Twitter (X API v2)
       â””â”€â–º LinkedIn (Posts API)
```

O **Postiz** Ã© um agendador de redes sociais open source que cuida de toda a complexidade das APIs de cada plataforma. VocÃª sÃ³ precisa:
1. Rodar o Postiz localmente com Docker
2. Conectar suas contas via OAuth no painel
3. Usar os scripts Node.js para publicar via API

---

## Estrutura do Projeto

```
redessociais/
â”œâ”€â”€ docker-compose.yml        # Postiz + PostgreSQL + Redis
â”œâ”€â”€ .env.example              # Template de variÃ¡veis de ambiente
â”œâ”€â”€ .env                      # Suas credenciais reais (nÃ£o commitado)
â”œâ”€â”€ .gitignore
â”œâ”€â”€ doc/
â”‚   â””â”€â”€ relatorio-redes-sociais-apis.md   # Pesquisa completa de APIs
â””â”€â”€ src/
    â”œâ”€â”€ package.json
    â”œâ”€â”€ postiz.js             # Classe PostizClient (wrapper da API)
    â””â”€â”€ examples/
        â”œâ”€â”€ post-text.js      # Exemplo: publicar texto
        â”œâ”€â”€ post-image.js     # Exemplo: publicar imagem
        â””â”€â”€ post-video.js     # Exemplo: publicar vÃ­deo / agendar
```

---

## PrÃ©-requisitos

| Ferramenta | VersÃ£o mÃ­nima | Verificar |
|---|---|---|
| Docker | 24+ | `docker --version` |
| Docker Compose | v2+ | `docker compose version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |

---

## InstalaÃ§Ã£o e ConfiguraÃ§Ã£o

### 1. Clonar o repositÃ³rio

```bash
git clone https://github.com/inematds/redessociais.git
cd redessociais
```

---

### 2. Configurar variÃ¡veis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Abra o `.env` e configure:

```env
# Chave secreta â€” gere uma aleatÃ³ria:
# openssl rand -hex 32
JWT_SECRET=cole_aqui_uma_chave_aleatoria_segura

# Credenciais das redes sociais (veja a seÃ§Ã£o abaixo)
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
TWITTER_CLIENT_ID=
TWITTER_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

> As URLs, banco de dados e Redis jÃ¡ estÃ£o prÃ©-configurados no `.env.example` para uso local. NÃ£o Ã© necessÃ¡rio alterar.

---

### 3. Subir o Postiz com Docker

```bash
docker compose up -d
```

Aguarde cerca de 30 segundos na primeira vez (o banco de dados precisa ser inicializado).

Verifique se tudo subiu corretamente:

```bash
docker compose ps
```

Todos os containers devem estar com status `running`:

```
NAME               STATUS
postiz             running
postiz-postgres    running
postiz-redis       running
```

---

### 4. Configurar o painel do Postiz

**a) Acesse:** http://localhost:4007

**b) Crie sua conta admin** no primeiro acesso.

**c) Conecte as redes sociais:**
- Acesse o menu **Channels** (ou IntegraÃ§Ãµes)
- Clique em **Add Channel**
- Selecione a rede desejada e faÃ§a login via OAuth
- Repita para cada rede: Instagram, TikTok, Facebook, YouTube, X, LinkedIn

**d) Gere a API Key:**
- VÃ¡ em **Settings â†’ API Keys**
- Clique em **Generate**
- Copie a chave gerada â€” vocÃª vai precisar nos scripts

**e) Copie os IDs das integraÃ§Ãµes:**
- No painel, execute via script ou use o exemplo abaixo para listar:

```bash
cd src
node examples/post-text.js
# Na primeira execuÃ§Ã£o, ele vai listar os IDs disponÃ­veis no console
```

Anote os IDs de cada rede para usar nos exemplos.

---

### 5. Instalar dependÃªncias Node.js

```bash
cd src
npm install
```

---

## Criando Apps nas Redes Sociais

Cada rede exige que vocÃª crie um "app de desenvolvedor" para obter as credenciais OAuth. Veja como fazer para cada uma:

---

### Facebook + Instagram (Meta)

> **Um Ãºnico app cobre as duas redes.**

1. Acesse: https://developers.facebook.com
2. Clique em **My Apps â†’ Create App**
3. Tipo: **Business**
4. Adicione os produtos:
   - **Instagram Graph API**
   - **Facebook Login**
5. Em **Settings â†’ Basic**, copie:
   - `App ID` â†’ `FACEBOOK_APP_ID`
   - `App Secret` â†’ `FACEBOOK_APP_SECRET`
6. No Postiz, a URL de callback OAuth serÃ¡: `http://localhost:4007/oauth/facebook`

> **Requisito:** Sua conta do Instagram precisa ser do tipo **Business ou Creator** e estar vinculada a uma **Facebook Page**.

---

### TikTok

1. Acesse: https://developers.tiktok.com
2. Clique em **Manage Apps â†’ Create App**
3. Adicione o produto: **Content Posting API**
4. Escopos necessÃ¡rios: `video.publish`, `video.upload`
5. Em **App Details**, copie:
   - `Client Key` â†’ `TIKTOK_CLIENT_KEY`
   - `Client Secret` â†’ `TIKTOK_CLIENT_SECRET`

> **AtenÃ§Ã£o:** Sem aprovaÃ§Ã£o do app pela TikTok, os vÃ­deos publicados ficam **privados** (visÃ­veis sÃ³ para vocÃª). Solicite aprovaÃ§Ã£o no painel do desenvolvedor para tornar os posts pÃºblicos.

---

### YouTube (Google)

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto (ou use um existente)
3. VÃ¡ em **APIs & Services â†’ Library**
4. Busque e ative: **YouTube Data API v3**
5. VÃ¡ em **APIs & Services â†’ Credentials**
6. Clique em **Create Credentials â†’ OAuth 2.0 Client ID**
7. Tipo: **Web application**
8. URI de redirecionamento autorizado: `http://localhost:4007/oauth/youtube`
9. Copie:
   - `Client ID` â†’ `YOUTUBE_CLIENT_ID`
   - `Client Secret` â†’ `YOUTUBE_CLIENT_SECRET`

> **AtenÃ§Ã£o:** O YouTube tem cota de **10.000 unidades/dia** (~6 uploads). Para posts automÃ¡ticos pÃºblicos, o Google exige uma **auditoria do app** (processo que pode levar semanas). Sem auditoria, os vÃ­deos ficam **privados**.

---

### X (Twitter)

1. Acesse: https://developer.x.com
2. Clique em **Create Project** e depois **Create App**
3. Em **App Settings â†’ User authentication settings**:
   - Ative **OAuth 2.0**
   - Tipo: **Web App**
   - Callback URL: `http://localhost:4007/oauth/twitter`
   - Escopos: `tweet.write`, `users.read`, `offline.access`
4. Copie as chaves em **Keys and Tokens**:
   - `Client ID` â†’ `TWITTER_CLIENT_ID`
   - `Client Secret` â†’ `TWITTER_CLIENT_SECRET`

> **Plano Free:** 500 posts/mÃªs, sem leitura de timeline. Suficiente para publicaÃ§Ã£o automÃ¡tica bÃ¡sica.

---

### LinkedIn

1. Acesse: https://developer.linkedin.com
2. Clique em **Create App**
3. Associe a uma **LinkedIn Company Page**
4. Em **Products**, solicite acesso a:
   - **Share on LinkedIn**
   - **Sign In with LinkedIn using OpenID Connect**
5. Em **Auth â†’ OAuth 2.0 Settings**:
   - Redirect URL: `http://localhost:4007/oauth/linkedin`
6. Copie:
   - `Client ID` â†’ `LINKEDIN_CLIENT_ID`
   - `Client Secret` â†’ `LINKEDIN_CLIENT_SECRET`

> O LinkedIn precisa **aprovar** o produto "Share on LinkedIn" â€” pode levar alguns dias.

---

## Como Publicar

Antes de rodar os exemplos, edite o arquivo e substitua:
- `COLE_SUA_API_KEY_AQUI` pela API Key gerada no painel do Postiz
- `ID_DA_INTEGRACAO_X` pelo ID real da rede (listado ao rodar o script)

---

### Publicar texto

```bash
cd src
node examples/post-text.js
```

Publica em **X (Twitter)** e **LinkedIn** (configure os IDs no arquivo).

```js
// src/examples/post-text.js
await client.postNow({
  integrationIds: ['id-twitter', 'id-linkedin'],
  text: 'Meu post automÃ¡tico! ðŸš€'
})
```

---

### Publicar imagem

```bash
cd src
node examples/post-image.js
```

Faz upload da imagem e publica no **Instagram** e **Facebook**.

```js
// src/examples/post-image.js
const media = await client.uploadMedia('./minha-foto.jpg')
await client.postNow({
  integrationIds: ['id-instagram', 'id-facebook'],
  text: 'Legenda da foto ðŸ“¸',
  mediaIds: [media.id]
})
```

> Formatos suportados: **JPG, PNG**. Para Instagram, prefira JPEG.

---

### Publicar vÃ­deo / Reels / Shorts

```bash
cd src
node examples/post-video.js
```

Faz upload do vÃ­deo e publica no **TikTok**, **Instagram (Reels)** e **YouTube**.

```js
// src/examples/post-video.js
const media = await client.uploadMedia('./meu-video.mp4')
await client.postNow({
  integrationIds: ['id-tiktok', 'id-instagram', 'id-youtube'],
  text: 'DescriÃ§Ã£o com #hashtags ðŸŽ¬',
  mediaIds: [media.id]
})
```

> Formato de vÃ­deo: **MP4** obrigatÃ³rio.
> Para Reels/Shorts: vÃ­deo vertical (9:16), atÃ© 90 segundos.
> Para YouTube longo: sem limite de duraÃ§Ã£o, arquivo atÃ© 256 GB.

---

### Agendar publicaÃ§Ã£o

Para agendar um post para uma data futura, use o mÃ©todo `schedulePost`:

```js
import { PostizClient } from './postiz.js'

const client = new PostizClient({
  baseUrl: 'http://localhost:4007',
  apiKey: 'SUA_API_KEY'
})

const media = await client.uploadMedia('./video.mp4')

// Agendar para amanhÃ£ Ã s 10h
const data = new Date()
data.setDate(data.getDate() + 1)
data.setHours(10, 0, 0, 0)

await client.schedulePost({
  integrationIds: ['id-instagram', 'id-tiktok'],
  text: 'Post agendado para amanhÃ£! ðŸ“…',
  mediaIds: [media.id],
  date: data
})
```

---

## API do PostizClient

Arquivo: `src/postiz.js`

```js
import { PostizClient } from './postiz.js'

const client = new PostizClient({
  baseUrl: 'http://localhost:4007',  // URL do Postiz
  apiKey: 'SUA_API_KEY'             // Gerada no painel
})
```

| MÃ©todo | DescriÃ§Ã£o | Retorno |
|---|---|---|
| `getIntegrations()` | Lista todas as redes conectadas com seus IDs | `Array` de integraÃ§Ãµes |
| `uploadMedia(filePath)` | Envia imagem ou vÃ­deo MP4 | `{ id, path }` |
| `postNow({ integrationIds, text, mediaIds })` | Publica imediatamente | Resultado da publicaÃ§Ã£o |
| `schedulePost({ integrationIds, text, mediaIds, date })` | Agenda para data futura | Resultado do agendamento |

---

## LimitaÃ§Ãµes Importantes

| Rede | LimitaÃ§Ã£o |
|---|---|
| **Instagram** | Apenas JPEG para imagens; requer conta Business/Creator |
| **TikTok** | Sem aprovaÃ§Ã£o do app: posts ficam **privados** |
| **Facebook** | Funciona apenas em **Pages**, nÃ£o em perfis pessoais |
| **YouTube** | ~6 uploads/dia (cota 10k unidades); posts automÃ¡ticos pÃºblicos exigem auditoria do Google |
| **X (Twitter)** | Plano Free: **500 posts/mÃªs** |
| **LinkedIn** | Token expira em **60 dias** (exige nova autenticaÃ§Ã£o OAuth) |
| **Postiz API** | Limite de **30 requisiÃ§Ãµes/hora** |
| **VÃ­deo** | Apenas formato **MP4** |

---

## Parar / Reiniciar os containers

```bash
# Parar
docker compose down

# Parar e apagar os dados (banco e uploads)
docker compose down -v

# Reiniciar
docker compose restart

# Ver logs
docker compose logs -f postiz
```

---

## ReferÃªncias

- [Postiz GitHub](https://github.com/gitroomhq/postiz-app)
- [Postiz Docs](https://docs.postiz.com)
- [Meta for Developers](https://developers.facebook.com)
- [TikTok for Developers](https://developers.tiktok.com)
- [Google Cloud Console](https://console.cloud.google.com)
- [X Developer Portal](https://developer.x.com)
- [LinkedIn Developers](https://developer.linkedin.com)
- [RelatÃ³rio completo de APIs](doc/relatorio-redes-sociais-apis.md)

---

Projeto adaptado da comunidade INEMA TDS - Marca Arckhe