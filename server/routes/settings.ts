import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// GET /api/settings — public
router.get('/', async (_req: Request, res: Response) => {
  const db = await getDb();
  res.json(db.data.settings);
});

// PUT /api/settings — protected
router.put('/', verifyToken, async (req: Request, res: Response) => {
  const db = await getDb();
  const updates = req.body as Record<string, string>;
  db.data.settings = { ...db.data.settings, ...updates };
  await db.write();
  res.json(db.data.settings);
});

export default router;
