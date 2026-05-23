const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  details?: { field: string; message: string }[];
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  const result: ApiResponse<T> = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Request failed');
  }
  return result.data;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result: ApiResponse<T> = await response.json();
  if (!result.success) {
    if (result.details) {
      const error = new Error(result.details[0].message) as Error & { details: typeof result.details };
      error.details = result.details;
      throw error;
    }
    throw new Error(result.error || 'Request failed');
  }
  return result.data;
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const result: ApiResponse<T> = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Request failed');
  }
  return result.data;
}

export async function apiDelete(path: string): Promise<void> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
  });
  const result: ApiResponse<null> = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Request failed');
  }
}