export interface Pizza {
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

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  tags: string[];
  calories?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}