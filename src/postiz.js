import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'

/**
 * Cliente para a API pública do Postiz self-hosted.
 *
 * Uso:
 *   const client = new PostizClient({
 *     baseUrl: 'http://localhost:4007',
 *     apiKey: 'sua-api-key-do-painel'
 *   })
 */
export class PostizClient {
  constructor({ baseUrl, apiKey }) {
    this.http = axios.create({
      baseURL: `${baseUrl}/public/v1`,
      headers: { Authorization: apiKey }
    })
  }

  /**
   * Lista todas as integrações (redes sociais) conectadas no Postiz.
   * Use os IDs retornados para identificar cada rede nos posts.
   */
  async getIntegrations() {
    const { data } = await this.http.get('/integrations')
    return data
  }

  /**
   * Faz upload de um arquivo de mídia (imagem ou vídeo MP4).
   * @param {string} filePath - Caminho absoluto ou relativo para o arquivo
   * @returns {{ id: string, path: string }} - ID e URL da mídia no Postiz
   */
  async uploadMedia(filePath) {
    const form = new FormData()
    form.append('file', fs.createReadStream(path.resolve(filePath)))

    const { data } = await this.http.post('/upload', form, {
      headers: form.getHeaders()
    })
    return data
  }

  /**
   * Publica imediatamente em uma ou mais redes sociais.
   * @param {object} options
   * @param {string[]} options.integrationIds - IDs das integrações (redes)
   * @param {string} options.text - Texto/legenda do post
   * @param {string[]} [options.mediaIds] - IDs de mídias já enviadas via uploadMedia()
   */
  async postNow({ integrationIds, text, mediaIds = [] }) {
    const posts = integrationIds.map(id => ({
      integration: { id },
      value: [{ content: text, image: mediaIds }],
      settings: {}
    }))

    const { data } = await this.http.post('/posts', {
      type: 'now',
      shortLink: false,
      tags: [],
      posts
    })
    return data
  }

  /**
   * Agenda publicaçêo para uma data futura.
   * @param {object} options
   * @param {string[]} options.integrationIds - IDs das integrações (redes)
   * @param {string} options.text - Texto/legenda do post
   * @param {string[]} [options.mediaIds] - IDs de mídias já enviadas via uploadMedia()
   * @param {string|Date} options.date - Data/hora de publicaçêo (ISO 8601)
   */
  async schedulePost({ integrationIds, text, mediaIds = [], date }) {
    const posts = integrationIds.map(id => ({
      integration: { id },
      value: [{ content: text, image: mediaIds }],
      settings: {}
    }))

    const { data } = await this.http.post('/posts', {
      type: 'schedule',
      date: new Date(date).toISOString(),
      shortLink: false,
      tags: [],
      posts
    })
    return data
  }
}
