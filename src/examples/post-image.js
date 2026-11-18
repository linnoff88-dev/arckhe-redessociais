import { PostizClient } from '../postiz.js'

const client = new PostizClient({
  baseUrl: 'http://localhost:4007',
  apiKey: 'COLE_SUA_API_KEY_AQUI'
})

// 1. Faz upload da imagem para o Postiz (formato: JPG, PNG)
const media = await client.uploadMedia('./minha-foto.jpg')
console.log('Mídia enviada:', media)

// 2. Publica com legenda no Instagram e Facebook (substitua pelos IDs reais)
const result = await client.postNow({
  integrationIds: [
    'ID_DA_INTEGRACAO_INSTAGRAM',
    'ID_DA_INTEGRACAO_FACEBOOK'
  ],
  text: 'Legenda da foto com #hashtag e texto! 📸',
  mediaIds: [media.id]
})

console.log('Post publicado:', result)
