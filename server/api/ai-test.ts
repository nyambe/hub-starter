import { AIStream, formatStreamPart } from 'ai'

export default defineEventHandler(async (event) => {
  const messages = [
    { role: 'system', content: 'You are a friendly assistant' },
    { role: 'user', content: 'What is the origin of the phrase Hello, World' }
  ]

  const ai = hubAI()
  const stream = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    stream: true,
    messages
  }) as ReadableStream

  // return sendStream(event, stream)
  return AIStream(
    new Response(stream),
    data => formatStreamPart('text', JSON.parse(data).response)
  )
})