import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout & Common
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ParticleCanvas } from './components/common/ParticleCanvas';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

// Admin
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminApks } from './pages/admin/AdminApks';
import { AdminClients } from './pages/admin/AdminClients';
import { AdminDownloads } from './pages/admin/AdminDownloads';

// Client
import { ClientDashboard } from './pages/client/ClientDashboard';

// Route Guard Components
const RequireOwner: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, isOwner, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !isOwner) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RequireClientOrOwner: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col bg-[#060913]">
        {/* Dynamic 3D Particle Canvas */}
        <ParticleCanvas />

        {/* Top Navigation */}
        <Navbar />

        {/* Content Routes */}
        <div className="flex-grow">
          <Routes>
            {/* Public Landing & Showcase */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Client Portal (Protected) */}
            <Route
              path="/client"
              element={
                <RequireClientOrOwner>
                  <ClientDashboard />
                </RequireClientOrOwner>
              }
            />

            {/* Owner Admin Portal (Protected) */}
            <Route
              path="/admin"
              element={
                <RequireOwner>
                  <AdminLayout />
                </RequireOwner>
              }
            >
              <Route index element={<AdminOverview />} />
              <Route path="apks" element={<AdminApks />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="downloads" element={<AdminDownloads />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
