import prisma from '../utils/prisma.js';
import type { Prisma } from '@prisma/client';

export const shopService = {
  async get() {
    const shop = await prisma.shopInfo.findFirst({ orderBy: { id: 'asc' } });
    return shop;
  },

  async update(data: Prisma.ShopInfoUpdateInput) {
    const existing = await prisma.shopInfo.findFirst({ orderBy: { id: 'asc' } });
    if (!existing) {
      return prisma.shopInfo.create({ data: data as Prisma.ShopInfoCreateInput });
    }
    return prisma.shopInfo.update({ where: { id: existing.id }, data });
  },

  async getHomeContent() {
    const content = await prisma.homeContent.findFirst({ orderBy: { id: 'asc' } });
    return content;
  },

  async updateHomeContent(data: Prisma.HomeContentUpdateInput) {
    const existing = await prisma.homeContent.findFirst({ orderBy: { id: 'asc' } });
    if (!existing) {
      return prisma.homeContent.create({ data: data as Prisma.HomeContentCreateInput });
    }
    return prisma.homeContent.update({ where: { id: existing.id }, data });
  },

  async getAboutContent() {
    const content = await prisma.aboutContent.findFirst({ orderBy: { id: 'asc' } });
    return content;
  },

  async updateAboutContent(data: Prisma.AboutContentUpdateInput) {
    const existing = await prisma.aboutContent.findFirst({ orderBy: { id: 'asc' } });
    if (!existing) {
      return prisma.aboutContent.create({ data: data as Prisma.AboutContentCreateInput });
    }
    return prisma.aboutContent.update({ where: { id: existing.id }, data });
  },
};