import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.contactMessage.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.shopInfo.deleteMany();
  await prisma.homeContent.deleteMany();
  await prisma.aboutContent.deleteMany();

  // Categories (sequential to get IDs)
  const classicCat = await prisma.category.create({
    data: { name: 'Classic Pizzas', slug: 'classic', description: 'Timeless favorites with traditional toppings', sortOrder: 1, isActive: true },
  });
  const signatureCat = await prisma.category.create({
    data: { name: 'Signature Pizzas', slug: 'signature', description: 'Our chef\'s special creations', sortOrder: 2, isActive: true },
  });
  const vegCat = await prisma.category.create({
    data: { name: 'Veg Pizzas', slug: 'veg', description: 'Delicious vegetarian options', sortOrder: 3, isActive: true },
  });
  const sidesCat = await prisma.category.create({
    data: { name: 'Sides', slug: 'sides', description: 'Perfect accompaniments to your pizza', sortOrder: 4, isActive: true },
  });
  const drinksCat = await prisma.category.create({
    data: { name: 'Drinks', slug: 'drinks', description: 'Beverages to complement your meal', sortOrder: 5, isActive: true },
  });

  console.log(`✅ Created 5 categories`);

  // Menu Items (use actual category IDs)
  await prisma.menuItem.create({
    data: { name: 'Margherita', slug: 'margherita', categoryId: classicCat.id, description: 'Classic tomato sauce, fresh mozzarella, basil, and extra virgin olive oil', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', rating: 4.8, tags: JSON.stringify(['bestseller', 'vegetarian']), isVeg: true, sortOrder: 1 },
  });
  await prisma.menuItem.create({
    data: { name: 'Pepperoni', slug: 'pepperoni', categoryId: classicCat.id, description: 'Traditional pepperoni with mozzarella and our signature tomato sauce', price: 16.99, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', rating: 4.9, tags: JSON.stringify(['bestseller']), sortOrder: 2 },
  });
  await prisma.menuItem.create({
    data: { name: 'Hawaiian', slug: 'hawaiian', categoryId: classicCat.id, description: 'Ham, pineapple, mozzarella, and tomato sauce - a tropical favorite', price: 15.99, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', rating: 4.5, tags: JSON.stringify([]), sortOrder: 3 },
  });
  await prisma.menuItem.create({
    data: { name: 'Quattro Formaggi', slug: 'quattro-formaggi', categoryId: classicCat.id, description: 'Four cheese blend: mozzarella, gorgonzola, parmesan, and fontina', price: 17.99, imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', rating: 4.7, tags: JSON.stringify(['vegetarian']), isVeg: true, sortOrder: 4 },
  });

  await prisma.menuItem.create({
    data: { name: 'Truffle Mushroom', slug: 'truffle-mushroom', categoryId: signatureCat.id, description: 'Wild mushrooms, truffle oil, mozzarella, thyme, and garlic cream base', price: 22.99, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', rating: 4.9, tags: JSON.stringify(['new', 'bestseller', 'vegetarian']), isFeatured: true, isVeg: true, sortOrder: 1 },
  });
  await prisma.menuItem.create({
    data: { name: 'Diavola', slug: 'diavola', categoryId: signatureCat.id, description: 'Spicy salami, jalapeños, chili flakes, and hot honey drizzle', price: 18.99, imageUrl: 'https://images.unsplash.com/photo-1593560708920-6316e4e6d79e?w=400&h=300&fit=crop', rating: 4.8, tags: JSON.stringify(['spicy', 'bestseller']), isFeatured: true, spiceLevel: 'hot', sortOrder: 2 },
  });
  await prisma.menuItem.create({
    data: { name: 'Prosciutto e Rucola', slug: 'prosciutto-e-rucola', categoryId: signatureCat.id, description: 'Prosciutto di Parma, arugula, cherry tomatoes, parmesan shavings', price: 21.99, imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', rating: 4.9, tags: JSON.stringify(['new', 'bestseller']), isFeatured: true, sortOrder: 3 },
  });
  await prisma.menuItem.create({
    data: { name: 'BBQ Chicken', slug: 'bbq-chicken', categoryId: signatureCat.id, description: 'Grilled chicken, red onions, cilantro, BBQ sauce, and smoked gouda', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', rating: 4.7, tags: JSON.stringify(['bestseller']), isFeatured: true, sortOrder: 4 },
  });

  await prisma.menuItem.create({
    data: { name: 'Garden Veggie', slug: 'garden-veggie', categoryId: vegCat.id, description: 'Bell peppers, mushrooms, onions, olives, tomatoes, and fresh vegetables', price: 16.99, imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', rating: 4.6, tags: JSON.stringify(['vegetarian', 'vegan-option']), isVeg: true, sortOrder: 1 },
  });
  await prisma.menuItem.create({
    data: { name: 'Spinach & Ricotta', slug: 'spinach-ricotta', categoryId: vegCat.id, description: 'Fresh spinach, creamy ricotta, garlic, and mozzarella', price: 17.99, imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=300&fit=crop', rating: 4.7, tags: JSON.stringify(['vegetarian', 'new']), isVeg: true, sortOrder: 2 },
  });
  await prisma.menuItem.create({
    data: { name: 'Mediterranean', slug: 'mediterranean', categoryId: vegCat.id, description: 'Feta cheese, kalamata olives, sun-dried tomatoes, artichokes, and oregano', price: 18.99, imageUrl: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=400&h=300&fit=crop', rating: 4.8, tags: JSON.stringify(['vegetarian', 'bestseller']), isFeatured: true, isVeg: true, sortOrder: 3 },
  });

  await prisma.menuItem.create({
    data: { name: 'Garlic Bread', slug: 'garlic-bread', categoryId: sidesCat.id, description: 'Toasted bread with garlic butter, herbs, and parmesan', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop', rating: 4.7, tags: JSON.stringify(['vegetarian', 'bestseller']), isFeatured: true, isVeg: true, sortOrder: 1 },
  });
  await prisma.menuItem.create({
    data: { name: 'Caesar Salad', slug: 'caesar-salad', categoryId: sidesCat.id, description: 'Crisp romaine, parmesan, croutons, and classic Caesar dressing', price: 8.99, imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop', rating: 4.5, tags: JSON.stringify(['vegetarian']), isVeg: true, sortOrder: 2 },
  });
  await prisma.menuItem.create({
    data: { name: 'Mozzarella Sticks', slug: 'mozzarella-sticks', categoryId: sidesCat.id, description: 'Golden fried mozzarella with marinara sauce', price: 7.99, imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop', rating: 4.6, tags: JSON.stringify(['vegetarian', 'bestseller']), isFeatured: true, isVeg: true, sortOrder: 3 },
  });
  await prisma.menuItem.create({
    data: { name: 'Chicken Wings', slug: 'chicken-wings', categoryId: sidesCat.id, description: '6 pieces of crispy wings with your choice of sauce', price: 10.99, imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', rating: 4.8, tags: JSON.stringify(['bestseller', 'spicy-option']), isFeatured: true, sortOrder: 4 },
  });

  await prisma.menuItem.create({
    data: { name: 'Coca-Cola', slug: 'coca-cola', categoryId: drinksCat.id, description: 'Classic refreshing cola soft drink', price: 2.99, imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop', rating: 4.5, tags: JSON.stringify(['vegetarian', 'vegan']), isVeg: true, isVegan: true, sortOrder: 1 },
  });
  await prisma.menuItem.create({
    data: { name: 'Italian Lemonade', slug: 'italian-lemonade', categoryId: drinksCat.id, description: 'Fresh squeezed lemons with a hint of mint', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1621263765979-2fa9f7513697?w=400&h=300&fit=crop', rating: 4.7, tags: JSON.stringify(['vegetarian', 'vegan', 'fresh']), isVeg: true, isVegan: true, sortOrder: 2 },
  });
  await prisma.menuItem.create({
    data: { name: 'Iced Tea', slug: 'iced-tea', categoryId: drinksCat.id, description: 'Classic brewed iced tea, unsweetened or sweetened', price: 3.49, imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop', rating: 4.4, tags: JSON.stringify(['vegetarian', 'vegan']), isVeg: true, isVegan: true, sortOrder: 3 },
  });
  await prisma.menuItem.create({
    data: { name: 'Craft Beer', slug: 'craft-beer', categoryId: drinksCat.id, description: 'Local craft beer selection - ask for today\'s options', price: 6.99, imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop', rating: 4.6, tags: JSON.stringify(['alcoholic']), sortOrder: 4 },
  });

  console.log('✅ Created 19 menu items');

  // Promotions
  await prisma.promotion.create({
    data: { title: 'Family Feast Deal', discountText: 'Save $15', description: 'Get 2 large pizzas, garlic bread, and 4 drinks for a special price. Perfect for family dinner!', code: 'FAMILY15', validUntil: '2026-12-31', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', sortOrder: 1, isActive: true },
  });
  await prisma.promotion.create({
    data: { title: 'Tuesday Special', discountText: '25% OFF', description: 'Every Tuesday, enjoy 25% off all classic pizzas. Dine-in or pickup only.', validUntil: '2026-12-31', imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', sortOrder: 2, isActive: true },
  });
  await prisma.promotion.create({
    data: { title: 'Lunch Rush', discountText: '$12.99', description: 'Monday to Friday, 11am-3pm: Any personal pizza + drink + side for just $12.99', validUntil: '2026-12-31', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', sortOrder: 3, isActive: true },
  });
  console.log('✅ Created 3 promotions');

  // Testimonials
  await prisma.testimonial.create({
    data: { name: 'Sarah Johnson', role: 'Food Blogger', review: 'The best pizza I\'ve ever had! The crust is perfectly crispy, and the ingredients are so fresh. The Truffle Mushroom pizza is an absolute must-try.', rating: 5, isFeatured: true, sortOrder: 1, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  });
  await prisma.testimonial.create({
    data: { name: 'Michael Chen', role: 'Local Guide', review: 'Been coming here for years and the quality never disappoints. The staff is incredibly friendly and the atmosphere is perfect for family dinners.', rating: 5, isFeatured: true, sortOrder: 2, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  });
  await prisma.testimonial.create({
    data: { name: 'Emily Rodriguez', role: 'Pizza Enthusiast', review: 'Finally, an authentic Italian pizza experience in the city! The Diavola has the perfect amount of heat, and the hot honey drizzle is genius.', rating: 5, isFeatured: true, sortOrder: 3, avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  });
  await prisma.testimonial.create({
    data: { name: 'David Thompson', role: 'Restaurant Critic', review: 'A gem of a place. The attention to detail in every pizza is remarkable. From the dough to the sauce, everything is made with clear passion and expertise.', rating: 5, isFeatured: true, sortOrder: 4, avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  });
  console.log('✅ Created 4 testimonials');

  // Shop Info
  await prisma.shopInfo.create({
    data: {
      name: 'PB&J', tagline: 'Pizza, Burgers & Joy',
      phone: '+1 (555) 123-4567', email: 'hello@pbj.com',
      address: '123 Italian Way', city: 'San Francisco',
      state: 'CA', zipCode: '94102', country: 'United States',
      openingHours: JSON.stringify([
        { day: 'Monday', open: '11:00 AM', close: '10:00 PM' },
        { day: 'Tuesday', open: '11:00 AM', close: '10:00 PM' },
        { day: 'Wednesday', open: '11:00 AM', close: '10:00 PM' },
        { day: 'Thursday', open: '11:00 AM', close: '10:00 PM' },
        { day: 'Friday', open: '11:00 AM', close: '11:00 PM' },
        { day: 'Saturday', open: '11:00 AM', close: '11:00 PM' },
        { day: 'Sunday', open: '12:00 PM', close: '9:00 PM' },
      ]),
      socialLinks: JSON.stringify([
        { platform: 'Instagram', url: 'https://instagram.com/pbj', icon: 'instagram' },
        { platform: 'Facebook', url: 'https://facebook.com/pbj', icon: 'facebook' },
        { platform: 'Twitter', url: 'https://twitter.com/pbj', icon: 'twitter' },
      ]),
    },
  });
  console.log('✅ Created shop info');

  // Home Content
  await prisma.homeContent.create({
    data: {
      heroTitle: 'Taste the Joy at PB&J',
      heroSubtitle: 'Pizza, Burgers & Joy',
      heroCtaPrimaryText: 'View Full Menu',
      heroCtaPrimaryLink: '/menu',
      heroCtaSecondaryText: 'Book a Table',
      heroCtaSecondaryLink: '/contact',
      aboutHeadline: 'Why Choose PB&J',
      whyChooseUsTitle: 'Our Promise',
    },
  });
  console.log('✅ Created home content');

  // About Content
  await prisma.aboutContent.create({
    data: {
      title: 'About PB&J',
      subtitle: 'Our Story',
      storyText: 'PB&J was born from a dream to bring together authentic handcrafted pizza and juicy burgers. Founded with a passion for great food and joyful experiences, we have been serving our community since 2005.',
      missionText: 'Every pizza at PB&J is a labor of love. Our dough is made fresh daily using a 48-hour fermentation process. We import our San Marzano tomatoes directly from the volcanic slopes of Mount Vesuvius and use only the finest mozzarella di bufala.',
      valuesText: 'Our wood-fired oven, built by master craftsmen in Naples, reaches temperatures of up to 900°F, creating that perfect leopard-spotted crust that\'s crispy on the outside and soft and chewy on the inside.',
      chefName: 'Marco Rossi',
      chefTitle: 'Head Chef & Owner',
      chefBio: 'Born in Naples, Marco brings authentic Italian pizza-making traditions passed down through three generations.',
    },
  });
  console.log('✅ Created about content');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });