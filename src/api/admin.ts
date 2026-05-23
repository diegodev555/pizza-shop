import { apiGet, apiPost, apiPut, apiDelete } from './client';
import type { ApiCategory, ApiPromotion, ApiTestimonial, ApiShopInfo, HomeContentData, AboutContentData } from '../types';

export const adminApi = {
  // Categories
  getCategories: () => apiGet<ApiCategory[]>('/admin/categories'),
  createCategory: (data: Partial<ApiCategory>) => apiPost<ApiCategory>('/admin/categories', data),
  updateCategory: (id: number, data: Partial<ApiCategory>) => apiPut<ApiCategory>(`/admin/categories/${id}`, data),
  deleteCategory: (id: number) => apiDelete(`/admin/categories/${id}`),

  // Menu Items
  getMenuItems: () => apiGet('/admin/menu-items'),
  createMenuItem: (data: unknown) => apiPost('/admin/menu-items', data),
  updateMenuItem: (id: number, data: unknown) => apiPut(`/admin/menu-items/${id}`, data),
  deleteMenuItem: (id: number) => apiDelete(`/admin/menu-items/${id}`),

  // Promotions
  getPromotions: () => apiGet<ApiPromotion[]>('/admin/promotions'),
  createPromotion: (data: Partial<ApiPromotion>) => apiPost<ApiPromotion>('/admin/promotions', data),
  updatePromotion: (id: number, data: Partial<ApiPromotion>) => apiPut<ApiPromotion>(`/admin/promotions/${id}`, data),
  deletePromotion: (id: number) => apiDelete(`/admin/promotions/${id}`),

  // Testimonials
  getTestimonials: () => apiGet<ApiTestimonial[]>('/admin/testimonials'),
  createTestimonial: (data: Partial<ApiTestimonial>) => apiPost<ApiTestimonial>('/admin/testimonials', data),
  updateTestimonial: (id: number, data: Partial<ApiTestimonial>) => apiPut<ApiTestimonial>(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id: number) => apiDelete(`/admin/testimonials/${id}`),

  // Shop Info
  updateShopInfo: (data: Partial<ApiShopInfo>) => apiPut<ApiShopInfo>('/admin/shop-info', data),

  // Home Content
  updateHomeContent: (data: Partial<HomeContentData>) => apiPut<HomeContentData>('/admin/home-content', data),

  // About Content
  updateAboutContent: (data: Partial<AboutContentData>) => apiPut<AboutContentData>('/admin/about-content', data),

  // Contact Messages
  getContactMessages: () => apiGet('/admin/contact-messages'),
  updateContactMessage: (id: number, data: { status: string }) => apiPut(`/admin/contact-messages/${id}`, data),
};