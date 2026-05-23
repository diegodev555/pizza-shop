import { motion } from 'framer-motion';
import type { MenuItem } from '../types';
import { Badge } from './Badge';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const getTagVariant = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'new':
        return 'new';
      case 'spicy':
      case 'spicy-option':
        return 'spicy';
      case 'bestseller':
        return 'warning';
      case 'vegetarian':
      case 'vegan':
      case 'vegan-option':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatTag = (tag: string) => {
    return tag
      .replace('-', ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-300"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant={getTagVariant(tag)}
                size="sm"
                className="shadow-sm"
              >
                {formatTag(tag)}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">
              {item.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-red-600">
            ${item.price.toFixed(2)}
          </span>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-3 flex items-center space-x-3 text-xs text-gray-500">
          {item.calories && (
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-.5 2.9-4.3C13.6 3.6 16 6 16 6s2 2 2 5c0 1.5-.5 2.5-1.5 3.5"
                />
              </svg>
              {item.calories} cal
            </span>
          )}
          {item.isVegetarian && (
            <span className="text-green-600 font-semibold">Veg</span>
          )}
          {item.isVegan && (
            <span className="text-green-600 font-semibold">Vegan</span>
          )}
          {item.spiceLevel && (
            <span className="text-orange-600 font-semibold capitalize">
              {item.spiceLevel}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};