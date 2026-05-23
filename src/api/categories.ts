import { apiGet } from './client';
import type { Category, ApiCategory } from '../types';

export async function fetchCategories(): Promise<Category[]> {
  const cats = await apiGet<ApiCategory[]>('/categories');
  return [
    { id: 'all', name: 'All Items', description: 'Browse our complete menu' },
    ...cats.map((c) => ({
      id: c.slug,
      name: c.name,
      description: c.description || undefined,
    })),
  ];
}