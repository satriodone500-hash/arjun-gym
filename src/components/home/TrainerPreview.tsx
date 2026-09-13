import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeader, Button } from '../ui';
import { trainers } from '../../data/trainers';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const TrainerPreview = () => {
  const { ref, isVisible } = useScrollAnimation();
  const previewTrainers = trainers.slice(0, 3);

  return (
    <section className="section-padding bg-dark">
      <div className="container-custom" ref={ref}>
        <SectionHeader 
          badge="Trainer" 
          title="Tim Trainer Profesional" 
          className={isVisible ? 'animate-slide-up' : 'opacity-0'} 
        />
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {previewTrainers.map((trainer) => {
            const spec = Array.isArray(trainer.specialization)
              ? trainer.specialization.join(', ')
              : trainer.specialization;
            return (
              <div key={trainer.id} className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
                <img 
                  src={trainer.image || trainer.imageUrl} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-text-primary mb-1">{trainer.name}</h3>
                  <p className="text-primary font-medium">{spec}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link to="/trainers">
            <Button variant="outline" className="flex items-center gap-2">
              Lihat Semua Trainer <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
