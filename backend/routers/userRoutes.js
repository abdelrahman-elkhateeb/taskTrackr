import express from 'express';
import { register, login } from '../controllers/userController.js'; 

const router = express.Router();

// Sign up route
router.post('/signup', register);

// Sign in route
router.post('/login', login);

export default router;
