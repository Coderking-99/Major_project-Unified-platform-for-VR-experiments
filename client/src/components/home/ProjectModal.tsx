import React from 'react';
import { ProjectShowcase } from '../../types';
import {
  X,
  Boxes,
  Cpu,
  Glasses,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Download,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProjectModalProps {
  project: ProjectShowcase | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { isAuthenticated, isClient, isOwner } = useAuth();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900/95 border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.25)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {project.category}
              </span>
              <span className="text-xs font-mono text-purple-400">
                Unity {project.unityVersion}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {project.title}
            </h2>
            <p className="text-sm text-cyan-300/80 font-mono mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 pt-6">
          
          {/* Visual Showcase Block */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#070e1c] p-6 border border-white/10 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Interactive Simulation Environment
                </div>
                <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                  {project.details}
                </p>
              </div>

              {/* Holographic Simulation Emblem */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/50 flex flex-col items-center justify-center text-cyan-300 shadow-lg shrink-0">
                <Boxes className="w-10 h-10 animate-bounce" />
                <span className="text-[10px] font-mono uppercase mt-1">6DoF XR</span>
              </div>
            </div>
          </div>

          {/* Technical Specs & Hardware Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Glasses className="w-4 h-4 text-cyan-400" />
                Target Hardware
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.targetHardware.map((hw) => (
                  <span key={hw} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-slate-200 border border-white/10">
                    {hw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                Technology Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-500/10 text-purple-200 border border-purple-500/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-display">
              Core Interactive Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Outcomes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-display flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Educational Learning Objectives
            </h4>
            <div className="space-y-1.5">
              {project.learningOutcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400">
              Build Format: <span className="text-cyan-300">Unity 2022 Standalone APK (.apk)</span>
            </div>

            {isClient ? (
              <Link
                to="/client"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25"
              >
                <Download className="w-4 h-4" />
                <span>Download APK in Client Portal</span>
              </Link>
            ) : isOwner ? (
              <Link
                to="/admin/apks"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-sm font-semibold"
              >
                <Boxes className="w-4 h-4" />
                <span>Manage APK in Admin Portal</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20"
              >
                <span>Login as Client to Download APK</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
