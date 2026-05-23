import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.js';

const router = Router();

// Protect all admin routes with authentication and admin check
router.use(ensureAuthenticated, ensureAdmin);

// Categories
router.post('/categories', adminController.createCategory);
router.put('/categories/:id', adminController.updateCategory);
router.delete('/categories/:id', adminController.deleteCategory);

// Menu Items
router.post('/menu-items', adminController.createMenuItem);
router.put('/menu-items/:id', adminController.updateMenuItem);
router.delete('/menu-items/:id', adminController.deleteMenuItem);

// Promotions
router.post('/promotions', adminController.createPromotion);
router.put('/promotions/:id', adminController.updatePromotion);
router.delete('/promotions/:id', adminController.deletePromotion);

// Testimonials
router.post('/testimonials', adminController.createTestimonial);
router.put('/testimonials/:id', adminController.updateTestimonial);
router.delete('/testimonials/:id', adminController.deleteTestimonial);

// Shop Info
router.put('/shop-info', adminController.updateShopInfo);

// Home Content
router.put('/home-content', adminController.updateHomeContent);

// About Content
router.put('/about-content', adminController.updateAboutContent);

// Contact Messages
router.get('/contact-messages', adminController.getContactMessages);
router.put('/contact-messages/:id', adminController.updateContactMessage);

export default router;