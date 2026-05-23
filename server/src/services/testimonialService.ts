import prisma from '../utils/prisma.js';
import type { Prisma } from '@prisma/client';

export const testimonialService = {
  async getAll() {
    return prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } });
  },

  async getFeatured() {
    return prisma.testimonial.findMany({
      where: { isFeatured: true },
      orderBy: { sortOrder: 'asc' },
    });
  },

  async getById(id: number) {
    return prisma.testimonial.findUnique({ where: { id } });
  },

  async create(data: Prisma.TestimonialCreateInput) {
    return prisma.testimonial.create({ data });
  },

  async update(id: number, data: Prisma.TestimonialUpdateInput) {
    return prisma.testimonial.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.testimonial.delete({ where: { id } });
  },
};