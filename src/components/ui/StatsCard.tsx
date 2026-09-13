import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import * as LucideIcons from 'lucide-react';

interface StatsCardProps {
  icon: any;
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

export function StatsCard({ icon, value, label, suffix, delay = 0 }: StatsCardProps) {
  const [ref, isVisible] = useScrollAnimation();

  let renderedIcon: React.ReactNode = null;

  if (typeof icon === 'string') {
    const IconComp = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[icon];
    if (IconComp) {
      renderedIcon = <IconComp className="text-primary" size={28} />;
    }
  } else if (typeof icon === 'function') {
    const IconComp = icon;
    renderedIcon = <IconComp className="text-primary" size={28} />;
  } else if (React.isValidElement(icon)) {
    renderedIcon = icon;
  }

  return (
    <div
      ref={ref}
      className={`text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
        {renderedIcon}
      </div>
      <div className="text-3xl sm:text-4xl font-bold">
        {value}
        {suffix && <span className="text-primary">{suffix}</span>}
      </div>
      <div className="text-text-secondary mt-1">{label}</div>
    </div>
  );
}
