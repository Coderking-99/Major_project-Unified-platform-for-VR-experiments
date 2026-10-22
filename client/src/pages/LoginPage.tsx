import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/ToastNotification';
import { GlassCard } from '../components/common/GlassCard';
import {
  Boxes,
  Lock,
  User,
  LogIn,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, user, isAuthenticated, isOwner, isClient } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  // If already authenticated, redirect automatically
  useEffect(() => {
    if (isAuthenticated && user) {
      if (isOwner) {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    }
  }, [isAuthenticated, user, isOwner, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!username.trim() || !password) {
      setLocalError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    try {
      const loggedUser = await login({
        username: username.trim(),
        password
      });

      success(`Welcome back, ${loggedUser.username}!`);

      if (loggedUser.role === 'OWNER') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    } catch (err: any) {
      const msg = err.message || 'Invalid username or password. Please verify your credentials.';
      setLocalError(msg);
      toastError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_30px_rgba(0,240,255,0.3)] mb-2">
            <div className="w-full h-full bg-[#060913] rounded-[15px] flex items-center justify-center">
              <Boxes className="w-7 h-7 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Platform Authentication
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in with your Owner or Client credentials to continue
          </p>
        </div>

        {/* Login Card */}
        <GlassCard className="p-8 sm:p-10" glow="cyan">
          {localError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{localError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-slate-950" />
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-slate-950" />
                </>
              )}
            </button>
          </form>

          {/* Institutional Note */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Role-Based Secure Terminal</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Client accounts are issued and provisioned by the platform administrator. If you require testing credentials, contact the system owner.
            </p>
          </div>
        </GlassCard>

      </div>
    </div>
  );
};
