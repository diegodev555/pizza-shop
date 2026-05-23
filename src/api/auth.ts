const API_BASE = `${import.meta.env.VITE_API_URL || ''}/api`;

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  photoUrl: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

/**
 * Get the Google OAuth login URL
 */
export function getGoogleLoginUrl(): string {
  return `${API_BASE}/auth/google`;
}

/**
 * Fetch the currently authenticated user
 */
export async function fetchCurrentUser(): Promise<AdminUser | null> {
  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) {
      if (response.status === 401) return null;
      throw new Error('Failed to fetch user');
    }
    const result: ApiResponse<AdminUser> = await response.json();
    if (!result.success) return null;
    return result.data;
  } catch (err) {
    console.error('Error fetching current user:', err);
    return null;
  }
}

/**
 * Log out the current user
 */
export async function logoutUser(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const result: ApiResponse<{ message: string }> = await response.json();
    return result.success;
  } catch (err) {
    console.error('Error logging out:', err);
    return false;
  }
}