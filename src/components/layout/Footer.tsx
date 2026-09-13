import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Instagram, Youtube, Facebook } from '../ui';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Membership', path: '/membership' },
  { name: 'Programs', path: '/programs' },
];

const serviceLinks = [
  { name: 'Trainers', path: '/trainers' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Facilities', path: '/facilities' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Dumbbell className="text-white" size={22} />
              </div>
              <div>
                <span className="text-xl font-bold">ARJUN</span>
                <span className="text-xl font-bold text-primary"> GYM</span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Build Strength. Build Discipline. Transformasi tubuh dan hidupmu bersama ARJUN GYM.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Youtube size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Layanan</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-text-secondary text-sm">Jl. Sudirman No. 123, Jakarta Selatan, 12190</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <span className="text-text-secondary text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <span className="text-text-secondary text-sm">info@arjungym.id</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-primary mt-0.5 shrink-0" />
                <div className="text-text-secondary text-sm">
                  <p>Sen - Jum: 06:00 - 22:00</p>
                  <p>Sabtu: 07:00 - 20:00</p>
                  <p>Minggu: 08:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; 2026 ARJUN GYM. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted text-sm hover:text-text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-muted text-sm hover:text-text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
