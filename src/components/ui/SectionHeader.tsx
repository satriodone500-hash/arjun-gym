import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  align?: 'left' | 'center' | 'right' | string;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  align,
  className = '',
}: SectionHeaderProps) {
  const [ref, isVisible] = useScrollAnimation();

  const isCenter = align ? align === 'center' : centered;
  const isRight = align === 'right';

  return (
    <div
      ref={ref}
      className={`mb-12 lg:mb-16 ${isCenter ? 'text-center' : isRight ? 'text-right' : 'text-left'} ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      } ${className}`}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-text-secondary text-lg max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
