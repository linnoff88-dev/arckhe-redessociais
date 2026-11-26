import { PostizClient } from '../postiz.js'

const client = new PostizClient({
  baseUrl: 'http://localhost:4007',
  apiKey: 'COLE_SUA_API_KEY_AQUI'
})

// 1. Faz upload do vídeo para o Postiz (formato: MP4)
const media = await client.uploadMedia('./meu-video.mp4')
console.log('Vídeo enviado:', media)

// 2. Publica no TikTok, Instagram (Reels) e YouTube (substitua pelos IDs reais)
const result = await client.postNow({
  integrationIds: [
    'ID_DA_INTEGRACAO_TIKTOK',
    'ID_DA_INTEGRACAO_INSTAGRAM',
    'ID_DA_INTEGRACAO_YOUTUBE'
  ],
  text: 'Descriçêo do vídeo com #hashtags relevantes 🎬',
  mediaIds: [media.id]
})

console.log('Vídeo publicado:', result)

// Exemplo de agendamento para amanhê às 10h:
// const amanha = new Date()
// amanha.setDate(amanha.getDate() + 1)
// amanha.setHours(10, 0, 0, 0)
//
// const agendado = await client.schedulePost({
//   integrationIds: ['ID_DA_INTEGRACAO_TIKTOK'],
//   text: 'Post agendado para amanhê!',
//   mediaIds: [media.id],
//   date: amanha
// })
// console.log('Post agendado:', agendado)
