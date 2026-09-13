import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useParams, Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { Scanner } from '@yudiel/react-qr-scanner';
import './index.css';

type Member = { id: string; member_id: string; photo_url: string; name: string; phone?: string; start_date: string; expired_date: string; status: 'ACTIVE' | 'EXPIRED' };
const API = '/api';
const api = async (path: string, options: RequestInit = {}) => { const response = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`, ...options.headers } }); const body = await response.json().catch(() => ({})); if (!response.ok) throw new Error(body.error || 'Request gagal'); return body; };
const date = (value: string) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(`${value.slice(0, 10)}T00:00:00`));

function Login() { const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const navigate = useNavigate(); const submit = async (e: React.FormEvent) => { e.preventDefault(); try { const result = await api('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }); sessionStorage.setItem('token', result.token); navigate('/admin'); } catch (err) { setError((err as Error).message); } }; return <main className="center"><form className="auth-card" onSubmit={submit}><div className="logo">A</div><p className="eyebrow orange">ARJUN GYM ADMIN</p><h1>Masuk ke dashboard</h1><label>Username<input value={username} onChange={e => setUsername(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>{error && <p className="error">{error}</p>}<button className="primary full">Login</button></form></main>; }

function MemberCard() {
  const { id } = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [qr, setQr] = useState('');
  useEffect(() => {
    api(`/members/card/${id}`).then(async (data) => { setMember(data); setQr(await QRCode.toDataURL(data.id, { margin: 1, width: 200 })); }).catch(console.error);
  }, [id]);
  if (!member) return <div className="center"><div className="loader" /></div>;
  return <main className="center public-page"><div className="digital-card"><p className="eyebrow orange">KARTU MEMBER DIGITAL</p><h2 className="card-logo">ARJUN GYM</h2><div className="card-photo-wrapper"><img src={member.photo_url} className="card-photo" /></div><div className="card-info"><h3>{member.name}</h3><p>{member.member_id}</p><span className={`badge ${member.status === 'ACTIVE' ? 'active' : 'expired'}`}>{member.status}</span><small>Berlaku s/d {date(member.expired_date)}</small></div><div className="card-qr"><img src={qr} alt="Personal QR" /><p>Gunakan QR ini untuk check-in</p></div></div></main>;
}

function ScanMember() {
  const [scannedId, setScannedId] = useState('');
  const [member, setMember] = useState<Member | null>(null);
  const [message, setMessage] = useState('');
  
  const handleScan = async (result: string) => {
    if (scannedId) return; // Prevent double scan
    setScannedId(result);
    try { setMember(await api(`/members/card/${result}`)); setMessage(''); } catch (err) { setMessage((err as Error).message); setMember(null); }
  };
  
  const checkIn = async () => {
    try { await api('/attendance/check-in', { method: 'POST', body: JSON.stringify({ id: scannedId }) }); setMessage('✓ Absensi berhasil dicatat'); setMember(null); setTimeout(() => { setScannedId(''); setMessage(''); }, 2000); } catch (err) { setMessage((err as Error).message); }
  };

  if (!scannedId) return <div className="panel scan-panel"><h3>Scan Member</h3><p>Arahkan kamera ke QR pribadi member</p><div className="scanner-container"><Scanner onScan={(result) => handleScan(result[0].rawValue)} /></div></div>;
  
  return <div className="panel scan-panel"><h3>Hasil Scan</h3>{message && <div className={message.includes('✓') ? 'notice' : 'error'}>{message}</div>}{member && <div className="scan-result"><img src={member.photo_url} className="scan-avatar" /><div><b>{member.name}</b><small>{member.member_id} · {member.phone}</small><div style={{margin: '8px 0'}}><span className={`badge ${member.status === 'ACTIVE' ? 'active' : 'expired'}`}>{member.status} · expired {date(member.expired_date)}</span></div></div>{member.status === 'ACTIVE' ? <button className="primary full" onClick={checkIn}>Absen Sekarang</button> : <div className="error">Tidak dapat absen. Membership sudah berakhir.</div>}</div>}<button className="secondary full" style={{marginTop: '10px'}} onClick={() => { setScannedId(''); setMember(null); setMessage(''); }}>Scan Member Lain</button></div>;
}

function Admin() { const [page, setPage] = useState('dashboard'); const [members, setMembers] = useState<Member[]>([]); const [stats, setStats] = useState({ total: 0, active: 0, expired: 0, today: 0 }); const [history, setHistory] = useState<Array<{ id: string; check_in: string; member_id: string; name: string }>>([]); const [error, setError] = useState(''); const load = async () => { try { setStats(await api('/dashboard')); setMembers(await api('/members')); setHistory(await api('/attendance')); } catch (err) { setError((err as Error).message); } }; useEffect(() => { load(); }, []); const logout = () => { sessionStorage.clear(); window.location.href = '/login'; }; return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark">A</span><div><b>ARJUN</b><small>GYM ADMIN</small></div></div><nav>{[['dashboard','⌂','Dashboard'],['scan','◎','Scan Member'],['members','♙','Data Member'],['history','◷','Riwayat Absensi']].map(([key, icon, label]) => <button className={page === key ? 'nav-item active' : 'nav-item'} onClick={() => setPage(key)} key={key}><span>{icon}</span>{label}</button>)}</nav><button className="logout" onClick={logout}>Keluar</button></aside><main className="main"><header><div><p className="eyebrow">ADMIN AREA</p><h1>{page === 'dashboard' ? 'Dashboard' : page === 'members' ? 'Data Member' : page === 'scan' ? 'Scan Member' : 'Riwayat Absensi'}</h1></div><div className="avatar">AD</div></header>{error && <div className="error">{error}</div>}{page === 'dashboard' && <><section className="hero"><p className="eyebrow orange">SISTEM ABSENSI QR</p><h2>Kelola gym lebih cepat.</h2><p>Gunakan kamera HP untuk scan QR pribadi member secara instan.</p><button className="primary" onClick={() => setPage('scan')}>◎ Buka Scanner Kamera</button></section><section className="stats">{[['TOTAL MEMBER', stats.total], ['MEMBER AKTIF', stats.active], ['MEMBER EXPIRED', stats.expired], ['ABSENSI HARI INI', stats.today]].map(([label, value]) => <div className="stat-card" key={String(label)}><span>{label}</span><strong>{value}</strong></div>)}</section></>}{page === 'scan' && <ScanMember />}{page === 'members' && <Members members={members} reload={load} />}{page === 'history' && <History rows={history} />}</main></div>; }

function Members({ members, reload }: { members: Member[]; reload: () => void }) {
  const [form, setForm] = useState({ memberId: '', name: '', phone: '', startDate: '', expiredDate: '', photoUrl: '' }); const [editing, setEditing] = useState<string | null>(null); const [loading, setLoading] = useState(false);
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev) => setForm({ ...form, photoUrl: (ev.target?.result as string) || '' }); reader.readAsDataURL(file); };
  const save = async () => { setLoading(true); try { await api(editing ? `/members/${editing}` : '/members', { method: editing ? 'PUT' : 'POST', body: JSON.stringify(form) }); setEditing(null); setForm({ memberId: '', name: '', phone: '', startDate: '', expiredDate: '', photoUrl: '' }); reload(); } catch(err) { alert((err as Error).message); } setLoading(false); };
  return <section className="member-layout"><div className="panel table-panel"><table><thead><tr><th>MEMBER</th><th>PERIODE</th><th>STATUS</th><th /></tr></thead><tbody>{members.map(member => <tr key={member.id}><td><div className="person-row"><img src={member.photo_url} className="mini-avatar" /><div><b>{member.name}</b><small>{member.member_id} · {member.phone}</small></div></div></td><td>{date(member.start_date)}<br />s/d {date(member.expired_date)}</td><td><span className={`badge ${member.status === 'ACTIVE' ? 'active' : 'expired'}`}>{member.status}</span></td><td><Link to={`/member/${member.id}`} target="_blank" className="icon-button">Kartu</Link><button className="icon-button danger" onClick={async () => { if(confirm('Hapus member?')) { await api(`/members/${member.id}`, { method: 'DELETE' }); reload(); } }}>Hapus</button></td></tr>)}</tbody></table></div><div className="panel form-panel"><p className="eyebrow">{editing ? 'EDIT MEMBER' : 'MEMBER BARU'}</p><label>Foto Member (Wajib)</label><input type="file" accept="image/*" onChange={handlePhoto} />{form.photoUrl && <img src={form.photoUrl} className="photo-preview" />}{[['memberId','ID Member'],['name','Nama'],['phone','No HP'],['startDate','Tanggal Mulai'],['expiredDate','Tanggal Expired']].map(([key, label]) => <label key={key}>{label}<input type={key.includes('Date') ? 'date' : 'text'} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={key !== 'phone'} /></label>)}<button className="primary full" onClick={save} disabled={loading || !form.photoUrl}>{loading ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah Member'}</button></div></section>;
}

function History({ rows }: { rows: Array<{ id: string; check_in: string; member_id: string; name: string }> }) { return <section className="panel table-panel"><table><thead><tr><th>TANGGAL</th><th>JAM</th><th>ID MEMBER</th><th>NAMA</th></tr></thead><tbody>{rows.map(row => { const value = new Date(row.check_in); return <tr key={row.id}><td>{value.toLocaleDateString('id-ID')}</td><td>{value.toLocaleTimeString('id-ID')}</td><td>{row.member_id}</td><td>{row.name}</td></tr>; })}</tbody></table></section>; }

export default function App() { return <BrowserRouter><Routes><Route path="/member/:id" element={<MemberCard />} /><Route path="/login" element={<Login />} /><Route path="/admin/*" element={<Admin />} /><Route path="*" element={<Login />} /></Routes></BrowserRouter>; }
