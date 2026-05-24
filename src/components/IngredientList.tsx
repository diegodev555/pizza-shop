import { motion } from 'framer-motion';

interface IngredientListProps {
  ingredients: string[];
  className?: string;
}

export const IngredientList = ({ ingredients, className = '' }: IngredientListProps) => {
  return (
    <div className={className}>
      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Ingredients
      </h4>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <motion.span
            key={ingredient}
            className="inline-flex items-center px-3 py-1.5 bg-cream rounded-full text-sm text-gray-700 border border-gray-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 15 }}
            whileHover={{ scale: 1.05, backgroundColor: '#fef3e2' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
            {ingredient}
          </motion.span>
        ))}
      </div>
    </div>
  );
};