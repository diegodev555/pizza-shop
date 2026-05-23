import { apiGet } from './client';
import type { Testimonial, ApiTestimonial } from '../types';

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const items = await apiGet<ApiTestimonial[]>('/testimonials');
  return items.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.role || '',
    review: t.review,
    rating: t.rating,
    avatar: t.avatarUrl || undefined,
  }));
}