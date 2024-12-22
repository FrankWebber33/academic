import { Router } from 'express';
import { login, register } from '../controllers/auth.js';
import { validateAuth } from '../middleware/validation.js';

const router = Router();

router.post('/login', validateAuth, login);
router.post('/register', validateAuth, register);

export { router as authRouter };