import { motion } from 'framer-motion';

interface TagBadgeProps {
  tag: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tagStyles: Record<string, { bg: string; text: string; icon: string }> = {
  bestseller: {
    bg: 'bg-amber-500/15 border-amber-400/20',
    text: 'text-amber-300',
    icon: '⭐',
  },
  'new': {
    bg: 'bg-blue-500/15 border-blue-400/20',
    text: 'text-blue-300',
    icon: '✨',
  },
  spicy: {
    bg: 'bg-orange-500/15 border-orange-400/20',
    text: 'text-orange-300',
    icon: '🌶️',
  },
  'spicy-option': {
    bg: 'bg-orange-500/15 border-orange-400/20',
    text: 'text-orange-300',
    icon: '🌶️',
  },
  vegetarian: {
    bg: 'bg-green-500/15 border-green-400/20',
    text: 'text-green-300',
    icon: '🥬',
  },
  vegan: {
    bg: 'bg-emerald-500/15 border-emerald-400/20',
    text: 'text-emerald-300',
    icon: '🌱',
  },
  'vegan-option': {
    bg: 'bg-emerald-500/15 border-emerald-400/20',
    text: 'text-emerald-300',
    icon: '🌱',
  },
  'fresh': {
    bg: 'bg-teal-500/15 border-teal-400/20',
    text: 'text-teal-300',
    icon: '🍃',
  },
  alcoholic: {
    bg: 'bg-purple-500/15 border-purple-400/20',
    text: 'text-purple-300',
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
    bg: 'bg-white/8 border-white/15',
    text: 'text-white/70',
    icon: '•',
  };
  const sizeClass = sizes[size];

  return (
    <motion.span
      className={`inline-flex items-center gap-1 font-semibold rounded-full backdrop-blur-md border ${style.bg} ${style.text} ${sizeClass} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <span className="text-xs">{style.icon}</span>
      {formatTag(tag)}
    </motion.span>
  );
};