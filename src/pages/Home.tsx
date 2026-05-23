import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeading, Button, MenuCard } from '../components';
import { featuredPizzas, testimonials, promotions, shopInfo } from '../data';

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=80)',
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="text-red-400 font-semibold uppercase tracking-wider text-sm md:text-base mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Authentic Italian Pizza
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Taste the Tradition of{' '}
            <span className="text-red-500">Naples</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Handcrafted pizzas made with the finest ingredients, wood-fired to
            perfection. Experience the authentic flavors of Italy in every bite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg">View Full Menu</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-gray-900">
                Book a Table
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Featured Pizzas Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="container mx-auto">
          <SectionHeading
            title="Our Famous Pizzas"
            subtitle="Customer Favorites"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPizzas.map((pizza) => (
              <MenuCard key={pizza.id} item={pizza} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            title="Why Choose Bella Napoli"
            subtitle="Our Promise"
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                ),
                title: 'Authentic Recipes',
                description:
                  'Traditional Neapolitan recipes passed down through generations.',
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
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                ),
                title: 'Fresh Ingredients',
                description:
                  'Locally sourced produce and imported Italian specialties.',
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
                title: 'Wood-Fired Oven',
                description:
                  'Traditional wood-fired oven for that perfect crispy crust.',
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
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: 'Family Atmosphere',
                description:
                  'Warm, welcoming environment perfect for family gatherings.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 text-red-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="container mx-auto">
          <SectionHeading
            title="Special Offers"
            subtitle="Limited Time Deals"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                className="bg-white rounded-2xl shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {promo.discountText}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {promo.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{promo.description}</p>
                  {promo.code && (
                    <div className="bg-gray-100 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-500 mb-1">Use Code</p>
                      <p className="text-lg font-bold text-red-600">
                        {promo.code}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <SectionHeading
            title="What Our Customers Say"
            subtitle="Reviews"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-cream rounded-2xl p-6 shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Preview Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                title="Visit Us"
                subtitle="Location & Hours"
                centered={false}
              />
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      {shopInfo.address.street}
                      <br />
                      {shopInfo.address.city}, {shopInfo.address.state}{' '}
                      {shopInfo.address.zipCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Hours</h3>
                    <p className="text-gray-600">
                      Mon - Thu: 11:00 AM - 10:00 PM
                      <br />
                      Fri - Sat: 11:00 AM - 11:00 PM
                      <br />
                      Sun: 12:00 PM - 9:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Contact</h3>
                    <p className="text-gray-600">
                      {shopInfo.phone}
                      <br />
                      {shopInfo.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/contact">
                  <Button>Get Directions</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="h-96 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className="w-full h-full bg-gray-300"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </motion.div>
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
              Ready to Order?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Get your favorite pizza delivered hot and fresh to your doorstep.
              Order now and experience the taste of Italy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100"
                >
                  Order Online
                </Button>
              </Link>
              <a href={`tel:${shopInfo.phone.replace(/\D/g, '')}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-red-600"
                >
                  Call to Order
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};