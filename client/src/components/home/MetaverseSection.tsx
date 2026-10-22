import React from 'react';
import { GlassCard } from '../common/GlassCard';
import {
  Globe2,
  Users,
  Network,
  Cpu,
  Layers,
  Sparkles,
  Shield,
  Radio,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MetaverseSection: React.FC = () => {
  const metaverseFeatures = [
    {
      title: 'Persistent 3D Spaces',
      icon: Layers,
      description: 'Virtual campuses and research institutes that remain continuously active, allowing global cohorts to enter and exit seamlessly across timezones.'
    },
    {
      title: 'Spatial Avatars & Expressive Audio',
      icon: Users,
      description: 'Lifelike 3D avatars with eye tracking, upper-body kinematics, and spatialized HRTF binaural audio matching exact physical distances.'
    },
    {
      title: 'Cross-Engine Interoperability',
      icon: Network,
      description: 'Standardized USD and glTF pipelines linking Unity 2022 runtimes, Blender asset pipelines, and WebXR browser access effortlessly.'
    },
    {
      title: 'Secure Decentralized Campus',
      icon: Shield,
      description: 'Granular permissions ensuring private enterprise simulations and student testing environments are protected against unauthorized access.'
    }
  ];

  return (
    <section id="metaverse" className="relative py-24 z-10 overflow-hidden bg-[#060913]">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest">
            <Globe2 className="w-3.5 h-3.5" />
            Connected Spatial Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            The{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Metaverse
            </span>{' '}
            & Collaborative Virtual Labs
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Transcending geographical boundaries to create an interconnected matrix of scientific simulation laboratories, interactive classrooms, and robotic control hubs.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metaverseFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <GlassCard key={feat.title} className="p-6" glow="purple">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Metaverse Portal Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900/90 via-purple-950/40 to-slate-900/90 p-8 sm:p-12 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>SPATIAL EDUCATION RUNTIME</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Ready to deploy your Unity 2022 experiences?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Login to access the authorized client repository or manage APK releases and institutional client accounts directly in the owner dashboard.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-[1.02] transition-all"
            >
              <span>Access Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
