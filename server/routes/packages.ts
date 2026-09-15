import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const db = await getDb();
  res.json(db.data.packages);
});

router.put('/', verifyToken, async (req: Request, res: Response) => {
  if (!Array.isArray(req.body)) { res.status(400).json({ error: 'Cần gửi mảng gói dịch vụ.' }); return; }
  const db = await getDb();
  db.data.packages = req.body;
  await db.write();
  res.json({ success: true, count: req.body.length });
});

router.post('/reset', verifyToken, async (_req: Request, res: Response) => {
  const db = await getDb();
  db.data.packages = [];
  await db.write();
  res.json({ success: true, message: 'Đã reset bảng giá về mặc định.' });
});

export default router;
