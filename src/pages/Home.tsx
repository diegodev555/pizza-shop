import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeading, Button, MenuCard, Logo } from '../components';
import { fetchFeaturedItems } from '../api/menu';
import { fetchPromotions } from '../api/promotions';
import { fetchTestimonials } from '../api/testimonials';
import { fetchShopInfo, fetchHomeContent } from '../api/shop';
import type { MenuItem, Promotion, Testimonial, ShopInfo, HomeContentData } from '../types';
import { SHOP_NAME, SHOP_TAGLINE } from '../data/shopInfo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export const Home = () => {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [homeContent, setHomeContent] = useState<HomeContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [featured, promos, reviews, shop, home] = await Promise.all([
          fetchFeaturedItems(),
          fetchPromotions(),
          fetchTestimonials(),
          fetchShopInfo(),
          fetchHomeContent(),
        ]);
        setFeaturedItems(featured);
        setPromotions(promos);
        setTestimonials(reviews);
        setShopInfo(shop);
        setHomeContent(home);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
          <Logo size="md" showAnimation />
          <p className="text-white/60 mt-4">Loading {SHOP_NAME}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="glass-btn-primary px-6 py-2 rounded-full">Retry</button>
        </div>
      </div>
    );
  }

  const heroBg = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=80';

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full glass overlay */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Ambient glow blobs behind hero content */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Hero Logo */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Logo size="xl" showAnimation showGlow />
          </motion.div>

          <motion.p
            className="text-red-400 font-semibold uppercase tracking-[0.2em] text-sm md:text-base mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {homeContent?.heroSubtitle || SHOP_TAGLINE}
          </motion.p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {homeContent?.heroTitle || 'Taste the Joy at '}
            {(!homeContent?.heroTitle || homeContent.heroTitle.includes('Joy')) && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300">{SHOP_NAME}</span>
            )}
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
            Handcrafted pizzas, juicy burgers, and joyful food experiences crafted with the finest ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={homeContent?.heroCtaPrimaryLink || '/menu'}>
              <Button size="lg">{homeContent?.heroCtaPrimaryText || 'View Full Menu'}</Button>
            </Link>
            <Link to={homeContent?.heroCtaSecondaryLink || '/contact'}>
              <Button variant="outline" size="lg">{homeContent?.heroCtaSecondaryText || 'Book a Table'}</Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="glass w-8 h-12 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Featured Pizzas Section */}
      {featuredItems.length > 0 && (
        <section className="py-24 px-4 section-glass">
          <div className="container mx-auto">
            <SectionHeading title="Our Famous Pizzas" subtitle="Customer Favorites" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.slice(0, 6).map((pizza, i) => (
                <motion.div
                  key={pizza.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <MenuCard item={pizza} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/menu">
                <Button variant="outline" size="lg">View Full Menu</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 section-glass-alt">
        <div className="container mx-auto">
          <SectionHeading title={homeContent?.aboutHeadline || `Why Choose ${SHOP_NAME}`} subtitle={homeContent?.whyChooseUsTitle || 'Our Promise'} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '📖', title: 'Authentic Recipes', description: 'Traditional Neapolitan recipes passed down through generations.' },
              { icon: '🥗', title: 'Fresh Ingredients', description: 'Locally sourced produce and imported Italian specialties.' },
              { icon: '🔥', title: 'Wood-Fired Oven', description: 'Traditional wood-fired oven for that perfect crispy crust.' },
              { icon: '👨‍👩‍👧‍👦', title: 'Family Atmosphere', description: 'Warm, welcoming environment perfect for family gatherings.' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 text-center"
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-3xl bg-red-500/10 border border-red-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white/90 mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      {promotions.length > 0 && (
        <section className="py-24 px-4 section-glass">
          <div className="container mx-auto">
            <SectionHeading title="Special Offers" subtitle="Limited Time Deals" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {promotions.map((promo, index) => (
                <motion.div
                  key={promo.id}
                  className="glass-card overflow-hidden"
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={promo.image} alt={promo.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <div className="glass-chip text-red-300 border-red-500/20 bg-red-500/10 mb-3 inline-flex">
                      {promo.discountText}
                    </div>
                    <h3 className="text-xl font-bold text-white/90 mb-2">{promo.title}</h3>
                    <p className="text-white/60 mb-4">{promo.description}</p>
                    {promo.code && (
                      <div className="glass rounded-lg p-3 text-center">
                        <p className="text-xs text-white/50 mb-1">Use Code</p>
                        <p className="text-lg font-bold text-red-400">{promo.code}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-24 px-4 section-glass-alt">
          <div className="container mx-auto">
            <SectionHeading title="What Our Customers Say" subtitle="Reviews" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="glass-card p-6"
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/70 mb-4 italic leading-relaxed">"{testimonial.review}"</p>
                  <div className="flex items-center">
                    {testimonial.avatar && (
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-3 ring-2 ring-white/20" />
                    )}
                    <div>
                      <p className="font-semibold text-white/90">{testimonial.name}</p>
                      <p className="text-sm text-white/50">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location Preview Section */}
      {shopInfo && (
        <section className="py-24 px-4 section-glass">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeading title="Visit Us" subtitle="Location & Hours" centered={false} />
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white/90 mb-1">Address</h3>
                      <p className="text-white/60">
                        {shopInfo.address.street}<br />
                        {shopInfo.address.city}, {shopInfo.address.state} {shopInfo.address.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white/90 mb-1">Hours</h3>
                      {shopInfo.hours.slice(0, 3).map((h) => (
                        <p key={h.day} className="text-white/60">{h.day}: {h.open} - {h.close}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white/90 mb-1">Contact</h3>
                      <p className="text-white/60">{shopInfo.phone}<br />{shopInfo.email}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/contact"><Button>Get Directions</Button></Link>
                </div>
              </motion.div>
              <motion.div
                className="h-96 rounded-3xl overflow-hidden shadow-2xl glass-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-full h-full"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Glass gradient */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            className="glass-card p-12 md:p-16 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Order?</h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto font-light">
              Get your favorite food delivered hot and fresh to your doorstep.
              Order now and experience the joy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button size="lg">Order Online</Button>
              </Link>
              {shopInfo && (
                <a href={`tel:${shopInfo.phone.replace(/\D/g, '')}`}>
                  <Button variant="outline" size="lg">Call to Order</Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};