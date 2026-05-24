import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Button, Logo } from '../components';
import { fetchAboutContent } from '../api/shop';
import { Link } from 'react-router-dom';
import type { AboutContentData } from '../types';
import { SHOP_NAME } from '../data/shopInfo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export const About = () => {
  const [content, setContent] = useState<AboutContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAboutContent();
        setContent(data);
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
      <div className="min-h-screen pt-20 flex items-center justify-center">
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
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-red-400 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-red-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-400 font-semibold uppercase tracking-[0.2em] text-sm mb-2">
              Our Story
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {content?.title || `About ${SHOP_NAME}`}
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
              {content?.subtitle || 'A passion for great food, crafted with love and tradition since 2005.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-4 section-glass">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Our Story"
                subtitle="Tradition & Passion"
                centered={false}
              />
              <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                {content?.storyText ? (
                  content.storyText.split('\n').map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <>
                    <p>
                      {SHOP_NAME} was born from a dream to bring together the best of two
                      worlds — authentic, handcrafted pizza and juicy, mouthwatering burgers.
                      Founded with a passion for great food and joyful experiences, we've been
                      serving our community since 2005.
                    </p>
                    <p>
                      Every pizza at {SHOP_NAME} is a labor of love. Our dough is
                      made fresh daily using a 48-hour fermentation process. We import our
                      San Marzano tomatoes directly from the volcanic slopes of Mount Vesuvius
                      and use only the finest mozzarella di bufala. Our burgers are crafted
                      from premium cuts, ground fresh daily.
                    </p>
                    <p>
                      Our wood-fired oven, built by master craftsmen in Naples,
                      reaches temperatures of up to 900°F, creating that perfect
                      leopard-spotted crust that's crispy on the outside and soft
                      and chewy on the inside.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl glass-card p-1">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80"
                  alt="Chef making pizza"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card px-6 py-4">
                <p className="text-3xl font-bold text-white">19+</p>
                <p className="text-sm text-white/60">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Ingredients Section */}
      <section className="py-24 px-4 section-glass-alt">
        <div className="container mx-auto">
          <SectionHeading
            title="Quality Ingredients"
            subtitle={`The ${SHOP_NAME} Difference`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🍅',
                title: 'San Marzano Tomatoes',
                description: 'DOP-certified tomatoes from the volcanic soil of Mount Vesuvius for the perfect sauce.',
              },
              {
                icon: '🧀',
                title: 'Mozzarella di Bufala',
                description: 'Creamy, fresh buffalo mozzarella imported from Campania, Italy.',
              },
              {
                icon: '🌾',
                title: '00 Flour',
                description: 'Finely milled Italian flour for that authentic Neapolitan crust texture.',
              },
              {
                icon: '🔥',
                title: 'Wood-Fired Perfection',
                description: 'Traditional wood-fired oven at 900°F for authentic leopard-spotted crust.',
              },
            ].map((item, index) => (
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
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white/90 mb-3">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-24 px-4 section-glass">
        <div className="container mx-auto">
          <SectionHeading title="Meet Our Team" subtitle="The People Behind the Food" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1, name: 'Marco Rossi',
                role: 'Head Chef & Owner',
                bio: content?.chefBio || 'Born in Naples, Marco brings authentic Italian pizza-making traditions passed down through three generations.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
              },
              {
                id: 2, name: 'Sofia Bianchi',
                role: 'Pastry Chef',
                bio: "Sofia's expertise in Italian desserts complements our menu perfectly. Her tiramisu and cannoli are made from her grandmother's secret recipes.",
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
              },
              {
                id: 3, name: 'Antonio Marino',
                role: 'Restaurant Manager',
                bio: `Antonio ensures every guest has an exceptional dining experience. His warm personality and attention to detail make ${SHOP_NAME} feel like home.`,
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
              },
            ].map((member, index) => (
              <motion.div
                key={member.id}
                className="glass-card overflow-hidden"
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white/90 mb-1">{member.name}</h3>
                  <p className="text-red-400 font-semibold text-sm mb-4">{member.role}</p>
                  <p className="text-white/60 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 section-glass-alt">
        <div className="container mx-auto">
          <SectionHeading title="Our Values" subtitle="What Drives Us" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Authenticity',
                description: 'We stay true to traditional recipes and techniques, using time-honored methods passed down through generations.',
              },
              {
                title: 'Quality',
                description: 'We never compromise on ingredients. Every component of our food is carefully selected for the finest quality.',
              },
              {
                title: 'Community',
                description: 'We believe in bringing people together. Our restaurant is a place where families and friends create memories.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 text-center"
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-red-500/30 to-red-600/20 border border-red-500/20">
                  <span className="text-white font-bold text-2xl drop-shadow-[0_0_8px_rgba(197,61,67,0.3)]">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-white/90 mb-4">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            className="glass-card p-12 md:p-16 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Come Visit Us</h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto font-light">
              Experience the joy of handcrafted food in a warm, welcoming atmosphere. We can't wait to serve you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Get Directions</Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" size="lg">View Menu</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};