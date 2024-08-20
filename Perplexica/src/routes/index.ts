import express from 'express';
import { authenticate } from '../middleware/auth';
import webSearchRouter from './webSearch';
import imageSearchRouter from './imageSearch';
import videoSearchRouter from './videoSearch';
import youtubeSearchRouter from './youtubeSearch';

const router = express.Router();

// 인증 미들웨어 적용
router.use(authenticate);

// 각 기능에 대한 라우터 설정
router.use('/web-search', webSearchRouter);
router.use('/image-search', imageSearchRouter);
router.use('/video-search', videoSearchRouter);
router.use('/youtube-search', youtubeSearchRouter);

export default router;