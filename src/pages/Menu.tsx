import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MenuCard, MenuDetailModal } from '../components';
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
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectItem = useCallback((item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing the item so the exit animation plays
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

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
          <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="glass-btn-primary px-6 py-2 rounded-full">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-red-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-amber-500/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-400 font-semibold uppercase tracking-[0.2em] text-sm mb-2">
              Our Menu
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover Our Flavors
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
              From classic favorites to signature creations, explore our
              handcrafted selection of pizzas, sides, and drinks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Search and Filter Bar */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Box */}
              <div className="relative w-full lg:w-96">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
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
                  className="w-full pl-12 pr-4 py-3 rounded-full glass-input"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-4">
                <label className="text-white/60 font-semibold whitespace-nowrap text-sm">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="glass-input px-5 py-3 rounded-full cursor-pointer appearance-none pr-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.4)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px',
                  }}
                >
                  <option value="popular" className="bg-gray-900 text-white">Most Popular</option>
                  <option value="price-low" className="bg-gray-900 text-white">Price: Low to High</option>
                  <option value="price-high" className="bg-gray-900 text-white">Price: High to Low</option>
                  <option value="name" className="bg-gray-900 text-white">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-12 overflow-x-auto pb-4">
            <div className="flex space-x-3 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap text-sm ${
                    activeCategory === category.id
                      ? 'glass-btn-primary shadow-lg shadow-red-500/20'
                      : 'glass-chip hover:bg-white/12'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-white/50 text-sm">
              Showing <span className="font-semibold text-white/80">{filteredAndSortedItems.length}</span> items
              {activeCategory !== 'all' && (
                <span> in <span className="font-semibold text-red-400">{categories.find(c => c.id === activeCategory)?.name}</span></span>
              )}
              {searchQuery && (
                <span> matching "<span className="font-semibold text-red-400">{searchQuery}</span>"</span>
              )}
            </p>
          </div>

          {/* Menu Grid */}
          {filteredAndSortedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedItems.map((item) => (
                <MenuCard key={item.id} item={item} onSelect={handleSelectItem} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card text-center py-20 px-8 max-w-lg mx-auto"
            >
              <svg
                className="w-20 h-20 mx-auto text-white/20 mb-6"
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
              <h3 className="text-2xl font-bold text-white/80 mb-2">
                No items found
              </h3>
              <p className="text-white/50">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-6 text-red-400 font-semibold hover:text-red-300 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <MenuDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};