import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { DownloadRecord } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import {
  Download,
  ShieldCheck,
  Search,
  User,
  Clock,
  Globe,
  Loader2,
  RefreshCw
} from 'lucide-react';

export const AdminDownloads: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDownloads = async () => {
    setIsLoading(true);
    try {
      const res = await api.admin.getDownloads();
      if (res.success && res.downloads) {
        setDownloads(res.downloads);
      }
    } catch (err) {
      console.error('Failed to load downloads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const filtered = downloads.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.projectName.toLowerCase().includes(q) ||
      d.username.toLowerCase().includes(q) ||
      (d.ipAddress && d.ipAddress.includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Cryptographic Audit Stream
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            Download Audit Logs
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Complete real-time verification record of all Unity APK downloads executed by authorized clients.
          </p>
        </div>

        <button
          onClick={fetchDownloads}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* Filter & Table Container */}
      <GlassCard className="p-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project, client username, or IP..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="text-xs font-mono text-slate-400">
            Total Audited: <span className="text-cyan-300 font-bold">{downloads.length}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Download className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="text-sm">No download events matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Authorized Client</th>
                  <th className="py-3 px-4">Application Package</th>
                  <th className="py-3 px-4">Target Version</th>
                  <th className="py-3 px-4">Client IP Address</th>
                  <th className="py-3 px-4">Security Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-slate-300 whitespace-nowrap">
                      {new Date(record.downloadedAt).toLocaleString()}
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px]">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span>@{record.username}</span>
                    </td>

                    <td className="py-4 px-4 font-bold text-cyan-300 text-sm">
                      {record.projectName}
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-purple-300">
                      v{record.apkVersion || '1.0.0'}
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-slate-400">
                      {record.ipAddress || '127.0.0.1'}
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3" />
                        Authenticated Stream
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

    </div>
  );
};
