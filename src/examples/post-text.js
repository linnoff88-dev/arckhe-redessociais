import { PostizClient } from '../postiz.js'

const client = new PostizClient({
  baseUrl: 'http://localhost:4007',
  apiKey: 'COLE_SUA_API_KEY_AQUI'
})

// 1. Liste as integrações para pegar os IDs das redes conectadas
const integrations = await client.getIntegrations()
console.log('Integrações disponíveis:')
integrations.forEach(i => console.log(`  [${i.id}] ${i.name} (${i.type})`))

// 2. Publique texto em X (Twitter) e LinkedIn (substitua pelos IDs reais)
const result = await client.postNow({
  integrationIds: [
    'ID_DA_INTEGRACAO_X',
    'ID_DA_INTEGRACAO_LINKEDIN'
  ],
  text: 'Meu primeiro post automático via Postiz! 🚀'
})

console.log('Post publicado:', result)
