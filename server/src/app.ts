import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/index.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));

// Logging
app.use(morgan(config.isDev ? 'dev' : 'combined'));

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

export default app;