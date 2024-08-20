import express from 'express';
import handleWebSearch from '../agents/webSearchAgent';
import { getAvailableChatModelProviders, getAvailableEmbeddingModelProviders } from '../lib/providers';
import { successResponse, errorResponse } from '../utils/apiResponse';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { query, chat_history } = req.body;
    
    const chatModels = await getAvailableChatModelProviders();
    const embeddingModels = await getAvailableEmbeddingModelProviders();
    
    const provider = Object.keys(chatModels)[0];
    const chatModel = Object.keys(chatModels[provider])[0];
    const embeddingProvider = Object.keys(embeddingModels)[0];
    const embeddingModel = Object.keys(embeddingModels[embeddingProvider])[0];

    const llm = chatModels[provider][chatModel];
    const embeddings = embeddingModels[embeddingProvider][embeddingModel];

    const result = await handleWebSearch(query, chat_history, llm, embeddings);
    
    res.json(successResponse(result));
  } catch (error) {
    next(error);
  }
});

export default router;