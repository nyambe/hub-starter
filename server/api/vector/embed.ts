import { QdrantVectorStore} from '@langchain/qdrant'
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export default defineEventHandler(async (event) => {
  // const embeddings = new OpenAIEmbeddings()
  const config = useRuntimeConfig()
  const model = new OpenAIEmbeddings({
    apiKey: config.openaiApiKey,
  })
  // const conversation = [
  //   new SystemMessage('You are a helpful assistant.'),
  //   new HumanMessage('I love programming.'),
  // ]
  const conversation = "En un lugar de la mancha"
  const response = await model.embedQuery(conversation)
  return response
})
