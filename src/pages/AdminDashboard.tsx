import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../api/admin';

interface DashboardStats {
  menuItems: number;
  categories: number;
  promotions: number;
  testimonials: number;
  contactMessages: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ menuItems: 0, categories: 0, promotions: 0, testimonials: 0, contactMessages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [menuItems, categories, promotions, testimonials, messages] = await Promise.all([
          adminApi.getMenuItems(),
          adminApi.getCategories(),
          adminApi.getPromotions(),
          adminApi.getTestimonials(),
          adminApi.getContactMessages(),
        ]);
        setStats({
          menuItems: (menuItems as unknown[]).length,
          categories: categories.length,
          promotions: promotions.length,
          testimonials: testimonials.length,
          contactMessages: (messages as unknown[]).length,
        });
      } catch (err) {
        console.error('Failed to load dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    { label: 'Menu Items', count: stats.menuItems, link: '/admin/menu-items', color: 'bg-red-500' },
    { label: 'Categories', count: stats.categories, link: '/admin/categories', color: 'bg-blue-500' },
    { label: 'Promotions', count: stats.promotions, link: '/admin/promotions', color: 'bg-green-500' },
    { label: 'Testimonials', count: stats.testimonials, link: '/admin/testimonials', color: 'bg-purple-500' },
    { label: 'Contact Messages', count: stats.contactMessages, link: '/admin/contact-messages', color: 'bg-amber-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((card) => (
            <Link key={card.label} to={card.link} className="block">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${card.color} h-2`} />
                <div className="p-6">
                  <p className="text-4xl font-bold text-gray-900 mb-2">{card.count}</p>
                  <p className="text-gray-600 font-medium">{card.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/admin/menu-items" className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl">🍕</span>
            <div>
              <p className="font-semibold text-gray-900">Manage Menu Items</p>
              <p className="text-sm text-gray-600">Add, edit, or remove menu items</p>
            </div>
          </Link>
          <Link to="/admin/categories" className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl">📁</span>
            <div>
              <p className="font-semibold text-gray-900">Manage Categories</p>
              <p className="text-sm text-gray-600">Organize your menu categories</p>
            </div>
          </Link>
          <Link to="/admin/promotions" className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl">🏷️</span>
            <div>
              <p className="font-semibold text-gray-900">Manage Promotions</p>
              <p className="text-sm text-gray-600">Create and edit special offers</p>
            </div>
          </Link>
          <Link to="/admin/testimonials" className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="font-semibold text-gray-900">Manage Testimonials</p>
              <p className="text-sm text-gray-600">Update customer reviews</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}