import express from 'express';
import handleVideoSearch from '../agents/videoSearchAgent';
import { getAvailableChatModelProviders } from '../lib/providers';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { query, chat_history } = req.body;
    
    const chatModels = await getAvailableChatModelProviders();
    const provider = Object.keys(chatModels)[0];
    const chatModel = Object.keys(chatModels[provider])[0];
    const llm = chatModels[provider][chatModel];

    const videos = await handleVideoSearch({ chat_history, query }, llm);
    
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during video search' });
  }
});

export default router;