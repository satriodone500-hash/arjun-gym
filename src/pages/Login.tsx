import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('member@arjungym.id');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      }
    } catch {
      setError('Login gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Dumbbell className="text-white" size={26} />
            </div>
            <div>
              <span className="text-2xl font-bold">ARJUN</span>
              <span className="text-2xl font-bold text-primary"> GYM</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Selamat Datang Kembali</h1>
          <p className="text-text-secondary">
            Masuk ke akun member kamu untuk mengakses dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="card-dark p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Demo Notice */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-sm">
              <p className="text-primary font-medium mb-1">🔐 Demo Mode</p>
              <p className="text-text-secondary">
                Gunakan email dan password yang sudah terisi untuk login demo.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark border border-dark-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark border border-dark-border rounded-xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-dark-border bg-dark text-primary focus:ring-primary/50"
                />
                <span className="text-sm text-text-secondary">Ingat saya</span>
              </label>
              <a href="#" className="text-sm text-primary hover:text-primary-light transition-colors">
                Lupa password?
              </a>
            </div>

            {/* Submit */}
            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              Masuk
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-dark-card px-4 text-text-muted">atau</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-text-secondary">
            Belum punya akun?{' '}
            <Link to="/membership" className="text-primary hover:text-primary-light font-medium transition-colors">
              Daftar sekarang
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">
          <Link to="/" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
            ← Kembali ke halaman utama
          </Link>
        </p>
      </div>
    </div>
  );
}
