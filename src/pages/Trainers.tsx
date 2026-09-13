import { Badge, Instagram, Twitter, Linkedin } from '../components/ui';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { trainers } from '../data/trainers';

export default function Trainers() {
  const { ref: trainersRef, isVisible: trainersVisible } = useScrollAnimation();

  return (
    <div className="pt-32 pb-16 min-h-screen bg-dark text-text-primary">
      <div className="container-custom">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Pelatih Profesional Kami</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Tim pelatih berpengalaman dan bersertifikat internasional yang siap membantu Anda mencapai target kebugaran.</p>
        </div>

        <section ref={trainersRef} className={`transition-all duration-700 transform ${trainersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => {
              const spec = Array.isArray(trainer.specialization)
                ? trainer.specialization.join(', ')
                : trainer.specialization;
              const photo = trainer.image || trainer.imageUrl;

              return (
                <div key={trainer.id} className="group rounded-xl overflow-hidden bg-dark-card border border-dark-border relative">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img 
                      src={photo} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold mb-1">{trainer.name}</h3>
                      <p className="text-primary font-medium mb-3">{spec}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {trainer.certifications.slice(0, 2).map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-dark/50 border-dark-border text-text-secondary">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        <a href={trainer.socialMedia?.instagram || '#'} className="text-white hover:text-primary transition-colors">
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a href={trainer.socialMedia?.twitter || '#'} className="text-white hover:text-primary transition-colors">
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a href={trainer.socialMedia?.linkedin || '#'} className="text-white hover:text-primary transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-dark-card border-t border-dark-border">
                    <p className="text-sm text-text-secondary line-clamp-3 mb-2">{trainer.bio}</p>
                    <p className="text-xs text-text-muted font-medium">Pengalaman: {trainer.experience}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
