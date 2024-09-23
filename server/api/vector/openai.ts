import { QdrantVectorStore} from '@langchain/qdrant'
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export default defineEventHandler(async (event) => {
  // const embeddings = new OpenAIEmbeddings()
  const config = useRuntimeConfig()
  const model = new ChatOpenAI({
    modelName: 'gpt-4o',
    temperature: 0.5,
    apiKey: config.openaiApiKey,
  })
  const conversation = [
    new SystemMessage('You are a helpful assistant.'),
    new HumanMessage('I love programming.'),
  ]
  const response = await model.invoke(conversation)
  return response
})
