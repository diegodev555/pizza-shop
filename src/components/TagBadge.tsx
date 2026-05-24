import { motion } from 'framer-motion';

interface TagBadgeProps {
  tag: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tagStyles: Record<string, { bg: string; text: string; icon: string }> = {
  bestseller: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    icon: '⭐',
  },
  'new': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: '✨',
  },
  spicy: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    icon: '🌶️',
  },
  'spicy-option': {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    icon: '🌶️',
  },
  vegetarian: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: '🥬',
  },
  vegan: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    icon: '🌱',
  },
  'vegan-option': {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    icon: '🌱',
  },
  'fresh': {
    bg: 'bg-teal-100',
    text: 'text-teal-800',
    icon: '🍃',
  },
  alcoholic: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    icon: '🍺',
  },
};

const sizes: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

function formatTag(tag: string): string {
  return tag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export const TagBadge = ({ tag, size = 'sm', className = '' }: TagBadgeProps) => {
  const lowerTag = tag.toLowerCase();
  const style = tagStyles[lowerTag] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    icon: '•',
  };
  const sizeClass = sizes[size];

  return (
    <motion.span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${style.bg} ${style.text} ${sizeClass} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <span className="text-xs">{style.icon}</span>
      {formatTag(tag)}
    </motion.span>
  );
};