import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { FacilitiesPreview } from '../components/home/FacilitiesPreview';
import { PricingPreview } from '../components/home/PricingPreview';
import { TrainerPreview } from '../components/home/TrainerPreview';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { CTASection } from '../components/home/CTASection';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <StatsSection />
      <FacilitiesPreview />
      <PricingPreview />
      <TrainerPreview />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}
