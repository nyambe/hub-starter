import { ChatAnthropicMessages } from '@langchain/anthropic'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const model = new ChatAnthropicMessages({
    apiKey: config.anthropicApiKey,
    model: 'claude-3-sonnet-20240229',
    temperature: 0.5,
    maxTokens: 100,
  })
  const conversation = [
    new SystemMessage('You are a helpful assistant.'),
    new HumanMessage('I love programming.'),
  ]
  const response = await model.invoke(conversation)
  return response
})
