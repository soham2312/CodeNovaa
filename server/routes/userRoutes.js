import express from 'express';
import authController from '../controllers/authController.js';
const router = express.Router();

// Public Routes
router.post("/signup", authController.signup);

export default router;