import React from 'react';
import { GlassCard } from '../common/GlassCard';
import {
  Glasses,
  Gamepad2,
  Hand,
  GraduationCap,
  Briefcase,
  Activity,
  CheckCircle2,
  Boxes,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const OculusVrSection: React.FC = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const applications = [
    {
      title: 'VR in Education',
      icon: GraduationCap,
      color: 'cyan',
      description: 'Allows students to step inside a pumping human heart, walk alongside dinosaurs, or explore the quantum scale of atoms without leaving the classroom.'
    },
    {
      title: 'VR in High-Stakes Training',
      icon: Briefcase,
      color: 'blue',
      description: 'Surgical teams, astronauts, pilots, and industrial power plant operators rehearse complex emergency procedures in zero-risk, high-fidelity virtual simulations.'
    },
    {
      title: 'VR in Physical Simulation',
      icon: Activity,
      color: 'purple',
      description: 'Replicates Newtonian laws, electromagnetic fields, fluid dynamics, and thermodynamic reactions with real-time numeric calculations and 6DoF haptics.'
    }
  ];

  return (
    <section className="relative py-24 z-10 bg-gradient-to-b from-[#060913] via-[#090e1c] to-[#060913] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Glasses className="w-3.5 h-3.5" />
            Meta Quest & Oculus Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Experience{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              Virtual Reality
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Discover how spatial optics, 6-DoF inside-out tracking, and intuitive haptic controllers transform human learning into an unforgettable firsthand experience.
          </p>
        </div>

        {/* Centerpiece: Large Visual + Tech Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Interactive Hardware Breakdown Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Card 1: What VR headsets are */}
            <GlassCard className="p-6" glow="cyan">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Glasses className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white font-display">
                    What VR Headsets Are
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Head-mounted displays (HMDs) featuring ultra-high pixel density displays, wide field-of-view lenses, and integrated IMUs and cameras that monitor head rotations and translations at 90Hz to 120Hz without nausea.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Card 2: How controllers work */}
            <GlassCard className="p-6" glow="purple">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white font-display">
                    How VR Controllers Work
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Touch controllers utilize infrared constellations, capacitive finger sensors, and voice-coil localized haptic actuators that replicate tactile textures when grasping virtual objects or pressing buttons.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Card 3: Interaction in Virtual Worlds */}
            <GlassCard className="p-6" glow="cyan">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Hand className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white font-display">
                    Natural Environmental Interaction
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Users interact intuitively through direct hand physics, raycast teleports, two-handed manipulation of 3D anatomical organs, and spatial speech commands, removing traditional keyboard boundaries.
                  </p>
                </div>
              </div>
            </GlassCard>

          </div>

          {/* Right: Large Animated VR Visual & Callouts */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center p-8">
              
              {/* Outer HUD Rings */}
              <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-dashed border-purple-500/30 pointer-events-none" />

              {/* Central Premium VR Visual Display */}
              <div className="relative z-10 w-full rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#0a1020]/95 to-slate-950 p-8 border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.2)]">
                
                {/* Visual HUD Header */}
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 border-b border-white/10 pb-4 mb-6">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    META QUEST 3 OPTICAL ENGINE
                  </span>
                  <span className="text-purple-300">FOVs 110&deg; HORIZONTAL</span>
                </div>

                {/* VR Headset Artistic Render */}
                <div className="relative flex flex-col items-center py-4">
                  {/* Visor */}
                  <div className="w-64 h-32 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-cyan-400/80 shadow-[0_0_35px_rgba(0,240,255,0.35)] flex items-center justify-center relative overflow-hidden">
                    {/* Front RGB Passthrough Sensor array */}
                    <div className="absolute top-4 left-6 w-3.5 h-3.5 rounded-full bg-cyan-400/80 border border-white" />
                    <div className="absolute top-4 right-6 w-3.5 h-3.5 rounded-full bg-cyan-400/80 border border-white" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500/80 border border-white" />

                    {/* Dual Pancake Lenses */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-700 to-indigo-900 border-2 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/70 border border-cyan-200/50" />
                      </div>
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-700 to-indigo-900 border-2 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/70 border border-cyan-200/50" />
                      </div>
                    </div>
                  </div>

                  {/* Ergonomic Headband */}
                  <div className="w-72 h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-full -mt-2 border border-white/10" />

                  {/* Controller Hands */}
                  <div className="flex items-center justify-between w-full px-6 mt-6 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Gamepad2 className="w-4 h-4" /> Left Touch Pro
                    </span>
                    <span className="flex items-center gap-1 text-purple-400">
                      <Gamepad2 className="w-4 h-4" /> Right Touch Pro
                    </span>
                  </div>
                </div>

                {/* Floating Callout 1 */}
                <div className="absolute -top-4 -right-2 bg-slate-900/90 border border-cyan-400/50 rounded-xl px-3.5 py-2 text-xs font-mono text-cyan-300 shadow-xl backdrop-blur-md">
                  Pancake Optics &bull; 25 PPD
                </div>

                {/* Floating Callout 2 */}
                <div className="absolute -bottom-4 -left-2 bg-slate-900/90 border border-purple-400/50 rounded-xl px-3.5 py-2 text-xs font-mono text-purple-300 shadow-xl backdrop-blur-md">
                  Stereo Color Passthrough
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* 3 Real-World Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <GlassCard key={app.title} className="p-6" glow="cyan">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2">
                  {app.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {app.description}
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Section Action Button */}
        <div className="text-center">
          <button
            onClick={scrollToProjects}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-base shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Boxes className="w-5 h-5 text-white" />
            <span>Explore VR Projects</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};
