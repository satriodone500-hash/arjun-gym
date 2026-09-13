import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SectionHeader, Button } from '../ui';
import { memberships } from '../../data/membership';
import { formatCurrency } from '../../utils/format';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { MembershipPlan } from '../../types';

export const PricingPreview = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-dark-secondary">
      <div className="container-custom" ref={ref}>
        <SectionHeader 
          badge="Membership" 
          title="Pilih Paket Terbaikmu" 
          className={isVisible ? 'animate-slide-up' : 'opacity-0'} 
        />
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {memberships.map((plan: MembershipPlan) => (
            <div 
              key={plan.id} 
              className={`card-dark rounded-2xl p-8 flex flex-col relative ${
                plan.isPopular ? 'border-2 border-primary transform md:-translate-y-4 shadow-[0_0_30px_rgba(249,115,22,0.15)]' : 'border border-white/5'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Paling Populer
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">{formatCurrency(plan.price)}</span>
                  <span className="text-text-secondary">/{plan.period || 'bulan'}</span>
                </div>
              </div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 bg-primary/20 p-1 rounded-full text-primary">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/membership" className="w-full mt-auto">
                <Button 
                  variant={plan.isPopular ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
