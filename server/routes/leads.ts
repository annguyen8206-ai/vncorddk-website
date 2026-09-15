import { Router, Request, Response } from 'express';
import { getDb, DbLead } from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// GET /api/leads — protected
router.get('/', verifyToken, async (_req: Request, res: Response) => {
  const db = await getDb();
  res.json([...db.data.leads].reverse());
});

// POST /api/leads — public (from consultation form)
router.post('/', async (req: Request, res: Response) => {
  const { fullName, phone, email, gestationalAge, expectedHospital, interestedPackage, note } = req.body;

  if (!fullName || !phone) {
    res.status(400).json({ error: 'Họ tên và số điện thoại là bắt buộc.' });
    return;
  }

  const db = await getDb();
  const year = new Date().getFullYear();
  const id = `LEAD-${year}-${String(db.data.leads.length + 1).padStart(3, '0')}`;
  const createdAt = new Date().toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const newLead: DbLead = {
    id, fullName, phone,
    email: email || null,
    gestationalAge: gestationalAge || null,
    expectedHospital: expectedHospital || null,
    interestedPackage: interestedPackage || null,
    note: note || null,
    status: 'new',
    doctorNotes: null,
    createdAt,
  };

  db.data.leads.push(newLead);
  await db.write();
  res.status(201).json(newLead);
});

// PUT /api/leads/:id — protected
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  const db = await getDb();
  const lead = db.data.leads.find(l => l.id === req.params.id);
  if (!lead) { res.status(404).json({ error: 'Lead không tồn tại.' }); return; }

  const { status, doctorNotes, fullName, phone, email, gestationalAge, expectedHospital, interestedPackage, note } = req.body;
  if (status !== undefined) lead.status = status;
  if (doctorNotes !== undefined) lead.doctorNotes = doctorNotes;
  if (fullName) lead.fullName = fullName;
  if (phone) lead.phone = phone;
  if (email !== undefined) lead.email = email;
  if (gestationalAge !== undefined) lead.gestationalAge = gestationalAge;
  if (expectedHospital !== undefined) lead.expectedHospital = expectedHospital;
  if (interestedPackage !== undefined) lead.interestedPackage = interestedPackage;
  if (note !== undefined) lead.note = note;

  await db.write();
  res.json(lead);
});

// DELETE /api/leads/:id — protected
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  const db = await getDb();
  const idx = db.data.leads.findIndex(l => l.id === req.params.id);
  if (idx === -1) { res.status(404).json({ error: 'Lead không tồn tại.' }); return; }
  db.data.leads.splice(idx, 1);
  await db.write();
  res.json({ success: true });
});

export default router;
