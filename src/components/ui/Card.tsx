import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hover = true, padding = 'md' }: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`card-dark ${
        hover ? 'hover:border-primary/30 transition-all duration-300 hover:-translate-y-1' : ''
      } ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
