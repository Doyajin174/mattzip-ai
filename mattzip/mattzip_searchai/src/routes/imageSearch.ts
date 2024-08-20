import express from 'express';
import handleImageSearch from '../agents/imageSearchAgent';
import { getAvailableChatModelProviders } from '../lib/providers';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { query, chat_history } = req.body;
    
    const chatModels = await getAvailableChatModelProviders();
    const provider = Object.keys(chatModels)[0];
    const chatModel = Object.keys(chatModels[provider])[0];
    const llm = chatModels[provider][chatModel];

    const images = await handleImageSearch({ query, chat_history }, llm);
    
    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during image search' });
  }
});

export default router;