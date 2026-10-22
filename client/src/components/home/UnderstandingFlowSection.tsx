import React, { useState } from 'react';
import {
  Globe,
  Layers,
  Sparkles,
  Glasses,
  Network,
  ChevronRight,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const UnderstandingFlowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'real-world',
      title: 'REAL WORLD',
      tagline: 'Physical Reality',
      icon: Globe,
      color: 'emerald',
      borderColor: 'border-emerald-500',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      shortText: 'The baseline tangible physical realm governed by natural physics, unaugmented senses, and atomic matter.',
      keyAspects: ['Natural sensory input', 'Zero latency physics', 'Physical hardware constraints']
    },
    {
      id: 'ar',
      title: 'AR (Augmented Reality)',
      tagline: 'Digital Overlay',
      icon: Layers,
      color: 'cyan',
      borderColor: 'border-cyan-500',
      glowColor: 'rgba(0, 240, 255, 0.3)',
      shortText: 'Overlays interactive 3D holograms, directional HUDs, and live contextual annotations directly on top of the physical environment via smartphone or transparent smart glasses.',
      keyAspects: ['Physical world remains visible', 'Contextual telemetry & HUDs', 'Surface plane detection']
    },
    {
      id: 'mr',
      title: 'MR (Mixed Reality)',
      tagline: 'Physical-Digital Coexistence',
      icon: Sparkles,
      color: 'teal',
      borderColor: 'border-teal-500',
      glowColor: 'rgba(20, 184, 166, 0.3)',
      shortText: 'High-precision spatial anchors allow virtual objects to physically interact, occlude, and bounce off real tables, walls, and obstacles with dynamic lighting.',
      keyAspects: ['Real-time depth occlusion', 'Bouncing physics against physical walls', 'Spatial meshing & SLAM']
    },
    {
      id: 'vr',
      title: 'VR (Virtual Reality)',
      tagline: 'Total Digital Immersion',
      icon: Glasses,
      color: 'blue',
      borderColor: 'border-blue-500',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      shortText: 'Replaces physical sensory vision completely with a synthetic 360° 3D universe. Inside Meta Quest or PCVR, users navigate virtual laboratories, micro-anatomy, and deep-space simulations.',
      keyAspects: ['100% synthetic environment', '6-DoF head & controller tracking', 'Binaural 3D spatial audio']
    },
    {
      id: 'metaverse',
      title: 'METAVERSE',
      tagline: 'Interconnected Spatial Universe',
      icon: Network,
      color: 'purple',
      borderColor: 'border-purple-500',
      glowColor: 'rgba(168, 85, 247, 0.3)',
      shortText: 'A continuous, shared network of persistent 3D virtual spaces where global students, researchers, and creators collaborate with expressive digital avatars and real-time physics.',
      keyAspects: ['Persistent multi-user worlds', 'Cross-platform avatars & identities', 'Decentralized spatial economy']
    }
  ];

  return (
    <section id="arvr-info" className="relative py-24 z-10 overflow-hidden bg-[#070b16]/70 border-y border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            Reality-Virtuality Continuum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Understanding{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Immersive Technology
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Follow the evolutionary continuum from purely physical reality to fully interconnected metaverse simulations.
          </p>
        </div>

        {/* Horizontal Timeline Bar on Desktop / Stack on Mobile */}
        <div className="relative mb-12">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 rounded-full opacity-40 pointer-events-none" />

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl transition-all duration-300 backdrop-blur-xl border ${
                    isActive
                      ? `bg-slate-900/90 ${step.borderColor} scale-105`
                      : 'bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                  }`}
                  style={{ boxShadow: isActive ? `0 0 30px ${step.glowColor}` : undefined }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 ${
                      isActive
                        ? 'bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-lg scale-110'
                        : 'bg-slate-800/80 text-slate-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                    Step 0{idx + 1}
                  </span>
                  <span className={`text-sm font-bold font-display ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 sm:p-10" glow="purple">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    {steps[activeStep].tagline}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    STAGE {activeStep + 1} OF {steps.length}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {steps[activeStep].title}
                </h3>

                <p className="text-slate-300 text-base leading-relaxed">
                  {steps[activeStep].shortText}
                </p>

                <div className="pt-2 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Key Technical Highlights:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {steps[activeStep].keyAspects.map((aspect) => (
                      <div key={aspect} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{aspect}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-white/10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                  {React.createElement(steps[activeStep].icon, {
                    className: 'w-10 h-10 text-cyan-400 animate-pulse'
                  })}
                </div>
                <div className="text-sm font-bold text-white font-display">
                  Continuum Flow
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  {activeStep === 0 && 'Atomic Matter Reality'}
                  {activeStep === 1 && 'Real + Synthetic HUD'}
                  {activeStep === 2 && 'Anchored Hologram Physics'}
                  {activeStep === 3 && 'Synthetic Photoreal Space'}
                  {activeStep === 4 && 'Persistent Multi-User Network'}
                </div>

                <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                    className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1"
                  >
                    &larr; Prev
                  </button>
                  <span className="text-xs font-mono text-cyan-400">
                    0{activeStep + 1} / 05
                  </span>
                  <button
                    onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold px-2 py-1 flex items-center gap-1"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>

            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
};
