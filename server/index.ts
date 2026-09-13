import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

dotenv.config();
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const secret = process.env.JWT_SECRET || 'change-this-secret';
app.use(cors());
app.use(express.json({ limit: '10mb' }));

type AuthRequest = express.Request & { adminId?: string };
const auth = (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  try { req.adminId = jwt.verify(token || '', secret).toString(); next(); } catch { res.status(401).json({ error: 'Unauthorized' }); }
};
const memberStatus = (expiry: string) => new Date(expiry) >= new Date(new Date().toDateString()) ? 'ACTIVE' : 'EXPIRED';

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT id, password_hash FROM admins WHERE username = $1', [username]);
  if (!result.rows[0] || !await bcrypt.compare(password, result.rows[0].password_hash)) return res.status(401).json({ error: 'Username atau password salah' });
  res.json({ token: jwt.sign({ id: result.rows[0].id }, secret, { expiresIn: '8h' }) });
});
app.get('/api/dashboard', auth, async (_req, res) => {
  const result = await pool.query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE expired_date >= CURRENT_DATE)::int AS active, COUNT(*) FILTER (WHERE expired_date < CURRENT_DATE)::int AS expired, (SELECT COUNT(*) FROM attendance WHERE check_in::date = CURRENT_DATE)::int AS today FROM members`);
  res.json(result.rows[0]);
});
app.get('/api/members', auth, async (req, res) => {
  const result = await pool.query('SELECT id, member_id, photo_url, name, phone, start_date, expired_date, created_at, updated_at FROM members WHERE member_id ILIKE $1 OR name ILIKE $1 ORDER BY created_at DESC', [`%${req.query.q || ''}%`]);
  res.json(result.rows.map(member => ({ ...member, status: memberStatus(member.expired_date) })));
});
app.post('/api/members', auth, async (req, res) => {
  const { memberId, photoUrl, name, phone, startDate, expiredDate } = req.body;
  if (!memberId || !name || !startDate || !expiredDate || !photoUrl) return res.status(400).json({ error: 'Data member belum lengkap (foto wajib)' });
  const result = await pool.query('INSERT INTO members (member_id, photo_url, name, phone, start_date, expired_date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [memberId, photoUrl, name, phone || null, startDate, expiredDate]);
  res.status(201).json(result.rows[0]);
});
app.put('/api/members/:id', auth, async (req, res) => {
  const { memberId, photoUrl, name, phone, startDate, expiredDate } = req.body;
  const result = await pool.query('UPDATE members SET member_id=$1, photo_url=$2, name=$3, phone=$4, start_date=$5, expired_date=$6, updated_at=NOW() WHERE id=$7 RETURNING *', [memberId, photoUrl || null, name, phone || null, startDate, expiredDate, req.params.id]);
  res.json(result.rows[0]);
});
app.delete('/api/members/:id', auth, async (req, res) => { await pool.query('DELETE FROM members WHERE id = $1', [req.params.id]); res.status(204).end(); });
app.get('/api/attendance', auth, async (_req, res) => { const result = await pool.query('SELECT a.id, a.check_in, m.member_id, m.name FROM attendance a JOIN members m ON m.id = a.member_id ORDER BY a.check_in DESC'); res.json(result.rows); });
app.get('/api/members/card/:id', async (req, res) => {
  const result = await pool.query('SELECT id, member_id, photo_url, name, phone, start_date, expired_date FROM members WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Member tidak ditemukan' });
  const member = result.rows[0]; res.json({ ...member, status: memberStatus(member.expired_date) });
});
app.post('/api/attendance/check-in', auth, async (req, res) => {
  const result = await pool.query('SELECT id, member_id, name, expired_date FROM members WHERE id = $1', [req.body.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Member tidak ditemukan' });
  if (memberStatus(result.rows[0].expired_date) !== 'ACTIVE') return res.status(403).json({ error: 'Membership sudah berakhir' });
  const saved = await pool.query('INSERT INTO attendance (member_id) VALUES ($1) RETURNING id, check_in', [result.rows[0].id]);
  res.status(201).json({ member: result.rows[0], attendance: saved.rows[0] });
});
app.listen(Number(process.env.PORT) || 3001, () => console.log('API running'));
