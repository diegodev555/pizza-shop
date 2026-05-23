import type { Request, Response, NextFunction } from 'express';
import { config } from '../config/index.js';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      displayName: string;
      photoUrl: string | null;
    }
  }
}

/**
 * Middleware to ensure the user is authenticated.
 * Redirects to Google OAuth if not logged in (for browser requests)
 * or returns 401 for API requests.
 */
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }

  // If it's an AJAX/fetch request, return JSON
  const isApiRequest = req.xhr || req.headers.accept?.includes('json') || req.path.startsWith('/api/');
  if (isApiRequest) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Please log in.',
    });
  }

  // Browser navigation - redirect to login
  return res.redirect(`${config.frontendUrl}/admin/login`);
}

/**
 * Middleware to check if user is an admin (based on email allowlist).
 */
export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Please log in.',
    });
  }

  const userEmail = req.user.email.toLowerCase();
  if (!config.adminAllowedEmails.includes(userEmail)) {
    // Destroy session since user is not authorized
    req.logout((err) => {
      if (err) console.error('Logout error:', err);
    });
    return res.status(403).json({
      success: false,
      error: 'Forbidden. Your email is not authorized as an admin.',
    });
  }

  next();
}