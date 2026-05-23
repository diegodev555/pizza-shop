import type { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/categoryService.js';
import { menuItemService } from '../services/menuItemService.js';
import { promotionService } from '../services/promotionService.js';
import { testimonialService } from '../services/testimonialService.js';
import { shopService } from '../services/shopService.js';
import prisma from '../utils/prisma.js';
import {
  categorySchema, categoryUpdateSchema,
  menuItemSchema, menuItemUpdateSchema,
  promotionSchema, promotionUpdateSchema,
  testimonialSchema, testimonialUpdateSchema,
  shopInfoSchema,
  homeContentSchema,
  aboutContentSchema,
  contactMessageUpdateSchema,
} from '../validators/index.js';

export const adminController = {
  // Categories
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = categorySchema.parse(req.body);
      const category = await categoryService.create(data);
      res.status(201).json({ success: true, data: category });
    } catch (err) { next(err); }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = categoryUpdateSchema.parse(req.body);
      const category = await categoryService.update(id, data);
      res.json({ success: true, data: category });
    } catch (err) { next(err); }
  },

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await categoryService.delete(id);
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },

  // Menu Items
  async createMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      const data = menuItemSchema.parse(req.body);
      const item = await menuItemService.create({
        ...data,
        tags: JSON.stringify(data.tags),
      });
      res.status(201).json({ success: true, data: item });
    } catch (err) { next(err); }
  },

  async updateMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = menuItemUpdateSchema.parse(req.body);
      const updateData: Record<string, unknown> = { ...data };
      if (data.tags) updateData.tags = JSON.stringify(data.tags);
      const item = await menuItemService.update(id, updateData);
      res.json({ success: true, data: item });
    } catch (err) { next(err); }
  },

  async deleteMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await menuItemService.delete(id);
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },

  // Promotions
  async createPromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const data = promotionSchema.parse(req.body);
      const promotion = await promotionService.create(data);
      res.status(201).json({ success: true, data: promotion });
    } catch (err) { next(err); }
  },

  async updatePromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = promotionUpdateSchema.parse(req.body);
      const promotion = await promotionService.update(id, data);
      res.json({ success: true, data: promotion });
    } catch (err) { next(err); }
  },

  async deletePromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await promotionService.delete(id);
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },

  // Testimonials
  async createTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const data = testimonialSchema.parse(req.body);
      const testimonial = await testimonialService.create(data);
      res.status(201).json({ success: true, data: testimonial });
    } catch (err) { next(err); }
  },

  async updateTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = testimonialUpdateSchema.parse(req.body);
      const testimonial = await testimonialService.update(id, data);
      res.json({ success: true, data: testimonial });
    } catch (err) { next(err); }
  },

  async deleteTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await testimonialService.delete(id);
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },

  // Shop Info
  async updateShopInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const data = shopInfoSchema.parse(req.body);
      const shop = await shopService.update({
        ...data,
        openingHours: JSON.stringify(data.openingHours),
        socialLinks: JSON.stringify(data.socialLinks),
      });
      res.json({ success: true, data: shop });
    } catch (err) { next(err); }
  },

  // Home Content
  async updateHomeContent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = homeContentSchema.parse(req.body);
      const content = await shopService.updateHomeContent(data);
      res.json({ success: true, data: content });
    } catch (err) { next(err); }
  },

  // About Content
  async updateAboutContent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = aboutContentSchema.parse(req.body);
      const content = await shopService.updateAboutContent(data);
      res.json({ success: true, data: content });
    } catch (err) { next(err); }
  },

  // Contact Messages
  async getContactMessages(_req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.json({ success: true, data: messages });
    } catch (err) { next(err); }
  },

  async updateContactMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const data = contactMessageUpdateSchema.parse(req.body);
      const message = await prisma.contactMessage.update({ where: { id }, data });
      res.json({ success: true, data: message });
    } catch (err) { next(err); }
  },
};