import { Users, Dumbbell, Award, Calendar } from 'lucide-react';
import { StatsCard } from '../ui/StatsCard';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="section-padding bg-dark-secondary">
      <div className="container-custom">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <StatsCard value="2500+" label="Member Aktif" icon={Users} />
          <StatsCard value="150+" label="Peralatan" icon={Dumbbell} />
          <StatsCard value="15+" label="Trainer Ahli" icon={Award} />
          <StatsCard value="8+" label="Tahun Berdiri" icon={Calendar} />
        </div>
      </div>
    </section>
  );
};
