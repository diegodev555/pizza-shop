import { motion } from 'framer-motion';
import { SectionHeading, Button } from '../components';
import { teamMembers } from '../data';
import { Link } from 'react-router-dom';

export const About = () => {
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
              About Bella Napoli
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              A passion for authentic Italian pizza, crafted with love and
              tradition since 2005.
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
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: 'San Marzano Tomatoes',
                description:
                  'DOP-certified tomatoes from the volcanic soil of Mount Vesuvius for the perfect sauce.',
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2.34M20 14.66l-2.34 2.34A2 2 0 0017 18.34V20m3-5.34V6a2 2 0 00-2-2h-1.66M17 18.34V16a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-6 0h12"
                    />
                  </svg>
                ),
                title: 'Mozzarella di Bufala',
                description:
                  'Creamy, fresh buffalo mozzarella imported from Campania, Italy.',
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                ),
                title: '00 Flour',
                description:
                  'Finely milled Italian flour for that authentic Neapolitan crust texture.',
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-.5 2.9-4.3C13.6 3.6 16 6 16 6s2 2 2 5c0 1.5-.5 2.5-1.5 3.5"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15l-2 2-2-2m4 0V3"
                    />
                  </svg>
                ),
                title: 'Wood-Fired Perfection',
                description:
                  'Traditional wood-fired oven at 900°F for authentic leopard-spotted crust.',
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
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 text-red-600">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            title="Meet Our Team"
            subtitle="The People Behind the Pizza"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-cream rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-semibold text-sm mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="flex space-x-3">
                      {member.socialLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="container mx-auto">
          <SectionHeading
            title="Our Values"
            subtitle="What Drives Us"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Authenticity',
                description:
                  'We stay true to Neapolitan traditions, using time-honored recipes and techniques passed down through generations.',
              },
              {
                title: 'Quality',
                description:
                  'We never compromise on ingredients. Every component of our pizza is carefully selected for the finest quality.',
              },
              {
                title: 'Community',
                description:
                  'We believe in bringing people together. Our pizzeria is a place where families and friends create memories.',
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
                  <span className="text-white font-bold text-2xl">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Come Visit Us
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Experience the authentic taste of Naples in a warm, welcoming
              atmosphere. We can't wait to serve you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100"
                >
                  Get Directions
                </Button>
              </Link>
              <Link to="/menu">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-red-600"
                >
                  View Menu
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};