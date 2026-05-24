import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, Button } from '../components';
import { fetchShopInfo } from '../api/shop';
import { apiPost } from '../api/client';
import type { ShopInfo } from '../types';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact = () => {
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    fetchShopInfo().then(setShopInfo).catch(() => {});
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await apiPost('/contact', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-red-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-red-400 font-semibold uppercase tracking-[0.2em] text-sm mb-2">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
              Have a question or want to book a table? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="Send us a Message"
                subtitle="We'd Love to Hear From You"
                centered={false}
              />

              {isSubmitted && (
                <div className="mb-6 glass-chip text-green-300 border-green-400/20 bg-green-500/10 p-4 rounded-xl flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {submitError && (
                <div className="mb-6 glass-chip text-red-300 border-red-400/20 bg-red-500/10 p-4 rounded-xl">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white/70 mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl glass-input ${errors.name ? 'border-red-400/50' : ''}`}
                      placeholder="John Doe" />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl glass-input ${errors.email ? 'border-red-400/50' : ''}`}
                      placeholder="john@example.com" />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white/70 mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input"
                    placeholder="+1 (555) 123-4567" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-white/70 mb-2">Subject *</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input"
                    placeholder="How can we help?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white/70 mb-2">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5}
                    className={`w-full px-4 py-3 rounded-xl glass-input resize-none ${errors.message ? 'border-red-400/50' : ''}`}
                    placeholder="Tell us how we can help you..." />
                  {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                </div>

                <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>Send Message</Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <SectionHeading title="Contact Information" subtitle="Get in Touch" centered={false} />

              {shopInfo && (
                <div className="space-y-6">
                  <div className="glass-card p-6 flex items-start space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white/90 mb-1">Address</h3>
                      <p className="text-white/60">
                        {shopInfo.address.street}<br />
                        {shopInfo.address.city}, {shopInfo.address.state} {shopInfo.address.zipCode}<br />
                        {shopInfo.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-start space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white/90 mb-1">Phone</h3>
                      <a href={`tel:${shopInfo.phone.replace(/\D/g, '')}`} className="text-red-400 hover:text-red-300 font-semibold transition-colors">{shopInfo.phone}</a>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-start space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white/90 mb-1">Email</h3>
                      <a href={`mailto:${shopInfo.email}`} className="text-red-400 hover:text-red-300 font-semibold transition-colors">{shopInfo.email}</a>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-start space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white/90 mb-1">Opening Hours</h3>
                      <ul className="text-white/60 space-y-1">
                        {shopInfo.hours.map((hour) => (
                          <li key={hour.day} className="flex justify-between">
                            <span className="min-w-[100px]">{hour.day}</span>
                            <span className="text-white/80">{hour.open} - {hour.close}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-3xl overflow-hidden shadow-2xl glass-card h-64">
                <div className="w-full h-full"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 section-glass-alt">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading title="Frequently Asked Questions" subtitle="Quick Answers" />
          <div className="space-y-4">
            {[
              { question: 'Do you offer delivery?', answer: 'Yes! We offer delivery within a 5-mile radius of our restaurant. Delivery fees may apply based on your location.' },
              { question: 'Can I book a table for a large group?', answer: 'Absolutely! We welcome groups of all sizes. For parties of 8 or more, we recommend calling us directly to arrange the best seating.' },
              { question: 'Do you have vegetarian and vegan options?', answer: 'Yes, we offer several vegetarian pizzas and can make most pizzas vegan upon request. Just let us know your preferences when ordering.' },
              { question: 'Is there parking available?', answer: 'Yes, we have a small parking lot behind the restaurant. There is also street parking available on Italian Way.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-bold text-white/90 mb-2">{faq.question}</h3>
                <p className="text-white/60">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};