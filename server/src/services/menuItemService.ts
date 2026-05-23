import prisma from '../utils/prisma.js';
import type { Prisma } from '@prisma/client';

export const menuItemService = {
  async getAll() {
    return prisma.menuItem.findMany({
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    });
  },

  async getById(id: number) {
    return prisma.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });
  },

  async getFeatured() {
    return prisma.menuItem.findMany({
      where: { isFeatured: true, isAvailable: true },
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    });
  },

  async getByCategory(categorySlug: string) {
    return prisma.menuItem.findMany({
      where: { category: { slug: categorySlug }, isAvailable: true },
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
    });
  },

  async create(data: Prisma.MenuItemCreateInput) {
    return prisma.menuItem.create({ data, include: { category: true } });
  },

  async update(id: number, data: Prisma.MenuItemUpdateInput) {
    return prisma.menuItem.update({
      where: { id },
      data,
      include: { category: true },
    });
  },

  async delete(id: number) {
    return prisma.menuItem.delete({ where: { id } });
  },
};