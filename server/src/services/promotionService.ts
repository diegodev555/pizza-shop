import prisma from '../utils/prisma.js';
import type { Prisma } from '@prisma/client';

export const promotionService = {
  async getAll() {
    return prisma.promotion.findMany({ orderBy: { sortOrder: 'asc' } });
  },

  async getActive() {
    return prisma.promotion.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  },

  async getById(id: number) {
    return prisma.promotion.findUnique({ where: { id } });
  },

  async create(data: Prisma.PromotionCreateInput) {
    return prisma.promotion.create({ data });
  },

  async update(id: number, data: Prisma.PromotionUpdateInput) {
    return prisma.promotion.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.promotion.delete({ where: { id } });
  },
};