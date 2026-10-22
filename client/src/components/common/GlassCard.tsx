import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'none';
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = 'cyan',
  interactive = true
}) => {
  const glowStyles = {
    cyan: 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.18)]',
    purple: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]',
    none: ''
  };

  return (
    <div
      className={`relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 transition-all duration-300 ${
        interactive ? `hover:-translate-y-1.5 ${glowStyles[glow]}` : ''
      } ${className}`}
    >
      {/* Top subtle highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none rounded-t-2xl" />
      {children}
    </div>
  );
};
