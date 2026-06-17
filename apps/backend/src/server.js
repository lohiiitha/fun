import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import './config/env.js';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import appRoutes from './routes/app.routes.js';
import { authenticate, authorize } from './middleware/auth.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';

const app = express();
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gov-school-backend' });
});

app.use('/api/v1/auth', authRateLimit, authRoutes);
app.use('/api/v1', authenticate, authorize('ADMIN', 'TEACHER', 'STUDENT', 'PARENT'), appRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Backend running on port ${env.port}`);
});
