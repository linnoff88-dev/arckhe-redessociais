ï»¿# Redes Sociais ê¢â¬â PublicaêÂ§êÂ£o AutomêÂ¡tica

Infraestrutura completa para publicar automaticamente conteêÂºdo (texto, imagem e vêÂ­deo) em **Instagram, TikTok, Facebook, YouTube, X (Twitter) e LinkedIn** usando o [Postiz](https://github.com/gitroomhq/postiz-app) self-hosted + Node.js.

---

## SumêÂ¡rio

- [VisêÂ£o Geral](#visêÂ£o-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [PrêÂ©-requisitos](#prêÂ©-requisitos)
- [InstalaêÂ§êÂ£o e ConfiguraêÂ§êÂ£o](#instalaêÂ§êÂ£o-e-configuraêÂ§êÂ£o)
  - [1. Clonar o repositêÂ³rio](#1-clonar-o-repositêÂ³rio)
  - [2. Configurar variêÂ¡veis de ambiente](#2-configurar-variêÂ¡veis-de-ambiente)
  - [3. Subir o Postiz com Docker](#3-subir-o-postiz-com-docker)
  - [4. Configurar o painel do Postiz](#4-configurar-o-painel-do-postiz)
  - [5. Instalar dependêÂªncias Node.js](#5-instalar-dependêÂªncias-nodejs)
- [Criando Apps nas Redes Sociais](#criando-apps-nas-redes-sociais)
  - [Facebook + Instagram (Meta)](#facebook--instagram-meta)
  - [TikTok](#tiktok)
  - [YouTube (Google)](#youtube-google)
  - [X (Twitter)](#x-twitter)
  - [LinkedIn](#linkedin)
- [Como Publicar](#como-publicar)
  - [Publicar texto](#publicar-texto)
  - [Publicar imagem](#publicar-imagem)
  - [Publicar vêÂ­deo / Reels / Shorts](#publicar-vêÂ­deo--reels--shorts)
  - [Agendar publicaêÂ§êÂ£o](#agendar-publicaêÂ§êÂ£o)
- [API do PostizClient](#api-do-postizjsclient)
- [LimitaêÂ§êÂµes Importantes](#limitaêÂ§êÂµes-importantes)
- [Parar / Reiniciar os containers](#parar--reiniciar-os-containers)

---

## VisêÂ£o Geral

```
VocêÂª (script Node.js)
       ê¢ââ
       ê¢âÂ¼
Postiz API (http://localhost:4007)   ê¢â Â self-hosted, grêÂ¡tis, open source
       ê¢ââ
       ê¢âÅê¢ââ¬ê¢âÂº Instagram (Meta Graph API)
       ê¢âÅê¢ââ¬ê¢âÂº TikTok (Content Posting API)
       ê¢âÅê¢ââ¬ê¢âÂº Facebook (Meta Graph API)
       ê¢âÅê¢ââ¬ê¢âÂº YouTube (YouTube Data API v3)
       ê¢âÅê¢ââ¬ê¢âÂº X / Twitter (X API v2)
       ê¢ââê¢ââ¬ê¢âÂº LinkedIn (Posts API)
```

O **Postiz** êÂ© um agendador de redes sociais open source que cuida de toda a complexidade das APIs de cada plataforma. VocêÂª sêÂ³ precisa:
1. Rodar o Postiz localmente com Docker
2. Conectar suas contas via OAuth no painel
3. Usar os scripts Node.js para publicar via API

---

## Estrutura do Projeto

```
redessociais/
ê¢âÅê¢ââ¬ê¢ââ¬ docker-compose.yml        # Postiz + PostgreSQL + Redis
ê¢âÅê¢ââ¬ê¢ââ¬ .env.example              # Template de variêÂ¡veis de ambiente
ê¢âÅê¢ââ¬ê¢ââ¬ .env                      # Suas credenciais reais (nêÂ£o commitado)
ê¢âÅê¢ââ¬ê¢ââ¬ .gitignore
ê¢âÅê¢ââ¬ê¢ââ¬ doc/
ê¢ââ   ê¢ââê¢ââ¬ê¢ââ¬ relatorio-redes-sociais-apis.md   # Pesquisa completa de APIs
ê¢ââê¢ââ¬ê¢ââ¬ src/
    ê¢âÅê¢ââ¬ê¢ââ¬ package.json
    ê¢âÅê¢ââ¬ê¢ââ¬ postiz.js             # Classe PostizClient (wrapper da API)
    ê¢ââê¢ââ¬ê¢ââ¬ examples/
        ê¢âÅê¢ââ¬ê¢ââ¬ post-text.js      # Exemplo: publicar texto
        ê¢âÅê¢ââ¬ê¢ââ¬ post-image.js     # Exemplo: publicar imagem
        ê¢ââê¢ââ¬ê¢ââ¬ post-video.js     # Exemplo: publicar vêÂ­deo / agendar
```

---

## PrêÂ©-requisitos

| Ferramenta | VersêÂ£o mêÂ­nima | Verificar |
|---|---|---|
| Docker | 24+ | `docker --version` |
| Docker Compose | v2+ | `docker compose version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |

---

## InstalaêÂ§êÂ£o e ConfiguraêÂ§êÂ£o

### 1. Clonar o repositêÂ³rio

```bash
git clone https://github.com/linnoff88-dev/redessociais.git
cd redessociais
```

---

### 2. Configurar variêÂ¡veis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Abra o `.env` e configure:

```env
# Chave secreta ê¢â¬â gere uma aleatêÂ³ria:
# openssl rand -hex 32
JWT_SECRET=cole_aqui_uma_chave_aleatoria_segura

# Credenciais das redes sociais (veja a seêÂ§êÂ£o abaixo)
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

> As URLs, banco de dados e Redis jêÂ¡ estêÂ£o prêÂ©-configurados no `.env.example` para uso local. NêÂ£o êÂ© necessêÂ¡rio alterar.

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
- Acesse o menu **Channels** (ou IntegraêÂ§êÂµes)
- Clique em **Add Channel**
- Selecione a rede desejada e faêÂ§a login via OAuth
- Repita para cada rede: Instagram, TikTok, Facebook, YouTube, X, LinkedIn

**d) Gere a API Key:**
- VêÂ¡ em **Settings ê¢â â API Keys**
- Clique em **Generate**
- Copie a chave gerada ê¢â¬â vocêÂª vai precisar nos scripts

**e) Copie os IDs das integraêÂ§êÂµes:**
- No painel, execute via script ou use o exemplo abaixo para listar:

```bash
cd src
node examples/post-text.js
# Na primeira execuêÂ§êÂ£o, ele vai listar os IDs disponêÂ­veis no console
```

Anote os IDs de cada rede para usar nos exemplos.

---

### 5. Instalar dependêÂªncias Node.js

```bash
cd src
npm install
```

---

## Criando Apps nas Redes Sociais

Cada rede exige que vocêÂª crie um "app de desenvolvedor" para obter as credenciais OAuth. Veja como fazer para cada uma:

---

### Facebook + Instagram (Meta)

> **Um êÂºnico app cobre as duas redes.**

1. Acesse: https://developers.facebook.com
2. Clique em **My Apps ê¢â â Create App**
3. Tipo: **Business**
4. Adicione os produtos:
   - **Instagram Graph API**
   - **Facebook Login**
5. Em **Settings ê¢â â Basic**, copie:
   - `App ID` ê¢â â `FACEBOOK_APP_ID`
   - `App Secret` ê¢â â `FACEBOOK_APP_SECRET`
6. No Postiz, a URL de callback OAuth serêÂ¡: `http://localhost:4007/oauth/facebook`

> **Requisito:** Sua conta do Instagram precisa ser do tipo **Business ou Creator** e estar vinculada a uma **Facebook Page**.

---

### TikTok

1. Acesse: https://developers.tiktok.com
2. Clique em **Manage Apps ê¢â â Create App**
3. Adicione o produto: **Content Posting API**
4. Escopos necessêÂ¡rios: `video.publish`, `video.upload`
5. Em **App Details**, copie:
   - `Client Key` ê¢â â `TIKTOK_CLIENT_KEY`
   - `Client Secret` ê¢â â `TIKTOK_CLIENT_SECRET`

> **AtenêÂ§êÂ£o:** Sem aprovaêÂ§êÂ£o do app pela TikTok, os vêÂ­deos publicados ficam **privados** (visêÂ­veis sêÂ³ para vocêÂª). Solicite aprovaêÂ§êÂ£o no painel do desenvolvedor para tornar os posts pêÂºblicos.

---

### YouTube (Google)

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto (ou use um existente)
3. VêÂ¡ em **APIs & Services ê¢â â Library**
4. Busque e ative: **YouTube Data API v3**
5. VêÂ¡ em **APIs & Services ê¢â â Credentials**
6. Clique em **Create Credentials ê¢â â OAuth 2.0 Client ID**
7. Tipo: **Web application**
8. URI de redirecionamento autorizado: `http://localhost:4007/oauth/youtube`
9. Copie:
   - `Client ID` ê¢â â `YOUTUBE_CLIENT_ID`
   - `Client Secret` ê¢â â `YOUTUBE_CLIENT_SECRET`

> **AtenêÂ§êÂ£o:** O YouTube tem cota de **10.000 unidades/dia** (~6 uploads). Para posts automêÂ¡ticos pêÂºblicos, o Google exige uma **auditoria do app** (processo que pode levar semanas). Sem auditoria, os vêÂ­deos ficam **privados**.

---

### X (Twitter)

1. Acesse: https://developer.x.com
2. Clique em **Create Project** e depois **Create App**
3. Em **App Settings ê¢â â User authentication settings**:
   - Ative **OAuth 2.0**
   - Tipo: **Web App**
   - Callback URL: `http://localhost:4007/oauth/twitter`
   - Escopos: `tweet.write`, `users.read`, `offline.access`
4. Copie as chaves em **Keys and Tokens**:
   - `Client ID` ê¢â â `TWITTER_CLIENT_ID`
   - `Client Secret` ê¢â â `TWITTER_CLIENT_SECRET`

> **Plano Free:** 500 posts/mêÂªs, sem leitura de timeline. Suficiente para publicaêÂ§êÂ£o automêÂ¡tica bêÂ¡sica.

---

### LinkedIn

1. Acesse: https://developer.linkedin.com
2. Clique em **Create App**
3. Associe a uma **LinkedIn Company Page**
4. Em **Products**, solicite acesso a:
   - **Share on LinkedIn**
   - **Sign In with LinkedIn using OpenID Connect**
5. Em **Auth ê¢â â OAuth 2.0 Settings**:
   - Redirect URL: `http://localhost:4007/oauth/linkedin`
6. Copie:
   - `Client ID` ê¢â â `LINKEDIN_CLIENT_ID`
   - `Client Secret` ê¢â â `LINKEDIN_CLIENT_SECRET`

> O LinkedIn precisa **aprovar** o produto "Share on LinkedIn" ê¢â¬â pode levar alguns dias.

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
  text: 'Meu post automêÂ¡tico! ê°Å¸Å¡â¬'
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
  text: 'Legenda da foto ê°Å¸âÂ¸',
  mediaIds: [media.id]
})
```

> Formatos suportados: **JPG, PNG**. Para Instagram, prefira JPEG.

---

### Publicar vêÂ­deo / Reels / Shorts

```bash
cd src
node examples/post-video.js
```

Faz upload do vêÂ­deo e publica no **TikTok**, **Instagram (Reels)** e **YouTube**.

```js
// src/examples/post-video.js
const media = await client.uploadMedia('./meu-video.mp4')
await client.postNow({
  integrationIds: ['id-tiktok', 'id-instagram', 'id-youtube'],
  text: 'DescriêÂ§êÂ£o com #hashtags ê°Å¸Å½Â¬',
  mediaIds: [media.id]
})
```

> Formato de vêÂ­deo: **MP4** obrigatêÂ³rio.
> Para Reels/Shorts: vêÂ­deo vertical (9:16), atêÂ© 90 segundos.
> Para YouTube longo: sem limite de duraêÂ§êÂ£o, arquivo atêÂ© 256 GB.

---

### Agendar publicaêÂ§êÂ£o

Para agendar um post para uma data futura, use o mêÂ©todo `schedulePost`:

```js
import { PostizClient } from './postiz.js'

const client = new PostizClient({
  baseUrl: 'http://localhost:4007',
  apiKey: 'SUA_API_KEY'
})

const media = await client.uploadMedia('./video.mp4')

// Agendar para amanhêÂ£ êÂ s 10h
const data = new Date()
data.setDate(data.getDate() + 1)
data.setHours(10, 0, 0, 0)

await client.schedulePost({
  integrationIds: ['id-instagram', 'id-tiktok'],
  text: 'Post agendado para amanhêÂ£! ê°Å¸ââ¦',
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

| MêÂ©todo | DescriêÂ§êÂ£o | Retorno |
|---|---|---|
| `getIntegrations()` | Lista todas as redes conectadas com seus IDs | `Array` de integraêÂ§êÂµes |
| `uploadMedia(filePath)` | Envia imagem ou vêÂ­deo MP4 | `{ id, path }` |
| `postNow({ integrationIds, text, mediaIds })` | Publica imediatamente | Resultado da publicaêÂ§êÂ£o |
| `schedulePost({ integrationIds, text, mediaIds, date })` | Agenda para data futura | Resultado do agendamento |

---

## LimitaêÂ§êÂµes Importantes

| Rede | LimitaêÂ§êÂ£o |
|---|---|
| **Instagram** | Apenas JPEG para imagens; requer conta Business/Creator |
| **TikTok** | Sem aprovaêÂ§êÂ£o do app: posts ficam **privados** |
| **Facebook** | Funciona apenas em **Pages**, nêÂ£o em perfis pessoais |
| **YouTube** | ~6 uploads/dia (cota 10k unidades); posts automêÂ¡ticos pêÂºblicos exigem auditoria do Google |
| **X (Twitter)** | Plano Free: **500 posts/mêÂªs** |
| **LinkedIn** | Token expira em **60 dias** (exige nova autenticaêÂ§êÂ£o OAuth) |
| **Postiz API** | Limite de **30 requisiêÂ§êÂµes/hora** |
| **VêÂ­deo** | Apenas formato **MP4** |

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

## ReferêÂªncias

- [Postiz GitHub](https://github.com/gitroomhq/postiz-app)
- [Postiz Docs](https://docs.postiz.com)
- [Meta for Developers](https://developers.facebook.com)
- [TikTok for Developers](https://developers.tiktok.com)
- [Google Cloud Console](https://console.cloud.google.com)
- [X Developer Portal](https://developer.x.com)
- [LinkedIn Developers](https://developer.linkedin.com)
- [RelatêÂ³rio completo de APIs](doc/relatorio-redes-sociais-apis.md)

---

Projeto  - ARCKHÉe