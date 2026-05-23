import { apiGet } from './client';
import type { MenuItem } from '../types';

export interface ApiMenuItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string | null;
  rating: number;
  tags: string;
  isFeatured: boolean;
  spiceLevel: string | null;
  isVeg: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
  categoryId: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  };
}

function transformMenuItem(item: ApiMenuItem): MenuItem {
  const tags = parseJsonArray<string>(item.tags);
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category.slug,
    image: item.imageUrl || '',
    rating: item.rating,
    tags,
    isFeatured: item.isFeatured,
    spiceLevel: item.spiceLevel as 'mild' | 'medium' | 'hot' | undefined,
    calories: undefined,
    isVegetarian: item.isVeg,
    isVegan: item.isVegan,
    isGlutenFree: item.isGlutenFree,
  };
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const items = await apiGet<ApiMenuItem[]>('/menu-items');
  return items.map(transformMenuItem);
}

export async function fetchFeaturedItems(): Promise<MenuItem[]> {
  const items = await apiGet<ApiMenuItem[]>('/menu-items/featured');
  return items.map(transformMenuItem);
}

export async function fetchMenuItemById(id: number): Promise<MenuItem> {
  const item = await apiGet<ApiMenuItem>(`/menu-items/${id}`);
  return transformMenuItem(item);
}

function parseJsonArray<T>(value: string): T[] {
  try {
    return JSON.parse(value) as T[];
  } catch {
    return [];
  }
}