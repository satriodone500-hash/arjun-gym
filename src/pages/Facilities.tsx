import React from 'react';
import { Card } from '../components/ui';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { facilities } from '../data/facilities';
import * as LucideIcons from 'lucide-react';

export default function Facilities() {
  const { ref: facilitiesRef, isVisible: facilitiesVisible } = useScrollAnimation();

  return (
    <div className="pt-32 pb-16 min-h-screen bg-dark text-text-primary">
      <div className="container-custom">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Fasilitas Premium</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Kami menyediakan perlengkapan dan ruang terbaik untuk mendukung setiap sesi latihan Anda dengan kenyamanan maksimal.</p>
        </div>

        <section ref={facilitiesRef} className={`transition-all duration-700 transform ${facilitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {facilities.map((facility) => {
              const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[facility.icon] || LucideIcons.CheckCircle;
              const photo = facility.image || facility.imageUrl;
              
              return (
                <Card key={facility.id} className="bg-dark-card border-dark-border p-0 overflow-hidden group">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={photo} 
                      alt={facility.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-90"></div>
                    <div className="absolute bottom-4 left-6 p-2 bg-primary/20 backdrop-blur-md rounded-lg text-primary">
                      {IconComponent && <IconComponent size={28} />}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{facility.name}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{facility.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
