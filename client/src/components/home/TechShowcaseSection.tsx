import React from 'react';
import { GlassCard } from '../common/GlassCard';
import {
  Glasses,
  Bot,
  Box,
  Palette,
  Layers,
  Brain,
  Globe2,
  FlaskConical,
  Radio,
  Cpu,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TechShowcaseSection: React.FC = () => {
  const technologies = [
    {
      id: 'oculus',
      title: 'Oculus / Meta Quest',
      category: 'Headset Hardware',
      description: 'High-density fast-switch LCD & pancake optics delivering 4K resolution, touch controllers with sub-millimeter tracking and capacitive finger sensing.',
      icon: Glasses,
      specs: 'Quest 2 / 3 / Pro & Touch Pro Controllers',
      gradient: 'from-cyan-500/20 to-blue-600/20',
      badge: 'Hardware'
    },
    {
      id: 'ai-robot',
      title: 'AI Robotics & Kinematics',
      category: 'Autonomous Systems',
      description: 'Dynamic forward and inverse kinematics (IK), path planning, and computer vision algorithms simulating industrial robotic automation in real time.',
      icon: Bot,
      specs: '6-DOF Articulated Arms & Sensor Simulation',
      gradient: 'from-purple-500/20 to-pink-600/20',
      badge: 'Automation'
    },
    {
      id: 'unity',
      title: 'Unity 2022 LTS Engine',
      category: 'XR Simulation Engine',
      description: 'The core runtime powering spatial computing. Leverages Universal Render Pipeline (URP), XR Interaction Toolkit, and Android NDK compilation for standalone Quest APKs.',
      icon: Box,
      specs: 'Unity 2022.3 LTS // Android Build Target',
      gradient: 'from-blue-500/20 to-cyan-600/20',
      badge: 'Core Engine'
    },
    {
      id: 'blender',
      title: 'Blender 3D Modeling & Rigging',
      category: 'Asset Creation',
      description: 'Open-source polygonal modeling, organic sculpting, bone rigging, and weight painting. Optimized for low-draw-call XR performance through LOD meshes.',
      icon: Palette,
      specs: 'Subdivision, PBR Texturing, glTF/FBX',
      gradient: 'from-amber-500/20 to-orange-600/20',
      badge: 'Asset Pipeline'
    },
    {
      id: '3d-models',
      title: '3D Spatial Geometry & CAD',
      category: 'Asset Optimization',
      description: 'High-fidelity anatomical and engineering models converted through mesh decimation, normal map baking, and texture atlasing to run at solid 90Hz in VR.',
      icon: Layers,
      specs: 'Nanite-level detail baked to mobile XR',
      gradient: 'from-emerald-500/20 to-teal-600/20',
      badge: '3D Pipeline'
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence & Vision',
      category: 'Perception AI',
      description: 'Deep neural networks running on edge devices for spatial voice command recognition, hand gesture classification, and procedural environment generation.',
      icon: Brain,
      specs: 'Edge Tensor Inferences & Real-time CV',
      gradient: 'from-violet-500/20 to-indigo-600/20',
      badge: 'Machine Learning'
    },
    {
      id: 'metaverse',
      title: 'Metaverse & WebXR',
      category: 'Decentralized Network',
      description: 'Interoperable multi-user spatial spaces connected over low-latency WebRTC data channels. Enabling virtual lectures, joint research, and digital human avatars.',
      icon: Globe2,
      specs: 'Persistent Spatial Graph & Multi-User Netcode',
      gradient: 'from-pink-500/20 to-purple-600/20',
      badge: 'Spatial Network'
    },
    {
      id: 'virtual-lab',
      title: 'Virtual Laboratories',
      category: 'STEM Simulation',
      description: 'Hazard-free interactive simulations replicating expensive chemistry glassware, bio-hazards, particle accelerators, and micro-electromagnetic fields.',
      icon: FlaskConical,
      specs: 'Accurate Molecular & Thermodynamic Solvers',
      gradient: 'from-teal-500/20 to-emerald-600/20',
      badge: 'Education'
    },
    {
      id: 'holographic',
      title: 'Holographic Technology',
      category: 'Spatial Visualization',
      description: 'Volumetric light-field capture and holographic projection techniques that display authentic 3D spatial parallax without physical stereoscopic eye fatigue.',
      icon: Radio,
      specs: 'Volumetric Meshing & Depth Interferometry',
      gradient: 'from-cyan-500/20 to-sky-600/20',
      badge: 'Optics'
    }
  ];

  return (
    <section id="tech-showcase" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            Engineering & Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Technology Behind{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              Immersive Experiences
            </span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            The sophisticated convergence of optics, graphics engines, machine learning, and physical robotics powering our immersive ecosystem.
          </p>
        </div>

        {/* 9-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <GlassCard
                key={tech.id}
                className="p-6 flex flex-col justify-between group relative overflow-hidden"
                glow="cyan"
              >
                {/* Background gradient orb */}
                <div
                  className={`absolute -right-8 -top-8 w-40 h-40 rounded-full bg-gradient-to-br ${tech.gradient} blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:border-cyan-400/50 transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                      {tech.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-mono text-cyan-400/90 uppercase tracking-wider mb-1">
                      {tech.category}
                    </div>
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-2.5 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>

                {/* Specs Box */}
                <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500">SPEC:</span>
                    <span className="text-cyan-300 font-semibold">{tech.specs}</span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
