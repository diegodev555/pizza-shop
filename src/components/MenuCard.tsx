import { motion } from 'framer-motion';
import type { MenuItem } from '../types';
import { Badge } from './Badge';
import { RatingStars } from './RatingStars';
import { TagBadge } from './TagBadge';

interface MenuCardProps {
  item: MenuItem;
  onSelect?: (item: MenuItem) => void;
}

export const MenuCard = ({ item, onSelect }: MenuCardProps) => {
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
      className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-300 cursor-pointer group"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onSelect?.(item)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(item);
        }
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5 }}
        />
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.span
            className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Quick View
          </motion.span>
        </div>
        {item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
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
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
            {item.name}
          </h3>
          <RatingStars rating={item.rating} size="sm" showValue />
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-red-600">
            ${item.price.toFixed(2)}
          </span>
          <motion.button
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(item);
            }}
          >
            View Details
          </motion.button>
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

        {/* Quick ingredient preview */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {item.ingredients.slice(0, 3).map((ing) => (
                <span
                  key={ing}
                  className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full"
                >
                  {ing}
                </span>
              ))}
              {item.ingredients.length > 3 && (
                <span className="text-xs text-red-500 font-medium">
                  +{item.ingredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};