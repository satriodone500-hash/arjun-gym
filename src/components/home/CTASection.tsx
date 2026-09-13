import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&h=600&fit=crop" 
          alt="Gym interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80" />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Siap Memulai Transformasi Anda?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Bergabunglah dengan ARJUN GYM hari ini dan dapatkan akses ke fasilitas premium, kelas eksklusif, dan panduan dari trainer profesional.
          </p>
          <Link to="/membership">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
