import React from 'react';
import { Link } from 'react-router-dom';
import {
  Boxes,
  Cpu,
  Glasses,
  Bot,
  Globe2,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#04060c] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand and description */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#060913] rounded-[11px] flex items-center justify-center">
                  <Boxes className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold font-display bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                AR/VR INNOVATION
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              "Exploring immersive technology through AR, VR, AI, Robotics and the Metaverse."
              Bridging next-generation spatial computing with educational simulations and secure Unity 2022 deployment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Unity 2022.3 LTS Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                <Glasses className="w-3.5 h-3.5 text-purple-400" />
                Meta Quest Ready
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#arvr-info" className="hover:text-cyan-400 transition-colors">AR & VR Technologies</a>
              </li>
              <li>
                <a href="#tech-showcase" className="hover:text-cyan-400 transition-colors">Tech Stack Behind</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">Immersive Projects</a>
              </li>
              <li>
                <a href="#metaverse" className="hover:text-cyan-400 transition-colors">Metaverse Lab</a>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1">
                  Portal Login <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosystem */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Technologies
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Glasses className="w-3.5 h-3.5 text-cyan-400" /> Oculus / Meta Quest
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-blue-400" /> Unity 2022 Engine
              </li>
              <li className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-purple-400" /> AI & Autonomous Robotics
              </li>
              <li className="flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-pink-400" /> Spatial Computing
              </li>
              <li className="flex items-center gap-2">
                <Boxes className="w-3.5 h-3.5 text-emerald-400" /> Blender 3D Workflows
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Access */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Security & Access
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Enterprise Unity APK distribution is protected with role-based access control and stream encryption.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div><span className="text-slate-300 font-medium">Owner Portal:</span> Administration</div>
              <div><span className="text-slate-300 font-medium">Client Portal:</span> Secure Downloads</div>
              <div className="pt-2 text-[11px] text-slate-500">
                Privacy Policy &bull; Terms of Service
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} AR/VR Innovation Platform. All rights reserved. Built for Next-Gen Spatial Education.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Security Protocol</span>
            <span>&bull;</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Unity 2022 Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
