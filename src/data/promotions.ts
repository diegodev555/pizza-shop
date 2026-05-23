import type { Promotion } from '../types';

export const promotions: Promotion[] = [
  {
    id: 1,
    title: 'Family Feast Deal',
    description: 'Get 2 large pizzas, garlic bread, and 4 drinks for a special price. Perfect for family dinner!',
    discountText: 'Save $15',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    validUntil: '2026-12-31',
    code: 'FAMILY15',
  },
  {
    id: 2,
    title: 'Tuesday Special',
    description: 'Every Tuesday, enjoy 25% off all classic pizzas. Dine-in or pickup only.',
    discountText: '25% OFF',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    validUntil: '2026-12-31',
  },
  {
    id: 3,
    title: 'Lunch Rush',
    description: 'Monday to Friday, 11am-3pm: Any personal pizza + drink + side for just $12.99',
    discountText: '$12.99',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    validUntil: '2026-12-31',
  },
];