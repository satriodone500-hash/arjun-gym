import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dumbbell,
  User,
  CreditCard,
  Calendar,
  CalendarCheck,
  CheckCircle,
  Clock,
  MapPin,
  QrCode,
  LogOut,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { mockMember, upcomingClasses, checkInHistory } from '../data/dashboard';

export default function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const startDate = new Date(mockMember.startDate);
  const endDate = new Date(mockMember.endDate);
  const today = new Date();
  const totalDays = endDate.getTime() - startDate.getTime();
  const elapsedDays = today.getTime() - startDate.getTime();
  const progressPercent = Math.min(Math.round((elapsedDays / totalDays) * 100), 100);
  const daysRemaining = Math.max(Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)), 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Dashboard Header */}
      <div className="bg-dark-secondary border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Dumbbell className="text-white" size={20} />
              </div>
              <div>
                <span className="text-lg font-bold">ARJUN</span>
                <span className="text-lg font-bold text-primary"> GYM</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">{user?.name || mockMember.name}</p>
                <p className="text-xs text-text-muted">{user?.email || mockMember.email}</p>
              </div>
              <img
                src={mockMember.photo}
                alt={mockMember.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-dark-hover transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Halo, {user?.name || mockMember.name}! 👋
          </h1>
          <p className="text-text-secondary">
            Selamat datang di dashboard member ARJUN GYM. Pantau progress fitness kamu di sini.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted">Membership</p>
                <p className="font-bold text-primary">{mockMember.membershipType}</p>
              </div>
            </div>
          </Card>

          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted">Check-in</p>
                <p className="font-bold">{mockMember.checkInCount}x</p>
              </div>
            </div>
          </Card>

          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Calendar className="text-blue-400" size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted">Sisa Hari</p>
                <p className="font-bold">{daysRemaining} hari</p>
              </div>
            </div>
          </Card>

          <Card className="!p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="text-amber-400" size={20} />
              </div>
              <div>
                <p className="text-xs text-text-muted">Avg/Minggu</p>
                <p className="font-bold">4.2x</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Membership Info */}
            <Card hover={false}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold mb-1">Detail Membership</h2>
                  <Badge variant="success">Aktif</Badge>
                </div>
                <Link to="/membership">
                  <Button variant="ghost" size="sm">Upgrade</Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-text-muted mb-1">Member ID</p>
                  <p className="text-sm font-mono font-medium">{mockMember.memberId}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Tipe</p>
                  <p className="text-sm font-medium">{mockMember.membershipType}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Mulai</p>
                  <p className="text-sm font-medium">
                    {startDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Berakhir</p>
                  <p className="text-sm font-medium">
                    {endDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-secondary">Masa Aktif</span>
                  <span className="text-primary font-medium">{progressPercent}%</span>
                </div>
                <div className="w-full bg-dark-border rounded-full h-2.5">
                  <div
                    className="bg-primary rounded-full h-2.5 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Upcoming Classes */}
            <Card hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Kelas Mendatang</h2>
                <Link to="/schedule">
                  <Button variant="ghost" size="sm">Lihat Jadwal</Button>
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center justify-between p-4 bg-dark rounded-xl border border-dark-border hover:border-dark-hover transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Activity className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{cls.name}</p>
                        <p className="text-xs text-text-muted">{cls.trainer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-text-secondary">
                        <Clock size={14} />
                        <span>{cls.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                        <MapPin size={12} />
                        <span>{cls.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Check-ins */}
            <Card hover={false}>
              <h2 className="text-lg font-bold mb-6">Riwayat Check-in Terakhir</h2>
              <div className="space-y-2">
                {checkInHistory.map((entry, i) => {
                  const date = new Date(entry.date);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-dark transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <CalendarCheck className="text-emerald-400" size={16} />
                        </div>
                        <span className="text-sm">
                          {date.toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <span className="text-sm text-text-muted">{entry.time} WIB</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Member Card */}
            <Card hover={false} className="!p-0 overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary-dark p-6 text-center">
                <img
                  src={mockMember.photo}
                  alt={mockMember.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-3 border-2 border-white/20"
                />
                <h3 className="font-bold text-lg">{mockMember.name}</h3>
                <p className="text-sm text-white/70">{mockMember.membershipType} Member</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center">
                    <QrCode size={80} className="text-dark" />
                  </div>
                </div>
                <p className="text-center text-xs text-text-muted mt-3 font-mono">
                  {mockMember.memberId}
                </p>
                <p className="text-center text-xs text-text-muted mt-1">
                  Tunjukkan QR code ini saat check-in
                </p>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card hover={false}>
              <h3 className="font-bold mb-4">Aksi Cepat</h3>
              <div className="space-y-2">
                <Link to="/schedule" className="block">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-dark border border-dark-border hover:border-primary/30 transition-all text-left">
                    <Calendar size={18} className="text-primary" />
                    <span className="text-sm">Booking Kelas</span>
                  </button>
                </Link>
                <Link to="/programs" className="block">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-dark border border-dark-border hover:border-primary/30 transition-all text-left">
                    <Activity size={18} className="text-primary" />
                    <span className="text-sm">Lihat Program</span>
                  </button>
                </Link>
                <Link to="/trainers" className="block">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-dark border border-dark-border hover:border-primary/30 transition-all text-left">
                    <User size={18} className="text-primary" />
                    <span className="text-sm">Personal Trainer</span>
                  </button>
                </Link>
                <Link to="/membership" className="block">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-dark border border-dark-border hover:border-primary/30 transition-all text-left">
                    <CreditCard size={18} className="text-primary" />
                    <span className="text-sm">Upgrade Membership</span>
                  </button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
