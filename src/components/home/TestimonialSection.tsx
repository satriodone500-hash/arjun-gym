import { Star } from 'lucide-react';
import { SectionHeader } from '../ui';
import { testimonials } from '../../data/testimonials';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const TestimonialSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-dark-secondary overflow-hidden">
      <div className="container-custom" ref={ref}>
        <SectionHeader 
          badge="Testimonial" 
          title="Kata Mereka Tentang Kami" 
          className={isVisible ? 'animate-slide-up' : 'opacity-0'} 
        />
        
        <div className={`mt-12 flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {testimonials.map((testimonial) => {
            const avatar = testimonial.image || testimonial.avatarUrl;
            return (
              <div 
                key={testimonial.id} 
                className="card-dark p-8 rounded-2xl min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-center border border-white/5"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-text-secondary italic mb-8 flex-grow">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-dark rounded-full overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-text-primary font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-text-secondary">{testimonial.role} • {testimonial.memberSince}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
