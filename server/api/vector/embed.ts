import { QdrantVectorStore} from '@langchain/qdrant'
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export default defineEventHandler(async (event) => {
  // const embeddings = new OpenAIEmbeddings()
  const query = getQuery(event)
  let conversation = query.c as string || " En un lugar de la mancha"

  const config = useRuntimeConfig()
  const model = new OpenAIEmbeddings({
    apiKey: config.openaiApiKey,
  })

  const response = await model.embedQuery(conversation)
  return response
})
