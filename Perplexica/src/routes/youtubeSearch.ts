import express from 'express';
import handleYoutubeSearch from '../agents/youtubeSearchAgent';
import { getAvailableChatModelProviders, getAvailableEmbeddingModelProviders } from '../lib/providers';

const router = express.Router();

router.post('/', async (req, res) => {
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

    const result = await handleYoutubeSearch(query, chat_history, llm, embeddings);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during YouTube search' });
  }
});

export default router;