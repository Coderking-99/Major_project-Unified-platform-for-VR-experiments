import React, { useEffect, useState, useRef } from 'react';
import { api } from '../../services/api';
import { Apk } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { useToast } from '../../components/common/ToastNotification';
import {
  Boxes,
  Upload,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Edit,
  Download,
  AlertCircle,
  FileCode,
  Image,
  Loader2,
  CheckCircle2,
  X,
  Sparkles,
  Layers
} from 'lucide-react';

export const AdminApks: React.FC = () => {
  const { success, error } = useToast();
  const [apks, setApks] = useState<Apk[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Upload/Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingApk, setEditingApk] = useState<Apk | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [projectName, setProjectName] = useState('');
  const [apkName, setApkName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [unityVersion, setUnityVersion] = useState('2022.3 LTS');
  const [description, setDescription] = useState('');
  const [publishStatus, setPublishStatus] = useState<'published' | 'unpublished'>('published');
  
  // Files
  const [selectedApkFile, setSelectedApkFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const thumbInputRef = useRef<HTMLInputElement | null>(null);

  const fetchApks = async () => {
    setIsLoading(true);
    try {
      const res = await api.admin.getApks();
      if (res.success && res.apks) {
        setApks(res.apks);
      }
    } catch (err: any) {
      error(err.message || 'Failed to load APKs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApks();
  }, []);

  const openCreateModal = () => {
    setEditingApk(null);
    setProjectName('');
    setApkName('');
    setVersion('1.0.0');
    setUnityVersion('2022.3 LTS');
    setDescription('');
    setPublishStatus('published');
    setSelectedApkFile(null);
    setSelectedThumbnail(null);
    setShowModal(true);
  };

  const openEditModal = (apk: Apk) => {
    setEditingApk(apk);
    setProjectName(apk.projectName);
    setApkName(apk.apkName);
    setVersion(apk.version);
    setUnityVersion(apk.unityVersion);
    setDescription(apk.description);
    setPublishStatus(apk.status || 'published');
    setSelectedApkFile(null);
    setSelectedThumbnail(null);
    setShowModal(true);
  };

  const handleApkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.toLowerCase().endsWith('.apk')) {
        error('Invalid file format. Only .apk files generated from Unity 2022 are accepted.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        setSelectedApkFile(null);
        return;
      }
      setSelectedApkFile(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        error('Please select a valid image file (JPG, PNG, WebP).');
        if (thumbInputRef.current) thumbInputRef.current.value = '';
        setSelectedThumbnail(null);
        return;
      }
      setSelectedThumbnail(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim() || !apkName.trim()) {
      error('Please enter project name and APK name.');
      return;
    }

    if (!editingApk && !selectedApkFile) {
      error('Please select a Unity .apk file to upload.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('projectName', projectName.trim());
      formData.append('apkName', apkName.trim());
      formData.append('version', version.trim());
      formData.append('unityVersion', unityVersion.trim());
      formData.append('description', description.trim());
      formData.append('status', publishStatus);

      if (selectedApkFile) {
        formData.append('apkFile', selectedApkFile);
      }
      if (selectedThumbnail) {
        formData.append('thumbnail', selectedThumbnail);
      }

      if (editingApk) {
        const res = await api.admin.updateApk(editingApk.id, formData);
        if (res.success) {
          success('APK details updated successfully.');
          setShowModal(false);
          await fetchApks();
        }
      } else {
        const res = await api.admin.uploadApk(formData);
        if (res.success) {
          success('Unity 2022 APK uploaded and published successfully.');
          setShowModal(false);
          await fetchApks();
        }
      }
    } catch (err: any) {
      error(err.message || 'Error processing APK upload.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (apk: Apk) => {
    try {
      const res = await api.admin.togglePublish(apk.id);
      if (res.success) {
        success(res.message);
        setApks((prev) =>
          prev.map((a) => (a.id === apk.id ? { ...a, status: res.apk.status } : a))
        );
      }
    } catch (err: any) {
      error(err.message || 'Failed to toggle status.');
    }
  };

  const handleDeleteApk = async (apk: Apk) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${apk.projectName}" and its binary APK file from server storage?`)) {
      return;
    }

    try {
      const res = await api.admin.deleteApk(apk.id);
      if (res.success) {
        success(res.message);
        setApks((prev) => prev.filter((a) => a.id !== apk.id));
      }
    } catch (err: any) {
      error(err.message || 'Failed to delete APK.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
            <Boxes className="w-3.5 h-3.5" />
            Unity 2022 Distribution Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            APK Application Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Upload, validate, version-tag, and publish standalone Android APK packages generated from Unity 2022.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>Upload Unity APK</span>
        </button>
      </div>

      {/* APK List Table & Mobile Cards */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold font-display text-white">
              Registered Applications ({apks.length})
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        ) : apks.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Boxes className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p className="text-sm">No Unity APKs found in repository.</p>
            <button
              onClick={openCreateModal}
              className="mt-3 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30"
            >
              Upload First Application
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Project & APK Name</th>
                  <th className="py-3 px-4">Unity Engine</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Downloads</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {apks.map((apk) => (
                  <tr key={apk.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-bold text-white text-sm">
                          {apk.projectName}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {apk.apkName}.apk
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-cyan-300">
                      {apk.unityVersion || '2022.3 LTS'}
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-purple-300">
                      v{apk.version}
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-slate-400">
                      {(apk.fileSize / (1024 * 1024)).toFixed(1)} MB
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold ${
                          apk.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {apk.status === 'published' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Published
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3 text-amber-400" />
                            Unpublished
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-white font-bold">
                      {apk.downloadCount}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Toggle publish */}
                        <button
                          onClick={() => handleTogglePublish(apk)}
                          title={apk.status === 'published' ? 'Unpublish from clients' : 'Publish to clients'}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        >
                          {apk.status === 'published' ? (
                            <EyeOff className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-emerald-400" />
                          )}
                        </button>

                        {/* Edit metadata */}
                        <button
                          onClick={() => openEditModal(apk)}
                          title="Edit application details"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete APK */}
                        <button
                          onClick={() => handleDeleteApk(apk)}
                          title="Delete APK"
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

      {/* Upload / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  {editingApk ? 'Edit APK Details' : 'Upload Unity 2022 APK'}
                </h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">
                  Target Architecture: Android Standalone (Meta Quest 2/3/Pro)
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Name */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-300">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Human Heart Blood Circulation"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* APK File Base Name */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-300">
                    APK Package Name *
                  </label>
                  <input
                    type="text"
                    value={apkName}
                    onChange={(e) => setApkName(e.target.value)}
                    placeholder="e.g. HeartCirculation_VR"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Unity Version */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-300">
                    Unity Version
                  </label>
                  <input
                    type="text"
                    value={unityVersion}
                    onChange={(e) => setUnityVersion(e.target.value)}
                    placeholder="2022.3 LTS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* APK Version */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-300">
                    APK Version
                  </label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="1.0.0"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-300">
                    Initial Status
                  </label>
                  <select
                    value={publishStatus}
                    onChange={(e: any) => setPublishStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                  >
                    <option value="published">Published (Client Access)</option>
                    <option value="unpublished">Unpublished (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-slate-300">
                  Application Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe simulation mechanics, controls, and learning objectives..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* APK File Selector */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-dashed border-cyan-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <FileCode className="w-4 h-4" />
                    <span>Unity .APK Binary File {editingApk ? '(Optional)' : '*'}</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".apk"
                    onChange={handleApkFileChange}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                  />
                  {selectedApkFile && (
                    <div className="text-[11px] text-emerald-400 font-mono">
                      Selected: {selectedApkFile.name} ({(selectedApkFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </div>
                  )}
                  {editingApk && !selectedApkFile && (
                    <div className="text-[11px] text-slate-500 font-mono">
                      Current: {editingApk.originalName || editingApk.fileName}
                    </div>
                  )}
                </div>

                {/* Optional Thumbnail Selector */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-dashed border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                    <Image className="w-4 h-4" />
                    <span>Thumbnail Cover (Optional)</span>
                  </div>
                  <input
                    ref={thumbInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 cursor-pointer"
                  />
                  {selectedThumbnail && (
                    <div className="text-[11px] text-purple-300 font-mono">
                      Selected: {selectedThumbnail.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Saving Application...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-slate-950" />
                      <span>{editingApk ? 'Update APK Details' : 'Upload Application'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
