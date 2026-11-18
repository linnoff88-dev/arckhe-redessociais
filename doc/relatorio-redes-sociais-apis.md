# Relatório: APIs de Publicação em Redes Sociais

**Data:** Fevereiro 2026

---

## Solução Escolhida

**Postiz self-hosted** (open source, AGPL-3.0) via Docker Compose.
Publicação via **API REST + Node.js**.

- GitHub: https://github.com/gitroomhq/postiz-app
- Docs: https://docs.postiz.com
- Painel local: http://localhost:4007

---

## Plataformas Suportadas pelo Postiz

| Rede | Tipo de Conteúdo | Observações |
|---|---|---|
| Instagram | Imagem, Vídeo, Reels, Carrossel | Requer Meta App |
| TikTok | Vídeo | Exige aprovação para posts públicos |
| Facebook | Texto, Imagem, Vídeo | Mesmo app do Instagram (Meta) |
| YouTube | Vídeo longo e Shorts | Exige auditoria para posts públicos automáticos |
| X (Twitter) | Texto, Imagem, Vídeo | Free: 500 posts/mês |
| LinkedIn | Texto, Imagem, Vídeo | Requer aprovação do app |
| + 13 outras | Pinterest, Reddit, Threads, Bluesky, Mastodon, Discord, Slack, Telegram, etc. | |

---

## Alternativas Pesquisadas

| Plataforma | Preço mínimo c/ API | Self-hosted | SDK |
|---|---|---|---|
| **Postiz** | Grátis (self-host) | ✅ Docker | REST + Node.js npm |
| **Late** (getlate.dev) | $19/mês | ❌ | Node.js + Python (oficial) |
| **Upload-Post** | ~$16-24/mês | ❌ | Node.js + Python + node n8n |
| **Publer** | ~$21/mês | ❌ | Apenas REST |
| **Blotato** | $29/mês | ❌ | Nodes n8n/Make |
| **Ayrshare** | $149/mês | ❌ | Node.js + Python (oficial) |

---

## APIs Diretas (sem intermediário)

### Instagram + Facebook
- **API:** Meta Graph API v22.0
- **App:** https://developers.facebook.com
- **Mídia:** URL pública obrigatória (não aceita upload direto)
- **Conta:** Business ou Creator obrigatório
- **SDK Node.js:** `fb`, chamadas axios diretas
- **Limite:** 100 posts/24h, JPEG apenas para imagens

### TikTok
- **API:** TikTok Content Posting API
- **App:** https://developers.tiktok.com
- **Mídia:** URL pública ou upload chunked
- **Sem aprovação:** posts ficam privados (`SELF_ONLY`)
- **Limite:** 6 req/min por access_token

### YouTube
- **API:** YouTube Data API v3
- **App:** Google Cloud Console
- **Mídia:** Upload direto obrigatório (não aceita URL externa)
- **Cota:** 10.000 unidades/dia (~6 uploads/dia)
- **SDK Node.js:** `googleapis` (oficial Google)

### X (Twitter)
- **API:** X API v2
- **App:** https://developer.x.com
- **Plano Free:** 500 posts/mês (write-only)
- **Plano Basic:** $200/mês, 3.000 posts/mês
- **SDK Node.js:** `twitter-api-v2`

### LinkedIn
- **API:** LinkedIn Posts API
- **App:** https://developer.linkedin.com
- **Produto:** "Share on LinkedIn" (requer aprovação)
- **Mídia:** Upload direto obrigatório
- **Token:** Expira em 60 dias (requer renovação OAuth)

---

## Como Passar Conteúdo — Resumo

| Rede | Texto | Imagem | Vídeo |
|---|---|---|---|
| Instagram | Via legenda | URL pública HTTPS | URL pública ou upload |
| TikTok | Via descrição | ❌ (só carrossel foto) | URL ou upload chunked |
| Facebook | Direto na API | URL ou upload binário | URL ou upload chunked |
| YouTube | Título + descrição | ❌ (thumbnail separado) | **Upload binário obrigatório** |
| X (Twitter) | Direto na API | Upload binário → media_id | Upload chunked → media_id |
| LinkedIn | Direto na API | Upload em 2 etapas | Upload em 3 etapas |

---

## Infraestrutura do Projeto

```
redessociais/
├── docker-compose.yml     # Postiz + PostgreSQL + Redis
├── .env.example           # Template de variáveis
├── .env                   # Variáveis reais (não comitar)
├── .gitignore
├── doc/
│   └── relatorio-redes-sociais-apis.md
└── src/
    ├── package.json
    ├── postiz.js          # Wrapper da API do Postiz
    └── examples/
        ├── post-text.js   # Publicar texto
        ├── post-image.js  # Publicar imagem
        └── post-video.js  # Publicar vídeo / agendar
```

---

## Passos para Começar

1. `cp .env.example .env` e preencher as credenciais
2. `docker compose up -d`
3. Acessar http://localhost:4007 e criar conta admin
4. Configurações → API Key → copiar a chave
5. Conectar cada rede social pelo painel (botão OAuth)
6. `cd src && npm install`
7. Substituir `COLE_SUA_API_KEY_AQUI` e os IDs nos exemplos
8. `node examples/post-text.js` para testar

---

## Onde Criar os Apps de Desenvolvedor

| Rede | URL |
|---|---|
| Facebook + Instagram | https://developers.facebook.com |
| TikTok | https://developers.tiktok.com |
| YouTube | https://console.cloud.google.com |
| X (Twitter) | https://developer.x.com |
| LinkedIn | https://developer.linkedin.com |

---

## Limitações Importantes

- **TikTok:** sem aprovação do app, posts ficam privados
- **YouTube:** cota de ~6 uploads/dia; posts automáticos públicos exigem auditoria do Google
- **X Free:** apenas 500 posts/mês
- **LinkedIn:** token expira em 60 dias
- **Postiz API:** limite de 30 requisições/hora
- **Vídeo:** somente formato **MP4** suportado pelo Postiz
