import type { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/categoryService.js';
import { menuItemService } from '../services/menuItemService.js';
import { promotionService } from '../services/promotionService.js';
import { testimonialService } from '../services/testimonialService.js';
import { shopService } from '../services/shopService.js';
import prisma from '../utils/prisma.js';
import { contactMessageSchema } from '../validators/index.js';

export const publicController = {
  async getShopInfo(_req: Request, res: Response, next: NextFunction) {
    try {
      const shop = await shopService.get();
      res.json({ success: true, data: shop });
    } catch (err) { next(err); }
  },

  async getHomeContent(_req: Request, res: Response, next: NextFunction) {
    try {
      const content = await shopService.getHomeContent();
      res.json({ success: true, data: content });
    } catch (err) { next(err); }
  },

  async getAboutContent(_req: Request, res: Response, next: NextFunction) {
    try {
      const content = await shopService.getAboutContent();
      res.json({ success: true, data: content });
    } catch (err) { next(err); }
  },

  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getAll();
      res.json({ success: true, data: categories });
    } catch (err) { next(err); }
  },

  async getMenuItems(_req: Request, res: Response, next: NextFunction) {
    try {
      const items = await menuItemService.getAll();
      res.json({ success: true, data: items });
    } catch (err) { next(err); }
  },

  async getMenuItemById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const item = await menuItemService.getById(id);
      if (!item) {
        res.status(404).json({ success: false, error: 'Menu item not found' });
        return;
      }
      res.json({ success: true, data: item });
    } catch (err) { next(err); }
  },

  async getFeaturedItems(_req: Request, res: Response, next: NextFunction) {
    try {
      const items = await menuItemService.getFeatured();
      res.json({ success: true, data: items });
    } catch (err) { next(err); }
  },

  async getPromotions(_req: Request, res: Response, next: NextFunction) {
    try {
      const promotions = await promotionService.getActive();
      res.json({ success: true, data: promotions });
    } catch (err) { next(err); }
  },

  async getTestimonials(_req: Request, res: Response, next: NextFunction) {
    try {
      const testimonials = await testimonialService.getFeatured();
      res.json({ success: true, data: testimonials });
    } catch (err) { next(err); }
  },

  async getContactInfo(_req: Request, res: Response, next: NextFunction) {
    try {
      const shop = await shopService.get();
      res.json({ success: true, data: shop });
    } catch (err) { next(err); }
  },

  async submitContact(req: Request, res: Response, next: NextFunction) {
    try {
      const data = contactMessageSchema.parse(req.body);
      const message = await prisma.contactMessage.create({ data });
      res.status(201).json({ success: true, data: message });
    } catch (err) { next(err); }
  },
};