import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const db = await getDb();
  res.json(db.data.reviews);
});

router.put('/', verifyToken, async (req: Request, res: Response) => {
  if (!Array.isArray(req.body)) { res.status(400).json({ error: 'Cần gửi mảng đánh giá.' }); return; }
  const db = await getDb();
  db.data.reviews = req.body;
  await db.write();
  res.json({ success: true, count: req.body.length });
});

export default router;
