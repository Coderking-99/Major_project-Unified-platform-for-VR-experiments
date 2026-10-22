import React from 'react';
import { GlassCard } from '../common/GlassCard';
import {
  Layers,
  Glasses,
  Eye,
  BrainCircuit,
  Bot,
  Globe2,
  Box,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const IntroCardsSection: React.FC = () => {
  const techCards = [
    {
      title: 'AR – Augmented Reality',
      abbr: 'AR',
      description:
        'AR overlays digital content such as 3D objects, information and animations onto the real world.',
      icon: Layers,
      color: 'cyan',
      badge: 'Spatial Overlay',
      gradient: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30'
    },
    {
      title: 'VR – Virtual Reality',
      abbr: 'VR',
      description:
        'VR creates a fully immersive digital environment that users can explore and interact with using VR headsets.',
      icon: Glasses,
      color: 'blue',
      badge: 'Full Immersion',
      gradient: 'from-blue-500/20 to-indigo-500/10',
      border: 'border-blue-500/30'
    },
    {
      title: 'MR – Mixed Reality',
      abbr: 'MR',
      description:
        'MR combines physical and digital environments, allowing virtual objects to interact with the real world.',
      icon: Eye,
      color: 'teal',
      badge: 'Hybrid Reality',
      gradient: 'from-teal-500/20 to-cyan-500/10',
      border: 'border-teal-500/30'
    },
    {
      title: 'AI – Artificial Intelligence',
      abbr: 'AI',
      description:
        'AI enables machines and software to analyze information, learn patterns and perform intelligent tasks.',
      icon: BrainCircuit,
      color: 'purple',
      badge: 'Neural Engine',
      gradient: 'from-purple-500/20 to-pink-500/10',
      border: 'border-purple-500/30'
    },
    {
      title: 'Robotics',
      abbr: 'ROBOTICS',
      description:
        'Robotics combines hardware, software and AI to create machines capable of sensing, moving and performing tasks.',
      icon: Bot,
      color: 'pink',
      badge: 'Kinematics',
      gradient: 'from-pink-500/20 to-rose-500/10',
      border: 'border-pink-500/30'
    },
    {
      title: 'Metaverse',
      abbr: 'METAVERSE',
      description:
        'The Metaverse represents interconnected immersive digital environments where people can interact, communicate and experience virtual spaces.',
      icon: Globe2,
      color: 'indigo',
      badge: 'Connected Worlds',
      gradient: 'from-indigo-500/20 to-purple-500/10',
      border: 'border-indigo-500/30'
    },
    {
      title: '3D & Unity',
      abbr: 'UNITY 2022',
      description:
        '3D modeling and Unity development allow immersive virtual environments and interactive experiences to be created.',
      icon: Box,
      color: 'emerald',
      badge: 'Real-Time Engine',
      gradient: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30'
    }
  ];

  return (
    <section id="about" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Core Technology Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Foundations of the{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Spatial Era
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            From optical passthrough to neural network vision and high-fidelity 3D simulation engines, these technologies power tomorrow's educational frontiers.
          </p>
        </div>

        {/* Cards Grid: 7 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {techCards.map((card, idx) => {
            const Icon = card.icon;
            // 7th card spans 2 columns on larger screens for balanced layout
            const isLast = idx === techCards.length - 1;
            return (
              <GlassCard
                key={card.title}
                className={`p-6 flex flex-col justify-between group overflow-hidden ${
                  isLast ? 'md:col-span-2 lg:col-span-3 xl:col-span-2' : ''
                }`}
                glow="cyan"
              >
                {/* Background accent wash */}
                <div
                  className={`absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-gradient-to-br ${card.gradient} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl bg-slate-800/80 border ${card.border} flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-white group-hover:bg-cyan-500/20 transition-all duration-300 shadow-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide bg-white/5 border border-white/10 text-slate-300">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{card.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Footer Monospace Meta */}
                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 relative z-10">
                  <span>ARCHITECTURE</span>
                  <span className="text-cyan-400 font-semibold">{card.abbr}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
