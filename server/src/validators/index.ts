import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  description: z.string().optional().nullable(),
  sortOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const categoryUpdateSchema = categorySchema.partial();

export const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  imageUrl: z.string().optional().nullable(),
  rating: z.number().min(0).max(5).optional().default(0),
  tags: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  spiceLevel: z.string().optional().nullable(),
  isVeg: z.boolean().optional().default(false),
  isVegan: z.boolean().optional().default(false),
  isGlutenFree: z.boolean().optional().default(false),
  isAvailable: z.boolean().optional().default(true),
  categoryId: z.number().int().positive('Category is required'),
  sortOrder: z.number().int().optional().default(0),
});

export const menuItemUpdateSchema = menuItemSchema.partial();

export const promotionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  discountText: z.string().min(1, 'Discount text is required'),
  imageUrl: z.string().optional().nullable(),
  code: z.string().optional().nullable(),
  validUntil: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const promotionUpdateSchema = promotionSchema.partial();

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional().nullable(),
  review: z.string().min(1, 'Review is required'),
  rating: z.number().int().min(1).max(5).optional().default(5),
  avatarUrl: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const testimonialUpdateSchema = testimonialSchema.partial();

export const shopInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  tagline: z.string().optional().nullable(),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  openingHours: z.array(z.object({
    day: z.string(),
    open: z.string(),
    close: z.string(),
  })).optional().default([]),
  mapUrl: z.string().optional().nullable(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
    icon: z.string(),
  })).optional().default([]),
});

export const homeContentSchema = z.object({
  heroTitle: z.string().optional().nullable(),
  heroSubtitle: z.string().optional().nullable(),
  heroCtaPrimaryText: z.string().optional().nullable(),
  heroCtaPrimaryLink: z.string().optional().nullable(),
  heroCtaSecondaryText: z.string().optional().nullable(),
  heroCtaSecondaryLink: z.string().optional().nullable(),
  aboutHeadline: z.string().optional().nullable(),
  aboutText: z.string().optional().nullable(),
  whyChooseUsTitle: z.string().optional().nullable(),
  whyChooseUsText: z.string().optional().nullable(),
});

export const aboutContentSchema = z.object({
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  storyText: z.string().optional().nullable(),
  missionText: z.string().optional().nullable(),
  valuesText: z.string().optional().nullable(),
  chefName: z.string().optional().nullable(),
  chefTitle: z.string().optional().nullable(),
  chefBio: z.string().optional().nullable(),
});

export const contactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const contactMessageUpdateSchema = z.object({
  status: z.enum(['unread', 'read', 'archived']),
});