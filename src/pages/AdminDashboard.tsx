import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../api/admin';

interface DashboardData {
  menuItems: { count: number; recent: { id: number; name: string; price: number }[] };
  categories: { count: number; items: { id: number; name: string }[] };
  promotions: { count: number; items: { id: number; title: string; discountText: string }[] };
  testimonials: { count: number; items: { id: number; name: string; rating: number }[] };
  shopInfo: { exists: boolean; name?: string; email?: string };
  homeContent: { exists: boolean; heroTitle?: string | null };
  aboutContent: { exists: boolean; title?: string | null };
  contactMessages: { count: number };
}

export function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [menuItems, categories, promotions, testimonials, shop, messages] = await Promise.all([
          adminApi.getMenuItems(),
          adminApi.getCategories(),
          adminApi.getPromotions(),
          adminApi.getTestimonials(),
          adminApi.getShopInfo(),
          adminApi.getContactMessages(),
        ]);

        const items = menuItems as { id: number; name: string; price: number }[];
        const cats = categories as { id: number; name: string }[];
        const proms = promotions as { id: number; title: string; discountText: string }[];
        const testis = testimonials as { id: number; name: string; rating: number }[];
        const msgs = messages as unknown[];
        const shopInfo = shop as { name: string; email: string } | null;

        // Fetch home and about content too
        let homeContent = { exists: false, heroTitle: null as string | null };
        let aboutContent = { exists: false, title: null as string | null };
        try {
          const resp = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/home-content`);
          const result = await resp.json();
          if (result.success && result.data) {
            homeContent = { exists: true, heroTitle: result.data.heroTitle };
          }
        } catch {}
        try {
          const resp = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/about-content`);
          const result = await resp.json();
          if (result.success && result.data) {
            aboutContent = { exists: true, title: result.data.title };
          }
        } catch {}

        setData({
          menuItems: { count: items.length, recent: items.slice(0, 5) },
          categories: { count: cats.length, items: cats.slice(0, 5) },
          promotions: { count: proms.length, items: proms.slice(0, 5) },
          testimonials: { count: testis.length, items: testis.slice(0, 5) },
          shopInfo: { exists: !!shopInfo, name: shopInfo?.name, email: shopInfo?.email },
          homeContent,
          aboutContent,
          contactMessages: { count: msgs.length },
        });
      } catch (err) {
        console.error('Failed to load dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return (
    <div className="p-6 flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const sections = [
    {
      title: 'Menu Items',
      link: '/admin/menu-items',
      icon: '🍕',
      count: data?.menuItems.count,
      color: 'bg-red-500',
      preview: data?.menuItems.recent.map(i => `${i.name} ($${i.price.toFixed(2)})`).join(', '),
      emptyText: 'No menu items yet',
    },
    {
      title: 'Categories',
      link: '/admin/categories',
      icon: '📁',
      count: data?.categories.count,
      color: 'bg-blue-500',
      preview: data?.categories.items.map(i => i.name).join(', '),
      emptyText: 'No categories yet',
    },
    {
      title: 'Promotions',
      link: '/admin/promotions',
      icon: '🏷️',
      count: data?.promotions.count,
      color: 'bg-green-500',
      preview: data?.promotions.items.map(i => `${i.title} (${i.discountText})`).join(', '),
      emptyText: 'No promotions yet',
    },
    {
      title: 'Testimonials',
      link: '/admin/testimonials',
      icon: '⭐',
      count: data?.testimonials.count,
      color: 'bg-purple-500',
      preview: data?.testimonials.items.map(i => `${i.name} (${'⭐'.repeat(i.rating)})`).join(', '),
      emptyText: 'No testimonials yet',
    },
    {
      title: 'Shop Info',
      link: '/admin/shop-info',
      icon: '🏪',
      count: data?.shopInfo.exists ? 1 : 0,
      color: 'bg-yellow-500',
      preview: data?.shopInfo.exists ? `${data.shopInfo.name} · ${data.shopInfo.email}` : '',
      emptyText: 'No shop info set up',
    },
    {
      title: 'Home Content',
      link: '/admin/home-content',
      icon: '🏠',
      count: data?.homeContent.exists ? 1 : 0,
      color: 'bg-indigo-500',
      preview: data?.homeContent.exists ? `Hero: ${data.homeContent.heroTitle || 'Not set'}` : '',
      emptyText: 'No home content set up',
    },
    {
      title: 'About Content',
      link: '/admin/about-content',
      icon: '📄',
      count: data?.aboutContent.exists ? 1 : 0,
      color: 'bg-pink-500',
      preview: data?.aboutContent.exists ? `Title: ${data.aboutContent.title || 'Not set'}` : '',
      emptyText: 'No about content set up',
    },
    {
      title: 'Contact Messages',
      link: '/admin/contact-messages',
      icon: '✉️',
      count: data?.contactMessages.count,
      color: 'bg-amber-500',
      preview: null as string | null,
      emptyText: null as string | null,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <Link key={section.title} to={section.link} className="block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className={`${section.color} h-2`} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{section.icon}</span>
                  <span className="text-3xl font-bold text-gray-900">{section.count}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
                {section.preview ? (
                  <p className="text-xs text-gray-500 truncate">{section.preview}</p>
                ) : section.emptyText ? (
                  <p className="text-xs text-gray-400 italic">{section.emptyText}</p>
                ) : null}
                <div className="mt-3">
                  <span className="text-sm text-red-600 font-medium">
                    {section.count && section.count > 0 ? 'View →' : 'Add →'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}