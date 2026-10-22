import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { OverviewStats } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import {
  Users,
  Boxes,
  Download,
  Upload,
  ArrowUpRight,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await api.admin.getOverview();
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      console.error('Failed to load overview stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Administrative Command Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            System Overview
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Monitor client accounts, Unity 2022 APK distributions, and secure download metrics.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/apks"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
          >
            <Upload className="w-4 h-4 text-slate-950" />
            <span>Upload Unity APK</span>
          </Link>
          <Link
            to="/admin/clients"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-white font-semibold text-xs transition-colors"
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>Manage Clients</span>
          </Link>
        </div>
      </div>

      {/* 4 Metrics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Clients */}
        <GlassCard className="p-6" glow="cyan">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Total Clients
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-display text-white mt-4">
            {stats?.totalClients ?? 0}
          </div>
          <div className="text-[11px] text-cyan-300 font-mono mt-1">
            Authorized Institutional Accounts
          </div>
        </GlassCard>

        {/* Total APKs */}
        <GlassCard className="p-6" glow="purple">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Total Unity APKs
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-display text-white mt-4">
            {stats?.totalApks ?? 0}
          </div>
          <div className="text-[11px] text-purple-300 font-mono mt-1">
            {stats?.publishedApks ?? 0} Applications Published
          </div>
        </GlassCard>

        {/* Total Downloads */}
        <GlassCard className="p-6" glow="cyan">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Total Downloads
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-display text-white mt-4">
            {stats?.totalDownloads ?? 0}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            Audited & Stream Verified
          </div>
        </GlassCard>

        {/* Engine Standard */}
        <GlassCard className="p-6" glow="cyan">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              XR Engine Standard
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold font-display text-white mt-4">
            Unity 2022.3
          </div>
          <div className="text-[11px] text-blue-300 font-mono mt-1">
            Android NDK / Quest 6DoF
          </div>
        </GlassCard>

      </div>

      {/* Two Columns: Recent Uploads + Recent Downloads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recently Uploaded APKs (7 Cols) */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Boxes className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold font-display text-white">
                  Recently Uploaded APKs
                </h2>
              </div>
              <Link
                to="/admin/apks"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>View All APKs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {stats?.recentUploads && stats.recentUploads.length > 0 ? (
              <div className="space-y-3">
                {stats.recentUploads.map((apk) => (
                  <div
                    key={apk.id}
                    className="p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {apk.projectName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                            apk.status === 'published'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {apk.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-1">
                        Version {apk.version} &bull; Unity {apk.unityVersion} &bull;{' '}
                        {(apk.fileSize / (1024 * 1024)).toFixed(1)} MB
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-xs font-bold text-cyan-300 font-mono">
                          {apk.downloadCount} downloads
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {new Date(apk.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm">
                No APKs uploaded yet. Click "Upload Unity APK" to begin.
              </div>
            )}
          </GlassCard>
        </div>

        {/* Live Download Audit Activity (5 Cols) */}
        <div className="lg:col-span-5">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold font-display text-white">
                  Recent Downloads
                </h2>
              </div>
              <Link
                to="/admin/downloads"
                className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <span>Full Audit Log</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {stats?.recentDownloads && stats.recentDownloads.length > 0 ? (
              <div className="space-y-3">
                {stats.recentDownloads.map((dl) => (
                  <div
                    key={dl.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{dl.projectName}</span>
                      <span className="font-mono text-[10px] text-cyan-400">
                        @{dl.username}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>IP: {dl.ipAddress || '127.0.0.1'}</span>
                      <span>{new Date(dl.downloadedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm">
                No download activity recorded yet.
              </div>
            )}
          </GlassCard>
        </div>

      </div>

    </div>
  );
};
