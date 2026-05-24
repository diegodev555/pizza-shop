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
  // Get all categories (admin)
  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getAll();
      res.json({ success: true, data: categories });
    } catch (err) { next(err); }
  },

  // Categories CRUD
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = categorySchema.parse(req.body);
      const category = await categoryService.create(data);
      res.status(201).json({ success: true, data: category });
    } catch (err) { next(err); }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      const data = categoryUpdateSchema.parse(req.body);
      const category = await categoryService.update(id, data);
      res.json({ success: true, data: category });
    } catch (err) { next(err); }
  },

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      // Check if category has menu items before deleting
      const count = await prisma.menuItem.count({ where: { categoryId: id } });
      if (count > 0) {
        res.status(400).json({
          success: false,
          error: `Cannot delete category: ${count} menu item(s) are assigned to it. Please reassign or delete those items first.`,
        });
        return;
      }
      await categoryService.delete(id);
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },

  // Get all menu items (admin - includes category relation)
  async getMenuItems(_req: Request, res: Response, next: NextFunction) {
    try {
      const items = await prisma.menuItem.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { category: true },
      });
      res.json({ success: true, data: items });
    } catch (err) { next(err); }
  },

  // Menu Items CRUD
  async createMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      const data = menuItemSchema.parse(req.body);
      const { categoryId, tags, ...rest } = data;
      const item = await menuItemService.create({
        ...rest,
        tags: JSON.stringify(tags),
        category: { connect: { id: categoryId } },
      });
      res.status(201).json({ success: true, data: item });
    } catch (err) { next(err); }
  },

  async updateMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      const data = menuItemUpdateSchema.parse(req.body);
      const updateData: Record<string, unknown> = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.slug !== undefined) updateData.slug = data.slug;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.price !== undefined) updateData.price = data.price;
      if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
      if (data.rating !== undefined) updateData.rating = data.rating;
      if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags);
      if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured;
      if (data.spiceLevel !== undefined) updateData.spiceLevel = data.spiceLevel;
      if (data.isVeg !== undefined) updateData.isVeg = data.isVeg;
      if (data.isVegan !== undefined) updateData.isVegan = data.isVegan;
      if (data.isGlutenFree !== undefined) updateData.isGlutenFree = data.isGlutenFree;
      if (data.isAvailable !== undefined) updateData.isAvailable = data.isAvailable;
      if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

      // Handle categoryId separately - connect to category relation
      if (data.categoryId !== undefined) {
        updateData.categoryId = data.categoryId;
      }

      const item = await menuItemService.update(id, updateData);
      res.json({ success: true, data: item });
    } catch (err) { next(err); }
  },

  async deleteMenuItem(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      await menuItemService.delete(id);
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },

  // Get all promotions (admin)
  async getPromotions(_req: Request, res: Response, next: NextFunction) {
    try {
      const promotions = await promotionService.getAll();
      res.json({ success: true, data: promotions });
    } catch (err) { next(err); }
  },

  // Promotions CRUD
  async createPromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const data = promotionSchema.parse(req.body);
      const promotion = await promotionService.create(data);
      res.status(201).json({ success: true, data: promotion });
    } catch (err) { next(err); }
  },

  async updatePromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      const data = promotionUpdateSchema.parse(req.body);
      const promotion = await promotionService.update(id, data);
      res.json({ success: true, data: promotion });
    } catch (err) { next(err); }
  },

  async deletePromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      await promotionService.delete(id);
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },

  // Get all testimonials (admin)
  async getTestimonials(_req: Request, res: Response, next: NextFunction) {
    try {
      const testimonials = await testimonialService.getAll();
      res.json({ success: true, data: testimonials });
    } catch (err) { next(err); }
  },

  // Testimonials CRUD
  async createTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const data = testimonialSchema.parse(req.body);
      const testimonial = await testimonialService.create(data);
      res.status(201).json({ success: true, data: testimonial });
    } catch (err) { next(err); }
  },

  async updateTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      const data = testimonialUpdateSchema.parse(req.body);
      const testimonial = await testimonialService.update(id, data);
      res.json({ success: true, data: testimonial });
    } catch (err) { next(err); }
  },

  async deleteTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      await testimonialService.delete(id);
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },

  // Get shop info
  async getShopInfo(_req: Request, res: Response, next: NextFunction) {
    try {
      const shop = await shopService.get();
      res.json({ success: true, data: shop });
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
      const id = parseInt(String(req.params.id));
      const data = contactMessageUpdateSchema.parse(req.body);
      const message = await prisma.contactMessage.update({ where: { id }, data });
      res.json({ success: true, data: message });
    } catch (err) { next(err); }
  },

  // Delete contact message
  async deleteContactMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(String(req.params.id));
      await prisma.contactMessage.delete({ where: { id } });
      res.json({ success: true, data: null });
    } catch (err) { next(err); }
  },
};