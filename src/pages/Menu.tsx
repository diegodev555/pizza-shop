import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MenuCard } from '../components';
import { fetchMenuItems } from '../api/menu';
import { fetchCategories } from '../api/categories';
import type { MenuItem, Category } from '../types';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'name';

export const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  useEffect(() => {
    async function load() {
      try {
        const [menuItems, cats] = await Promise.all([
          fetchMenuItems(),
          fetchCategories(),
        ]);
        setItems(menuItems);
        setCategories(cats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load menu');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...items];

    if (activeCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [items, activeCategory, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="text-white bg-red-600 px-6 py-2 rounded-full">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-400 font-semibold uppercase tracking-wider text-sm mb-2">
              Our Menu
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover Our Flavors
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              From classic favorites to signature creations, explore our
              handcrafted selection of pizzas, sides, and drinks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16 px-4 bg-cream">
        <div className="container mx-auto">
          {/* Search and Filter Bar */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Box */}
              <div className="relative w-full lg:w-96">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search pizzas, ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-4">
                <label className="text-gray-700 font-semibold whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-12 overflow-x-auto pb-4">
            <div className="flex space-x-4 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredAndSortedItems.length}</span> items
              {activeCategory !== 'all' && (
                <span> in <span className="font-semibold text-red-600">{categories.find(c => c.id === activeCategory)?.name}</span></span>
              )}
              {searchQuery && (
                <span> matching "<span className="font-semibold text-red-600">{searchQuery}</span>"</span>
              )}
            </p>
          </div>

          {/* Menu Grid */}
          {filteredAndSortedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No items found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-6 text-red-600 font-semibold hover:text-red-700"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};