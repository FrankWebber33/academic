import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['parent', 'child', 'teacher', 'admin']).optional()
});

export function validateAuth(req, res, next) {
  try {
    authSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
}