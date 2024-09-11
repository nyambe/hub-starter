import { AIStream, formatStreamPart } from 'ai'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const stream = await hubAI().run('@cf/meta/llama-3.1-8b-instruct', {
    messages,
    stream: true
  }) as ReadableStream

  console.log('stream', messages)

  // Return a compatible stream for the Vercel AI SDK
  return AIStream(
    new Response(stream),
    data => formatStreamPart('text', JSON.parse(data).response)
  )
})
