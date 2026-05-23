import { apiGet } from './client';
import type { ShopInfo, HomeContentData, AboutContentData, ApiShopInfo } from '../types';

export async function fetchShopInfo(): Promise<ShopInfo> {
  const shop = await apiGet<ApiShopInfo>('/shop-info');
  const hours = parseJsonArray<{ day: string; open: string; close: string }>(shop.openingHours);
  const socialLinks = parseJsonArray<{ platform: string; url: string; icon: string }>(shop.socialLinks);
  const [street, ...rest] = shop.address.split(',');
  const cityPart = rest.join(',').trim() || shop.city;
  
  return {
    name: shop.name,
    phone: shop.phone,
    email: shop.email,
    address: {
      street: street.trim(),
      city: cityPart,
      state: shop.state || '',
      zipCode: shop.zipCode || '',
      country: shop.country || '',
    },
    hours,
    socialLinks,
  };
}

export async function fetchHomeContent(): Promise<HomeContentData> {
  return apiGet<HomeContentData>('/home-content');
}

export async function fetchAboutContent(): Promise<AboutContentData> {
  return apiGet<AboutContentData>('/about-content');
}

function parseJsonArray<T>(value: string): T[] {
  try {
    return JSON.parse(value) as T[];
  } catch {
    return [];
  }
}