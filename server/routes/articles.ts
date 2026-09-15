import { Router, Request, Response } from 'express';
import { getDb } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// GET /api/articles — public
router.get('/', async (_req: Request, res: Response) => {
  const db = await getDb();
  res.json(db.data.articles);
});

// GET /api/articles/:id — public
router.get('/:id', async (req: Request, res: Response) => {
  const db = await getDb();
  const article = db.data.articles.find((a: Record<string, unknown>) => a['id'] === req.params.id);
  if (!article) { res.status(404).json({ error: 'Bài viết không tồn tại.' }); return; }
  res.json(article);
});

// POST /api/articles — protected
router.post('/', verifyToken, async (req: Request, res: Response) => {
  const article = req.body as Record<string, unknown>;
  if (!article?.id || !article?.title) { res.status(400).json({ error: 'Thiếu id hoặc title.' }); return; }
  const db = await getDb();
  const idx = db.data.articles.findIndex((a: Record<string, unknown>) => a['id'] === article['id']);
  if (idx >= 0) { db.data.articles[idx] = article; } else { db.data.articles.push(article); }
  await db.write();
  res.status(201).json(article);
});

// PUT /api/articles/:id — protected
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  const db = await getDb();
  const idx = db.data.articles.findIndex((a: Record<string, unknown>) => a['id'] === req.params.id);
  if (idx === -1) { res.status(404).json({ error: 'Bài viết không tồn tại.' }); return; }
  const merged = { ...db.data.articles[idx], ...req.body, id: req.params.id };
  db.data.articles[idx] = merged;
  await db.write();
  res.json(merged);
});

// DELETE /api/articles/:id — protected
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  const db = await getDb();
  const idx = db.data.articles.findIndex((a: Record<string, unknown>) => a['id'] === req.params.id);
  if (idx === -1) { res.status(404).json({ error: 'Bài viết không tồn tại.' }); return; }
  db.data.articles.splice(idx, 1);
  await db.write();
  res.json({ success: true });
});

// PUT /api/articles (bulk replace) — protected
router.put('/', verifyToken, async (req: Request, res: Response) => {
  if (!Array.isArray(req.body)) { res.status(400).json({ error: 'Cần gửi mảng bài viết.' }); return; }
  const db = await getDb();
  db.data.articles = req.body;
  await db.write();
  res.json({ success: true, count: req.body.length });
});

export default router;
