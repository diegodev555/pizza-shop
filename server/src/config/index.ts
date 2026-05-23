import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  isDev: (process.env.NODE_ENV || 'development') === 'development',

  // Google OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',

  // Session
  sessionSecret: process.env.SESSION_SECRET || 'pizza-shop-super-secret-key-change-in-production',

  // Admin
  adminAllowedEmails: (process.env.ADMIN_ALLOWED_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean),

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};