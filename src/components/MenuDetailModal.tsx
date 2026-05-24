import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MenuItem } from '../types';
import { RatingStars } from './RatingStars';
import { TagBadge } from './TagBadge';
import { IngredientList } from './IngredientList';

interface MenuDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 25,
      mass: 1.2,
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
      duration: 0.25,
    },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 200, damping: 25 },
  },
};

const floatingParticle = (delay: number) => ({
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: [0, 0.6, 0],
    scale: [0, 1, 0.5],
    y: [0, -30, -60],
    x: [0, Math.random() > 0.5 ? 15 : -15, Math.random() > 0.5 ? 30 : -30],
    transition: {
      duration: 4 + Math.random() * 3,
      repeat: Infinity,
      delay,
      ease: 'easeOut' as const,
    },
  },
});

// Static pairs well suggestions
const pairsWellSuggestions = [
  { name: 'Garlic Bread', icon: '🥖' },
  { name: 'Caesar Salad', icon: '🥗' },
  { name: 'Italian Lemonade', icon: '🍋' },
  { name: 'Craft Beer', icon: '🍺' },
];

export const MenuDetailModal = ({ item, isOpen, onClose }: MenuDetailModalProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const parallaxX = useTransform(springX, [0, 1], [0.975, 1.025]);
  const parallaxY = useTransform(springY, [0, 1], [0.975, 1.025]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  if (!item) return null;

  const bgImage = item.backgroundImage || item.image;
  const herbs = ['🌿', '🌱', '🫘', '🧄'];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100]"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5 }}
          onMouseMove={handleMouseMove}
        >
          {/* Fullscreen Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Cinematic zoom container */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Main image with parallax */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${bgImage})`,
                  scaleX: parallaxX,
                  scaleY: parallaxY,
                }}
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>

            {/* Layered overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />

            {/* Vignette effect */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
            }} />

            {/* Subtle ambient light glow */}
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-red-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-[100px]" />

            {/* Floating herbs/particles (subtle) */}
            {imageLoaded && herbs.map((herb, i) => (
              <motion.span
                key={i}
                className="absolute text-lg md:text-xl opacity-0 pointer-events-none"
                style={{
                  left: `${15 + i * 22}%`,
                  top: `${25 + (i % 2) * 40}%`,
                }}
                variants={floatingParticle(i * 0.8)}
                initial="hidden"
                animate="visible"
              >
                {herb}
              </motion.span>
            ))}
          </div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="fixed top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close detail view"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 15 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Back button */}
          <motion.button
            onClick={onClose}
            className="fixed top-6 left-6 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Back to menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Menu
          </motion.button>

          {/* Content Panel - Floating glassmorphism */}
          <motion.div
            className="relative z-10 w-full h-full flex items-end sm:items-center justify-start p-6 sm:p-10 md:p-16 lg:p-20"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Glass card */}
            <motion.div
              className="w-full max-w-lg xl:max-w-xl backdrop-blur-xl bg-white/[0.07] rounded-3xl border border-white/[0.12] shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <div className="p-6 sm:p-8 md:p-10 space-y-5 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                {/* Tags */}
                {item.tags.length > 0 && (
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={contentItemVariants}
                  >
                    {item.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} size="md" />
                    ))}
                  </motion.div>
                )}

                {/* Item Name */}
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight"
                  variants={contentItemVariants}
                  style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
                >
                  {item.name}
                </motion.h2>

                {/* Price & Rating */}
                <motion.div
                  className="flex items-center gap-5 flex-wrap"
                  variants={contentItemVariants}
                >
                  <span className="text-3xl sm:text-4xl font-bold text-red-400" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={item.rating} size="md" />
                    <span className="text-white/70 text-sm font-medium">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
                  variants={contentItemVariants}
                />

                {/* Description */}
                <motion.p
                  className="text-base sm:text-lg text-white/80 leading-relaxed font-light"
                  variants={contentItemVariants}
                >
                  {item.description}
                </motion.p>

                {/* Info Chips */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={contentItemVariants}
                >
                  {item.prepTime && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs sm:text-sm font-medium border border-white/10">
                      ⏱️ {item.prepTime} min
                    </span>
                  )}
                  {item.calories && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs sm:text-sm font-medium border border-white/10">
                      🔥 {item.calories} cal
                    </span>
                  )}
                  {item.crustType && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs sm:text-sm font-medium border border-white/10">
                      🍕 {item.crustType}
                    </span>
                  )}
                  {item.spiceLevel && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs sm:text-sm font-medium border border-white/10">
                      🌶️ {item.spiceLevel}
                    </span>
                  )}
                </motion.div>

                {/* Ingredients */}
                {item.ingredients && item.ingredients.length > 0 && (
                  <motion.div variants={contentItemVariants}>
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-3">
                      Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.map((ingredient, index) => (
                        <motion.span
                          key={ingredient}
                          className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm text-white/80 text-sm border border-white/10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2 flex-shrink-0" />
                          {ingredient}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Chef's Note / Quote */}
                <motion.div
                  className="relative pl-5 border-l-2 border-red-500/50"
                  variants={contentItemVariants}
                >
                  <p className="text-sm text-white/60 italic font-light">
                    "Our chef's carefully crafted recipe — best enjoyed hot and shared with the ones you love."
                  </p>
                  <p className="text-xs text-white/40 mt-1 font-medium tracking-wider uppercase">
                    — Chef Recommendation
                  </p>
                </motion.div>

                {/* Pairs Well With */}
                <motion.div variants={contentItemVariants}>
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-3">
                    Pairs Well With
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pairsWellSuggestions.map((pair, i) => (
                      <motion.div
                        key={pair.name}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.08 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.12)', x: 3 }}
                      >
                        <span className="text-lg">{pair.icon}</span>
                        <span className="text-sm text-white/70 font-medium">{pair.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Allergens */}
                {item.allergens && item.allergens.length > 0 && (
                  <motion.div variants={contentItemVariants}>
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-[0.15em] mb-2">
                      Allergens
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.allergens.map((allergen) => (
                        <span
                          key={allergen}
                          className="px-2 py-1 rounded-md bg-red-500/10 text-red-300 text-xs font-medium border border-red-500/20"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Nutrition footer */}
                {item.nutritionInfo && (
                  <motion.div
                    className="pt-4 border-t border-white/10"
                    variants={contentItemVariants}
                  >
                    <div className="grid grid-cols-5 gap-2 text-center">
                      {Object.entries(item.nutritionInfo).map(([key, value]) => {
                        if (!value) return null;
                        return (
                          <div key={key} className="px-1">
                            <p className="text-xs text-white/40 capitalize font-medium">{key}</p>
                            <p className="text-xs text-white/60 font-semibold mt-0.5">{value}</p>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-white/30 text-center mt-3 tracking-wider">
                      * Nutritional values are approximate
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};