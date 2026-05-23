import prisma from '../utils/prisma.js';
import type { Prisma } from '@prisma/client';

export const categoryService = {
  async getAll() {
    return prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  },

  async getById(id: number) {
    return prisma.category.findUnique({ where: { id } });
  },

  async create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data });
  },

  async update(id: number, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.category.delete({ where: { id } });
  },
};