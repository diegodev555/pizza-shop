import type { ShopInfo, NavItem, TeamMember } from '../types';

export const shopInfo: ShopInfo = {
  name: 'Bella Napoli Pizzeria',
  phone: '+1 (555) 123-4567',
  email: 'hello@bellanapoli.com',
  address: {
    street: '123 Italian Way',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'United States',
  },
  hours: [
    { day: 'Monday', open: '11:00 AM', close: '10:00 PM' },
    { day: 'Tuesday', open: '11:00 AM', close: '10:00 PM' },
    { day: 'Wednesday', open: '11:00 AM', close: '10:00 PM' },
    { day: 'Thursday', open: '11:00 AM', close: '10:00 PM' },
    { day: 'Friday', open: '11:00 AM', close: '11:00 PM' },
    { day: 'Saturday', open: '11:00 AM', close: '11:00 PM' },
    { day: 'Sunday', open: '12:00 PM', close: '9:00 PM' },
  ],
  socialLinks: [
    { platform: 'Instagram', url: 'https://instagram.com/bellanapoli', icon: 'instagram' },
    { platform: 'Facebook', url: 'https://facebook.com/bellanapoli', icon: 'facebook' },
    { platform: 'Twitter', url: 'https://twitter.com/bellanapoli', icon: 'twitter' },
  ],
  coordinates: {
    lat: 37.7749,
    lng: -122.4194,
  },
};

export const navigationItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Marco Rossi',
    role: 'Head Chef & Owner',
    bio: 'Born in Naples, Marco brings authentic Italian pizza-making traditions passed down through three generations. With over 20 years of experience, he crafts each pizza with passion and precision.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/chefmarco' },
    ],
  },
  {
    id: 2,
    name: 'Sofia Bianchi',
    role: 'Pastry Chef',
    bio: 'Sofia\'s expertise in Italian desserts complements our pizza menu perfectly. Her tiramisu and cannoli are made from her grandmother\'s secret recipes.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/sofiabakes' },
    ],
  },
  {
    id: 3,
    name: 'Antonio Marino',
    role: 'Restaurant Manager',
    bio: 'Antonio ensures every guest has an exceptional dining experience. His warm personality and attention to detail make Bella Napoli feel like home.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    socialLinks: [],
  },
];