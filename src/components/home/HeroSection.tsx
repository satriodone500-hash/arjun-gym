import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui';

export const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop" 
          alt="Gym background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark z-10" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
          <span className="text-text-primary">ARJUN </span>
          <span className="text-primary">GYM</span>
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          Bangun Kekuatan. Bangun Disiplin.
        </h2>
        
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
          Transformasi tubuh dan hidupmu dimulai dari sini. Bergabunglah dengan komunitas kebugaran terbaik dengan fasilitas kelas dunia.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <Link to="/membership">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Join Now
            </Button>
          </Link>
          <Link to="/programs">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-text-primary border-text-primary hover:bg-white/10">
              Lihat Program
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ArrowDown className="text-primary w-8 h-8" />
      </div>
    </section>
  );
};
