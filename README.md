# Bella Napoli Pizzeria

A modern, responsive pizza shop website built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Modern Design**: Premium pizza restaurant aesthetic with warm, inviting colors
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Menu**: Filter by category, search by name/ingredients, and sort by price or popularity
- **Smooth Animations**: Subtle animations powered by Framer Motion
- **Type-Safe**: Full TypeScript support with proper type definitions
- **Data-Driven**: All content stored in static data files for easy updates

## Pages

1. **Home** - Hero section, featured pizzas, why choose us, special offers, testimonials, location preview
2. **Menu** - Full menu with category filtering, search, and sorting
3. **About** - Restaurant story, quality ingredients, team members, values
4. **Contact** - Contact form, location info, opening hours, FAQ

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Framer Motion** - Animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd pizza-shop

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── MenuCard.tsx
│   ├── SectionHeading.tsx
│   └── index.ts
├── data/            # Static data files
│   ├── categories.ts
│   ├── menuItems.ts
│   ├── promotions.ts
│   ├── shopInfo.ts
│   ├── testimonials.ts
│   └── index.ts
├── pages/           # Page components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   ├── Menu.tsx
│   └── index.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Customization

### Updating Menu Items

Edit `src/data/menuItems.ts` to add, remove, or modify menu items.

### Changing Shop Information

Update `src/data/shopInfo.ts` with your restaurant's details.

### Modifying Colors

The color scheme is defined in `src/index.css` using CSS custom properties:

```css
:root {
  --color-primary: #c53d43;
  --color-primary-dark: #8b1e24;
  --color-secondary: #f4a261;
  --color-accent: #e76f51;
  /* ... more colors */
}
```

## Future Enhancements

- Shopping cart functionality
- Online ordering system
- User authentication
- Payment integration
- Backend API integration
- Admin dashboard

## License

This project is for demonstration purposes.

## Credits

- Images from Unsplash
- Icons from Heroicons (inline SVG)
- Fonts: Inter & Playfair Display from Google Fonts