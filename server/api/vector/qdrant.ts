import { QdrantVectorStore} from '@langchain/qdrant'
import { OpenAIEmbeddings } from '@langchain/openai'

export default defineEventHandler(async (event) => {
  const embeddings = new OpenAIEmbeddings()
  return 'Hello Nitro Vector'
})
