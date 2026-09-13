import { useState } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { programs } from '../data/programs';
import { Clock, Calendar, CheckCircle } from 'lucide-react';

const levelMap: Record<string, string> = {
  'Beginner': 'Pemula',
  'Intermediate': 'Menengah',
  'Advanced': 'Lanjutan',
  'All Level': 'Semua Level',
};

export default function Programs() {
  const { ref: programsRef, isVisible: programsVisible } = useScrollAnimation();
  const [filter, setFilter] = useState<string>('Semua');

  const filterTabs = ['Semua', 'Pemula', 'Menengah', 'Lanjutan', 'Semua Level'];

  const filteredPrograms = filter === 'Semua' 
    ? programs 
    : programs.filter(p => (levelMap[p.level] || p.level) === filter);

  return (
    <div className="pt-32 pb-16 min-h-screen bg-dark text-text-primary">
      <div className="container-custom">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Program Latihan</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Beragam program yang dirancang khusus untuk memenuhi tujuan kebugaran spesifik Anda.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === tab 
                  ? 'bg-primary text-white' 
                  : 'bg-dark-card text-text-secondary hover:text-white border border-dark-border'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <section ref={programsRef} className={`transition-all duration-700 transform ${programsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => {
              const displayLevel = levelMap[program.level] || program.level;
              return (
                <Card key={program.id} className="bg-dark-card border-dark-border overflow-hidden flex flex-col p-0">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant={
                        displayLevel === 'Pemula' ? 'success' : 
                        displayLevel === 'Menengah' ? 'warning' : 
                        displayLevel === 'Lanjutan' ? 'danger' : 'primary'
                      }>
                        {displayLevel}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">{program.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{program.schedule}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6 flex-grow">
                      {program.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                          <CheckCircle className="text-primary w-4 h-4 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-auto hover:bg-primary hover:border-primary hover:text-white">
                      Mulai Program
                    </Button>
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
