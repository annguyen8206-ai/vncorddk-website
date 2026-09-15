import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../db.js';
import { verifyToken, JWT_SECRET, AuthRequest } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { username, password, remember } = req.body as { username: string; password: string; remember?: boolean };

  if (!username || !password) {
    res.status(400).json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
    return;
  }

  const db = await getDb();
  const cred = db.data.adminCredentials.find(c => c.username === username.trim());

  if (!cred) {
    res.status(401).json({ error: 'Tên đăng nhập không chính xác.' });
    return;
  }

  const valid = bcrypt.compareSync(password.trim(), cred.passwordHash);
  if (!valid) {
    res.status(401).json({ error: 'Mật khẩu quản trị không đúng. Vui lòng kiểm tra lại.' });
    return;
  }

  const expiresIn = remember ? '30d' : '8h';
  const token = jwt.sign({ username: cred.username }, JWT_SECRET, { expiresIn });
  res.json({ success: true, token, username: cred.username });
});

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.json({ success: true });
});

// GET /api/auth/me
router.get('/me', verifyToken, (req: AuthRequest, res: Response) => {
  res.json({ authenticated: true, username: req.admin?.username });
});

// POST /api/auth/change-password
router.post('/change-password', verifyToken, async (req: AuthRequest, res: Response) => {
  const { oldPassword, newPassword } = req.body as { oldPassword: string; newPassword: string };

  if (!oldPassword || !newPassword) {
    res.status(400).json({ error: 'Vui lòng cung cấp mật khẩu cũ và mới.' });
    return;
  }
  if (newPassword.trim().length < 6) {
    res.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
    return;
  }

  const db = await getDb();
  const cred = db.data.adminCredentials.find(c => c.username === req.admin!.username);

  if (!cred || !bcrypt.compareSync(oldPassword.trim(), cred.passwordHash)) {
    res.status(401).json({ error: 'Mật khẩu hiện tại không chính xác.' });
    return;
  }

  cred.passwordHash = bcrypt.hashSync(newPassword.trim(), 10);
  await db.write();
  res.json({ success: true, message: 'Đổi mật khẩu thành công.' });
});

export default router;
