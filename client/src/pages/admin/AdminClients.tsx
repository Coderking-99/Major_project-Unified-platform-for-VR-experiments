import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { User, DownloadRecord } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { useToast } from '../../components/common/ToastNotification';
import {
  Users,
  UserPlus,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Download,
  CheckCircle2,
  XCircle,
  X,
  Loader2,
  Clock,
  History
} from 'lucide-react';

export const AdminClients: React.FC = () => {
  const { success, error } = useToast();
  const [clients, setClients] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Reset Password Modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedClientForReset, setSelectedClientForReset] = useState<User | null>(null);
  const [resetPasswordVal, setResetPasswordVal] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // Client Downloads Modal
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedClientHistory, setSelectedClientHistory] = useState<User | null>(null);
  const [clientDownloads, setClientDownloads] = useState<DownloadRecord[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const res = await api.admin.getClients();
      if (res.success && res.clients) {
        setClients(res.clients);
      }
    } catch (err: any) {
      error(err.message || 'Failed to load client accounts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim().length < 3) {
      error('Username must be at least 3 characters.');
      return;
    }
    if (newPassword.length < 6) {
      error('Temporary password must be at least 6 characters.');
      return;
    }

    setIsCreating(true);
    try {
      const res = await api.admin.createClient({
        username: newUsername.trim(),
        password: newPassword
      });

      if (res.success) {
        success(res.message);
        setShowCreateModal(false);
        setNewUsername('');
        setNewPassword('');
        await fetchClients();
      }
    } catch (err: any) {
      error(err.message || 'Error creating client account.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleStatus = async (client: User) => {
    try {
      const res = await api.admin.toggleClientStatus(client.id);
      if (res.success) {
        success(res.message);
        setClients((prev) =>
          prev.map((c) => (c.id === client.id ? { ...c, status: res.client.status } : c))
        );
      }
    } catch (err: any) {
      error(err.message || 'Failed to toggle client status.');
    }
  };

  const openResetModal = (client: User) => {
    setSelectedClientForReset(client);
    setResetPasswordVal('');
    setShowResetModal(true);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientForReset) return;
    if (resetPasswordVal.length < 6) {
      error('New password must be at least 6 characters.');
      return;
    }

    setIsResetting(true);
    try {
      const res = await api.admin.resetClientPassword(selectedClientForReset.id, resetPasswordVal);
      if (res.success) {
        success(res.message);
        setShowResetModal(false);
      }
    } catch (err: any) {
      error(err.message || 'Failed to reset password.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteClient = async (client: User) => {
    if (!window.confirm(`Are you sure you want to delete client "${client.username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await api.admin.deleteClient(client.id);
      if (res.success) {
        success(res.message);
        setClients((prev) => prev.filter((c) => c.id !== client.id));
      }
    } catch (err: any) {
      error(err.message || 'Failed to delete client.');
    }
  };

  const openDownloadHistory = async (client: User) => {
    setSelectedClientHistory(client);
    setShowHistoryModal(true);
    setIsLoadingHistory(true);
    try {
      const res = await api.admin.getClientDownloads(client.id);
      if (res.success && res.downloads) {
        setClientDownloads(res.downloads);
      }
    } catch (err: any) {
      error(err.message || 'Failed to fetch history.');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase">
            <Users className="w-3.5 h-3.5" />
            Access Authorization Controller
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            Client Account Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Create, authenticate, deactivate, and track download privileges for authorized client institutions.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Create Client Account</span>
        </button>
      </div>

      {/* Clients Table */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <h2 className="text-lg font-bold font-display text-white">
            Registered Clients ({clients.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="py-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : clients.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="text-sm">No client accounts created yet.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-3 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-semibold hover:bg-purple-500/30"
            >
              Create First Client
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Client Username</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Downloads Completed</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-white flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 text-xs">
                        {client.username.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{client.username}</span>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-slate-400">
                      CLIENT
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${
                          client.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {client.status === 'active' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-rose-400" />
                            Deactivated
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-cyan-300 font-bold">
                      {client.downloadCount ?? 0}
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-slate-400">
                      {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : 'N/A'}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Download History */}
                        <button
                          onClick={() => openDownloadHistory(client)}
                          title="View download history"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <History className="w-4 h-4" />
                        </button>

                        {/* Reset Password */}
                        <button
                          onClick={() => openResetModal(client)}
                          title="Reset client password"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>

                        {/* Toggle active / inactive */}
                        <button
                          onClick={() => handleToggleStatus(client)}
                          title={client.status === 'active' ? 'Deactivate account' : 'Activate account'}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        >
                          {client.status === 'active' ? (
                            <ShieldAlert className="w-4 h-4 text-amber-400" />
                          ) : (
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          )}
                        </button>

                        {/* Delete Client */}
                        <button
                          onClick={() => handleDeleteClient(client)}
                          title="Delete client account"
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {/* Create Client Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-400" />
                Create Client Account
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300">
                  Client Username *
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="e.g. stanford_vr_lab"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300">
                  Temporary Password * (min. 6 chars)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-xs hover:opacity-90 disabled:opacity-50"
                >
                  {isCreating ? 'Provisioning...' : 'Create Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && selectedClientForReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-amber-500/40 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-400" />
                Reset Client Password
              </h3>
              <button
                onClick={() => setShowResetModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Setting a new password for client: <span className="text-white font-mono font-bold">@{selectedClientForReset.username}</span>
            </p>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300">
                  New Password (min. 6 chars)
                </label>
                <input
                  type="password"
                  value={resetPasswordVal}
                  onChange={(e) => setResetPasswordVal(e.target.value)}
                  placeholder="Enter new temporary password"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResetting}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 disabled:opacity-50"
                >
                  {isResetting ? 'Saving...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client Download History Modal */}
      {showHistoryModal && selectedClientHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-cyan-400" />
                  Client Download Activity
                </h3>
                <p className="text-xs text-cyan-300 font-mono mt-0.5">
                  @{selectedClientHistory.username}
                </p>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isLoadingHistory ? (
              <div className="py-12 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              </div>
            ) : clientDownloads.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                No downloads completed yet by this client.
              </div>
            ) : (
              <div className="space-y-3">
                {clientDownloads.map((dl) => (
                  <div
                    key={dl.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{dl.projectName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Version {dl.apkVersion || '1.0.0'} &bull; IP: {dl.ipAddress}
                      </div>
                    </div>
                    <div className="text-right text-slate-400 font-mono text-[11px]">
                      {new Date(dl.downloadedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
