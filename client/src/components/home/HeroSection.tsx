import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Boxes,
  LogIn,
  Glasses,
  Bot,
  Sparkles,
  Zap,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-br from-cyan-500/15 via-purple-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Next-Gen Spatial Computing & Education</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display leading-[1.15]">
              Explore the Future of{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                Immersive
              </span>{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Technology
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover <span className="text-cyan-300 font-semibold">AR</span>,{' '}
              <span className="text-blue-300 font-semibold">VR</span>,{' '}
              <span className="text-purple-300 font-semibold">AI</span>,{' '}
              <span className="text-indigo-300 font-semibold">Robotics</span> and the{' '}
              <span className="text-pink-300 font-semibold">Metaverse</span> through interactive educational experiences and secure Unity 2022 APK distributions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollTo('arvr-info')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Compass className="w-4 h-4 text-slate-950" />
                <span>Explore AR/VR</span>
              </button>

              <button
                onClick={() => scrollTo('projects')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-white font-semibold text-sm border border-cyan-500/30 hover:border-cyan-400/70 shadow-lg backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Boxes className="w-4 h-4 text-cyan-400" />
                <span>Explore Projects</span>
              </button>

              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-sm border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <LogIn className="w-4 h-4 text-purple-400" />
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-400" />
              </Link>
            </div>

            {/* Platform Highlights Tickers */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl font-bold font-display text-cyan-400">Unity 2022</div>
                <div className="text-xs text-slate-400 font-mono">Verified APK Pipeline</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-purple-400">Meta Quest</div>
                <div className="text-xs text-slate-400 font-mono">2 / 3 / Pro Compatible</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-emerald-400">6-DoF</div>
                <div className="text-xs text-slate-400 font-mono">Spatial Precision</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Futuristic Holographic VR Rig & AI Robot (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Container */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Rotating Hologram Rings */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-dashed border-purple-500/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '24s' }} />
              <div className="absolute inset-16 rounded-full border border-cyan-400/20" />

              {/* Central Holographic VR Headset & Robot Element */}
              <div className="relative z-10 w-72 sm:w-80 h-72 sm:h-80 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0b1120]/95 backdrop-blur-2xl border border-cyan-500/30 p-6 flex flex-col items-center justify-between shadow-[0_0_50px_rgba(0,240,255,0.2)] animate-float">
                
                {/* Top HUD bar */}
                <div className="w-full flex items-center justify-between text-[11px] font-mono text-cyan-400 border-b border-white/10 pb-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    XR_ENGINE_ONLINE
                  </span>
                  <span className="text-purple-400 font-semibold">60 FPS // 4K PER EYE</span>
                </div>

                {/* Central Holographic VR Visor Illustration */}
                <div className="relative my-auto flex flex-col items-center group">
                  {/* Visor Core */}
                  <div className="w-48 h-24 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-950 border-2 border-cyan-400/70 flex items-center justify-center p-2 shadow-[0_0_30px_rgba(0,240,255,0.4)] relative overflow-hidden">
                    {/* Glowing Dual Optics */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-300/80 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.7)] mx-2">
                      <div className="w-6 h-6 rounded-full bg-black/60 border border-white/40 animate-pulse" />
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-300/80 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.7)] mx-2">
                      <div className="w-6 h-6 rounded-full bg-black/60 border border-white/40 animate-pulse" />
                    </div>
                    {/* Holographic light scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse" />
                  </div>

                  {/* Headset Strap & Mount */}
                  <div className="w-56 h-3 bg-slate-800/80 rounded-full -mt-1.5 border border-white/10" />

                  <div className="mt-3 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Glasses className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Oculus / Meta Quest Platform</span>
                  </div>
                </div>

                {/* Bottom Spec Footer */}
                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-purple-400" /> AI Inverse Kinematics
                  </span>
                  <span className="text-cyan-300 font-bold">LOW LATENCY</span>
                </div>
              </div>

              {/* Floating Widget 1: Spatial Telemetry */}
              <div className="absolute -top-4 -left-4 sm:top-2 sm:-left-6 z-20 px-3.5 py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 shadow-xl flex items-center gap-2.5 animate-float" style={{ animationDelay: '1s' }}>
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Tracking</div>
                  <div className="text-xs font-bold text-white">Inside-Out 6DoF</div>
                </div>
              </div>

              {/* Floating Widget 2: AI Neural Sync */}
              <div className="absolute -bottom-4 -right-4 sm:bottom-2 sm:-right-6 z-20 px-3.5 py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-purple-500/40 shadow-xl flex items-center gap-2.5 animate-float" style={{ animationDelay: '2.5s' }}>
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">AI Perception</div>
                  <div className="text-xs font-bold text-white">Hand Mesh Sync</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
