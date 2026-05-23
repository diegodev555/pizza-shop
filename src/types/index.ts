export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  tags: string[];
  isFeatured: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
  calories?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar?: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  discountText: string;
  image?: string;
  validUntil?: string;
  code?: string;
}

export interface ShopInfo {
  name: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  hours: {
    day: string;
    open: string;
    close: string;
    isClosed?: boolean;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface HomeContentData {
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroCtaPrimaryText: string | null;
  heroCtaPrimaryLink: string | null;
  heroCtaSecondaryText: string | null;
  heroCtaSecondaryLink: string | null;
  aboutHeadline: string | null;
  aboutText: string | null;
  whyChooseUsTitle: string | null;
  whyChooseUsText: string | null;
}

export interface AboutContentData {
  title: string | null;
  subtitle: string | null;
  storyText: string | null;
  missionText: string | null;
  valuesText: string | null;
  chefName: string | null;
  chefTitle: string | null;
  chefBio: string | null;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface ApiPromotion {
  id: number;
  title: string;
  description: string;
  discountText: string;
  imageUrl: string | null;
  code: string | null;
  validUntil: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface ApiTestimonial {
  id: number;
  name: string;
  role: string | null;
  review: string;
  rating: number;
  avatarUrl: string | null;
  isFeatured: boolean;
  sortOrder: number;
}

export interface ApiShopInfo {
  id: number;
  name: string;
  tagline: string | null;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  openingHours: string;
  mapUrl: string | null;
  socialLinks: string;
}