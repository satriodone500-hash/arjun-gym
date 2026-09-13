import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeader, Button } from '../ui';
import { facilities } from '../../data/facilities';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const FacilitiesPreview = () => {
  const { ref, isVisible } = useScrollAnimation();
  const previewFacilities = facilities.slice(0, 4);

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom" ref={ref}>
        <SectionHeader 
          badge="Fasilitas" 
          title="Fasilitas Kelas Dunia" 
          className={isVisible ? 'animate-slide-up' : 'opacity-0'} 
        />
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {previewFacilities.map((facility) => (
            <div key={facility.id} className="card-dark group overflow-hidden rounded-xl">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={facility.image || facility.imageUrl} 
                  alt={facility.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
              </div>
              <div className="p-5 relative -mt-10">
                <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-primary/30">
                  <span className="text-primary font-bold">{facility.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{facility.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link to="/facilities">
            <Button variant="outline" className="flex items-center gap-2">
              Lihat Semua Fasilitas <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
