import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import type { VerifyCallback } from 'passport-google-oauth20';
import type { Request } from 'express';
import { config } from '../config/index.js';

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string | null;
}

// Serialize user to session
passport.serializeUser((user: Express.User, done) => {
  done(null, (user as AdminUser).email);
});

// Deserialize user from session
passport.deserializeUser(async (email: string, done) => {
  // In a simple setup, we store the minimal user info
  // For production, you could look up from DB
  const user: AdminUser = {
    id: email,
    email,
    displayName: email.split('@')[0],
    photoUrl: null,
  };
  done(null, user);
});

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl,
      passReqToCallback: true,
    },
    (
      _req: Request,
      _accessToken: string,
      _refreshToken: string,
      profile: { id: string; displayName: string; emails?: { value: string }[]; photos?: { value: string }[] },
      done: VerifyCallback
    ) => {
      const email = profile.emails?.[0]?.value?.toLowerCase();

      if (!email) {
        return done(new Error('No email found in Google profile'), undefined as unknown as Express.User);
      }

      // Check if the email is in the admin allowlist
      if (!config.adminAllowedEmails.includes(email)) {
        return done(null, false, { message: 'Unauthorized: Your email is not in the admin allowlist' });
      }

      const user: AdminUser = {
        id: email,
        email,
        displayName: profile.displayName,
        photoUrl: profile.photos?.[0]?.value || null,
      };

      return done(null, user);
    }
  )
);

export default passport;