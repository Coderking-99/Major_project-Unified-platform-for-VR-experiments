export type UserRole = 'OWNER' | 'CLIENT';
export type UserStatus = 'active' | 'inactive';
export type ApkStatus = 'published' | 'unpublished';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  mustChangePassword?: boolean;
  downloadCount?: number;
  createdAt?: string;
}

export interface Apk {
  id: string;
  projectName: string;
  apkName: string;
  description: string;
  version: string;
  unityVersion: string;
  fileSize: number;
  fileName?: string;
  thumbnail?: string;
  status?: ApkStatus;
  uploadedBy?: string;
  downloadCount: number;
  createdAt: string;
  updatedAt?: string;
  originalName?: string;
}

export interface DownloadRecord {
  id: string;
  userId: string;
  username: string;
  apkId: string;
  projectName: string;
  apkVersion?: string;
  ipAddress?: string;
  userAgent?: string;
  downloadedAt: string;
}

export interface OverviewStats {
  totalClients: number;
  totalApks: number;
  publishedApks: number;
  totalDownloads: number;
  recentUploads: Apk[];
  recentDownloads: DownloadRecord[];
}

export interface ProjectShowcase {
  id: string;
  title: string;
  subtitle: string;
  category: 'AR' | 'VR' | 'MR' | 'AI & Robotics';
  description: string;
  details: string;
  technologies: string[];
  unityVersion: string;
  targetHardware: string[];
  keyFeatures: string[];
  learningOutcomes: string[];
  image: string;
  badge?: string;
}
