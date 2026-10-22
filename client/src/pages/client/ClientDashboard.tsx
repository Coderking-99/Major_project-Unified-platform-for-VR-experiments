import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Apk } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { useToast } from '../../components/common/ToastNotification';
import {
  Boxes,
  Download,
  ShieldCheck,
  Glasses,
  Cpu,
  Clock,
  Sparkles,
  Loader2,
  HardDrive,
  FileCode,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [apks, setApks] = useState<Apk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const fetchPublishedApks = async () => {
    setIsLoading(true);
    try {
      const res = await api.client.getApks();
      if (res.success && res.apks) {
        setApks(res.apks);
      }
    } catch (err: any) {
      error(err.message || 'Failed to load applications.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedApks();
  }, []);

  const handleDownload = async (apk: Apk) => {
    setDownloadingId(apk.id);
    try {
      const filename = `${apk.apkName || apk.projectName.replace(/\s+/g, '_')}_v${apk.version}.apk`;
      await api.client.downloadApk(apk.id, filename);
      success(`Download started for "${apk.projectName}". File will save to your device.`);
      
      // Locally increment download counter for instant feedback
      setApks((prev) =>
        prev.map((a) => (a.id === apk.id ? { ...a, downloadCount: a.downloadCount + 1 } : a))
      );
    } catch (err: any) {
      error(err.message || 'Download failed. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/90 via-purple-950/30 to-slate-900/90 border border-purple-500/30 p-8 sm:p-10 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase">
              <Glasses className="w-3.5 h-3.5 text-purple-400" />
              Authorized Client Portal &bull; Meta Quest Hub
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Welcome to Your AR/VR Applications
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Hello, <span className="text-cyan-300 font-bold font-mono">@{user?.username}</span>. You have authorized download privileges for verified Unity 2022 APK applications. Transfer downloaded packages directly to your Meta Quest 2/3/Pro headset via SideQuest or ADB.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-center">
              <div className="text-xs font-mono text-slate-400">Available Apps</div>
              <div className="text-2xl font-bold font-display text-cyan-400">{apks.length}</div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-white/10 text-center">
              <div className="text-xs font-mono text-slate-400">Engine Spec</div>
              <div className="text-xs font-bold font-mono text-purple-300 mt-1">Unity 2022.3 LTS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">
            Published Application Packages
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Standalone `.apk` packages compiled for Meta Quest architecture.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Stream Active</span>
        </div>
      </div>

      {/* APK Cards Grid */}
      {isLoading ? (
        <div className="py-24 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      ) : apks.length === 0 ? (
        <div className="py-20 text-center text-slate-500 rounded-3xl bg-slate-900/40 border border-white/10 p-8">
          <Boxes className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <h3 className="text-base font-bold text-white mb-1">No Applications Available</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            The platform owner has not published any Unity APK packages yet. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apks.map((apk) => {
            const isDownloading = downloadingId === apk.id;
            const fileSizeMb = (apk.fileSize / (1024 * 1024)).toFixed(1);

            return (
              <GlassCard
                key={apk.id}
                className="p-6 flex flex-col justify-between group overflow-hidden"
                glow="cyan"
              >
                <div className="space-y-4">
                  {/* Top Bar: Icon + Version */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shadow-lg">
                      <Boxes className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
                        v{apk.version}
                      </span>
                      <div className="text-[10px] font-mono text-slate-500 mt-1">
                        Unity {apk.unityVersion}
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {apk.projectName}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">
                      {apk.apkName}.apk
                    </p>
                    <p className="text-slate-300 text-xs mt-3 line-clamp-3 leading-relaxed">
                      {apk.description || 'Interactive spatial simulation built for Oculus / Meta Quest.'}
                    </p>
                  </div>

                  {/* Metadata Specs */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5">
                      <div className="text-slate-500 text-[10px]">FILE SIZE</div>
                      <div className="text-slate-200 font-bold flex items-center gap-1 mt-0.5">
                        <HardDrive className="w-3 h-3 text-cyan-400" />
                        {fileSizeMb} MB
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5">
                      <div className="text-slate-500 text-[10px]">TARGET</div>
                      <div className="text-slate-200 font-bold flex items-center gap-1 mt-0.5">
                        <Glasses className="w-3 h-3 text-purple-400" />
                        Meta Quest
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Button: Secure Download */}
                <div className="pt-6 mt-4 border-t border-white/10 space-y-2">
                  <button
                    onClick={() => handleDownload(apk)}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Streaming Package...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-slate-950" />
                        <span>Download APK ({fileSizeMb} MB)</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                    <span>Uploaded: {new Date(apk.createdAt).toLocaleDateString()}</span>
                    <span>{apk.downloadCount} Total Downloads</span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Sideloading Guidance Section */}
      <div className="mt-16 p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-bold font-display text-white mb-2 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-cyan-400" />
          Meta Quest Installation / Sideloading Instructions
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-4">
          Once you download the Unity 2022 `.apk` file to your PC or Mac, follow these steps to install it directly onto your headset:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
            <div className="font-bold text-cyan-300 font-mono">STEP 1: Enable Dev Mode</div>
            <p className="text-slate-400">
              Open the Meta Horizon app on your mobile phone, navigate to Headset Settings &rarr; Developer Mode and enable it.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
            <div className="font-bold text-cyan-300 font-mono">STEP 2: Connect USB-C Cable</div>
            <p className="text-slate-400">
              Connect your Meta Quest 2/3/Pro headset to your computer using a USB-C link cable. Accept the debugging prompt inside the headset.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
            <div className="font-bold text-cyan-300 font-mono">STEP 3: Sideload via SideQuest / ADB</div>
            <p className="text-slate-400">
              Drag and drop the downloaded `.apk` into SideQuest or run <code className="text-cyan-400 font-mono">adb install package.apk</code>. Find it in your headset under "Unknown Sources".
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
