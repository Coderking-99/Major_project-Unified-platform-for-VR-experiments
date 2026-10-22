import { User } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Helper to get auth header
const getAuthHeaders = (isFormData: boolean = false): HeadersInit => {
  const token = localStorage.getItem('arvr_token');
  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

// Generic fetch wrapper with error handling
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, options);

  if (response.status === 401) {
    // If unauthorized, clear token and emit custom event or redirect
    localStorage.removeItem('arvr_token');
    localStorage.removeItem('arvr_user');
  }

  const data = await response.json().catch(() => ({
    success: false,
    message: 'An unexpected response was received from the server.'
  }));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data as T;
}

export const api = {
  // Auth API
  auth: {
    async login(credentials: { username: string; password: string }) {
      return request<{
        success: boolean;
        message: string;
        token: string;
        user: User;
      }>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
    },

    async getMe() {
      return request<{
        success: boolean;
        user: User;
      }>('/auth/me', {
        headers: getAuthHeaders()
      });
    },

    async changePassword(passwords: { currentPassword?: string; newPassword: string }) {
      return request<{ success: boolean; message: string }>('/auth/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(passwords)
      });
    }
  },

  // Admin API (Owner only)
  admin: {
    async getOverview() {
      return request<{ success: boolean; stats: any }>('/admin/overview', {
        headers: getAuthHeaders()
      });
    },

    async getApks() {
      return request<{ success: boolean; apks: any[] }>('/admin/apks', {
        headers: getAuthHeaders()
      });
    },

    async uploadApk(formData: FormData) {
      return request<{ success: boolean; message: string; apk: any }>('/admin/apks', {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: formData
      });
    },

    async updateApk(id: string, formData: FormData) {
      return request<{ success: boolean; message: string; apk: any }>(`/admin/apks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(true),
        body: formData
      });
    },

    async togglePublish(id: string) {
      return request<{ success: boolean; message: string; apk: any }>(`/admin/apks/${id}/publish`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
    },

    async deleteApk(id: string) {
      return request<{ success: boolean; message: string }>(`/admin/apks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    },

    async getClients() {
      return request<{ success: boolean; clients: any[] }>('/admin/clients', {
        headers: getAuthHeaders()
      });
    },

    async createClient(data: { username: string; password: string }) {
      return request<{ success: boolean; message: string; client: any }>('/admin/clients', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
    },

    async toggleClientStatus(id: string) {
      return request<{ success: boolean; message: string; client: any }>(`/admin/clients/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
    },

    async resetClientPassword(id: string, newPassword: string) {
      return request<{ success: boolean; message: string }>(`/admin/clients/${id}/reset-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ newPassword })
      });
    },

    async deleteClient(id: string) {
      return request<{ success: boolean; message: string }>(`/admin/clients/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    },

    async getClientDownloads(id: string) {
      return request<{ success: boolean; client: any; downloads: any[] }>(`/admin/clients/${id}/downloads`, {
        headers: getAuthHeaders()
      });
    },

    async getDownloads() {
      return request<{ success: boolean; downloads: any[] }>('/admin/downloads', {
        headers: getAuthHeaders()
      });
    },

    async getContacts() {
      return request<{ success: boolean; messages: any[] }>('/admin/contacts', {
        headers: getAuthHeaders()
      });
    }
  },

  // Client API
  client: {
    async getApks() {
      return request<{ success: boolean; count: number; apks: any[] }>('/client/apks', {
        headers: getAuthHeaders()
      });
    },

    // Secure APK binary file download
    async downloadApk(apkId: string, suggestedFilename: string): Promise<void> {
      const token = localStorage.getItem('arvr_token');
      const response = await fetch(`${API_BASE}/client/apks/${apkId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        let errorMsg = 'Download failed.';
        try {
          const errJson = await response.json();
          errorMsg = errJson.message || errorMsg;
        } catch (_) {}
        throw new Error(errorMsg);
      }

      // Stream blob to file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = suggestedFilename.endsWith('.apk') ? suggestedFilename : `${suggestedFilename}.apk`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  },

  // Public API
  public: {
    async submitContact(data: { name: string; email: string; subject: string; message: string }) {
      return request<{ success: boolean; message: string; contactId: string }>('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
  }
};
