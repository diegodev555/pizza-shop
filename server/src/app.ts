import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import passport from './services/authService.js';
import { config } from './config/index.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Validate required config
if (!config.googleClientId || !config.googleClientSecret) {
  console.error('❌ GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in server/.env');
  process.exit(1);
}

if (!config.adminAllowedEmails.length) {
  console.error('❌ ADMIN_ALLOWED_EMAILS must be set in server/.env with at least one email');
  process.exit(1);
}

console.log(`✅ Google OAuth configured: ${config.googleClientId.substring(0, 20)}...`);
console.log(`✅ Admin allowlist: ${config.adminAllowedEmails.join(', ')}`);

// Security
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Logging
app.use(morgan(config.isDev ? 'dev' : 'combined'));

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Trust proxy for session cookies behind proxies
if (!config.isDev) {
  app.set('trust proxy', 1);
}

// Session middleware (required by passport)
// Using default MemoryStore which is fine for development
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // false in development so cookies work over HTTP on localhost
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
  },
}));

// Passport middleware - MUST come after session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

export default app;