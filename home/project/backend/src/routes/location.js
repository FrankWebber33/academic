import { Router } from 'express';
import { updateLocation, getLocation } from '../controllers/location.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.post('/update', auth, updateLocation);
router.get('/:userId', auth, getLocation);

export { router as locationRouter };