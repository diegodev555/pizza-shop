import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Button } from '../components';
import { fetchAboutContent } from '../api/shop';
import { Link } from 'react-router-dom';
import type { AboutContentData } from '../types';

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
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-400 font-semibold uppercase tracking-wider text-sm mb-2">
              Our Story
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {content?.title || 'About Bella Napoli'}
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              {content?.subtitle || 'A passion for authentic Italian pizza, crafted with love and tradition since 2005.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                title="Our Story"
                subtitle="Tradition & Passion"
                centered={false}
              />
              <div className="space-y-6 text-gray-700 text-lg">
                {content?.storyText ? (
                  content.storyText.split('\n').map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <>
                    <p>
                      Bella Napoli Pizzeria was born from a dream to bring the
                      authentic taste of Naples to San Francisco. Founded by Marco
                      Rossi, a third-generation pizzaiolo from Naples, Italy, our
                      pizzeria has been serving handcrafted pizzas since 2005.
                    </p>
                    <p>
                      Every pizza at Bella Napoli is a labor of love. Our dough is
                      made fresh daily using a 48-hour fermentation process, just
                      like they do in Naples. We import our San Marzano tomatoes
                      directly from the volcanic slopes of Mount Vesuvius and use
                      only the finest mozzarella di bufala.
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
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80"
                  alt="Chef making pizza"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">19+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Ingredients Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="container mx-auto">
          <SectionHeading
            title="Quality Ingredients"
            subtitle="The Bella Napoli Difference"
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
                className="bg-white rounded-2xl p-8 shadow-card text-center hover:shadow-card-hover transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 text-red-600 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <SectionHeading title="Meet Our Team" subtitle="The People Behind the Pizza" />
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
                bio: "Sofia's expertise in Italian desserts complements our pizza menu perfectly. Her tiramisu and cannoli are made from her grandmother's secret recipes.",
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
              },
              {
                id: 3, name: 'Antonio Marino',
                role: 'Restaurant Manager',
                bio: 'Antonio ensures every guest has an exceptional dining experience. His warm personality and attention to detail make Bella Napoli feel like home.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
              },
            ].map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-cream rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-red-600 font-semibold text-sm mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="container mx-auto">
          <SectionHeading title="Our Values" subtitle="What Drives Us" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Authenticity',
                description: 'We stay true to Neapolitan traditions, using time-honored recipes and techniques passed down through generations.',
              },
              {
                title: 'Quality',
                description: 'We never compromise on ingredients. Every component of our pizza is carefully selected for the finest quality.',
              },
              {
                title: 'Community',
                description: 'We believe in bringing people together. Our pizzeria is a place where families and friends create memories.',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-red-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Come Visit Us</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Experience the authentic taste of Naples in a warm, welcoming atmosphere. We can't wait to serve you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="secondary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">Get Directions</Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-red-600">View Menu</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};