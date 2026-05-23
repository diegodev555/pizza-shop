import { Router } from 'express';
import passport from 'passport';
import { config } from '../config/index.js';
import type { Request, Response, NextFunction } from 'express';

const router = Router();

/**
 * GET /api/auth/google
 * Start Google OAuth login flow
 */
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

/**
 * GET /api/auth/google/callback
 * Handle Google OAuth callback
 */
router.get('/google/callback',
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', {
      failureRedirect: `${config.frontendUrl}/admin/login?error=unauthorized`,
      session: true,
    }, (err: Error | null, user: Express.User | false, info: { message?: string }) => {
      if (err) {
        console.error('Google auth error:', err);
        return res.redirect(`${config.frontendUrl}/admin/login?error=auth_failed`);
      }
      if (!user) {
        const errorMsg = info?.message || 'unauthorized';
        return res.redirect(`${config.frontendUrl}/admin/login?error=${encodeURIComponent(errorMsg)}`);
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          console.error('Login error:', loginErr);
          return res.redirect(`${config.frontendUrl}/admin/login?error=login_failed`);
        }
        // Successful login - redirect with auth=done so frontend knows to re-check auth
        console.log(`✅ User authenticated: ${(user as { email?: string }).email}`);
        return res.redirect(`${config.frontendUrl}/admin?auth=done`);
      });
    })(req, res, next);
  }
);

/**
 * GET /api/auth/me
 * Get current authenticated user
 */
router.get('/me', (req: Request, res: Response) => {
  console.log(`[auth/me] Session ID: ${req.sessionID}, Authenticated: ${req.isAuthenticated()}, User:`, req.user ? (req.user as { email?: string }).email : 'none');

  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({
      success: false,
      error: 'Not authenticated',
    });
  }

  return res.json({
    success: true,
    data: {
      id: (req.user as { id: string }).id,
      email: (req.user as { email: string }).email,
      displayName: (req.user as { displayName: string }).displayName,
      photoUrl: (req.user as { photoUrl: string | null }).photoUrl,
    },
  });
});

/**
 * POST /api/auth/logout
 * Log out and destroy session
 */
router.post('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, error: 'Logout failed' });
    }
    (req as Request & { session: { destroy: (cb: (err?: unknown) => void) => void } }).session.destroy((sessionErr) => {
      if (sessionErr) {
        console.error('Session destroy error:', sessionErr);
      }
      res.clearCookie('connect.sid');
      return res.json({ success: true, data: { message: 'Logged out successfully' } });
    });
  });
});

/**
 * GET /api/auth/debug-session
 * Debug endpoint - only available in development
 * Shows session and user state for troubleshooting
 */
if (config.isDev) {
  router.get('/debug-session', (req: Request, res: Response) => {
    const hasSession = !!req.session;
    const sessionId = req.sessionID || 'none';
    const isAuth = req.isAuthenticated();
    const userEmail = req.user ? (req.user as { email?: string }).email : null;
    const cookieHeader = req.headers.cookie || 'none';

    console.log(`[debug-session] Session: ${hasSession}, ID: ${sessionId}, Auth: ${isAuth}, User: ${userEmail}, Cookie: ${cookieHeader.substring(0, 50)}...`);

    res.json({
      success: true,
      data: {
        hasSession,
        sessionId: sessionId.substring(0, 20) + '...',
        isAuthenticated: isAuth,
        user: userEmail,
        hasCookieHeader: req.headers.cookie ? true : false,
        corsOrigin: config.corsOrigin,
        frontendUrl: config.frontendUrl,
      },
    });
  });
}

export default router;