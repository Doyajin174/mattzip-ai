import express from 'express';
import cors from 'cors';
import routes from './routes';
import { getPort } from './config';
import logger from './utils/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = getPort();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`API server is running on port ${port}`);
});

export default app;