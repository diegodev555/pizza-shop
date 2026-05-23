import { apiGet } from './client';
import type { Promotion, ApiPromotion } from '../types';

export async function fetchPromotions(): Promise<Promotion[]> {
  const items = await apiGet<ApiPromotion[]>('/promotions');
  return items.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    discountText: p.discountText,
    image: p.imageUrl || undefined,
    validUntil: p.validUntil || undefined,
    code: p.code || undefined,
  }));
}