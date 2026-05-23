import { Router } from 'express';
import { publicController } from '../controllers/publicController.js';

const router = Router();

router.get('/shop-info', publicController.getShopInfo);
router.get('/home-content', publicController.getHomeContent);
router.get('/about-content', publicController.getAboutContent);
router.get('/categories', publicController.getCategories);
router.get('/menu-items', publicController.getMenuItems);
router.get('/menu-items/featured', publicController.getFeaturedItems);
router.get('/menu-items/:id', publicController.getMenuItemById);
router.get('/promotions', publicController.getPromotions);
router.get('/testimonials', publicController.getTestimonials);
router.get('/contact-info', publicController.getContactInfo);
router.post('/contact', publicController.submitContact);

export default router;