import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Boxes,
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
  FolderDown,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isOwner, isClient, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'AR/VR', path: '/#arvr-info' },
    { name: 'Technologies', path: '/#tech-showcase' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Metaverse', path: '/#metaverse' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavClick = (path: string) => {
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(elementId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060913]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/25 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#060913] rounded-[11px] flex items-center justify-center">
              <Boxes className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold tracking-wider font-display bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              AR/VR INNOVATION
            </div>
            <div className="text-[10px] uppercase tracking-widest text-cyan-400/80 -mt-1 font-mono">
              Next-Gen Immersive Lab
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Auth / Action Button Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {isOwner && (
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <LayoutDashboard className="w-4 h-4" />
              Owner Dashboard
            </Link>
          )}

          {isClient && (
            <Link
              to="/client"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              <FolderDown className="w-4 h-4" />
              My Applications
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-xl font-medium group bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 group-hover:from-cyan-500 group-hover:to-purple-600 hover:text-white shadow-lg shadow-cyan-500/20"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-[#060913] rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-2 text-sm font-semibold text-white">
                <LogIn className="w-4 h-4 text-cyan-400 group-hover:text-white" />
                Login
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {user && (
            <Link
              to={isOwner ? '/admin' : '/client'}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
            >
              {isOwner ? 'Admin' : 'Apps'}
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#090e1d]/95 backdrop-blur-2xl border-b border-cyan-500/20 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className="flex items-center justify-between px-4 py-2.5 text-left text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}

            <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
              {isOwner && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Owner Dashboard
                </Link>
              )}

              {isClient && (
                <Link
                  to="/client"
                  className="flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40"
                >
                  <FolderDown className="w-4 h-4" />
                  My Applications
                </Link>
              )}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Logout ({user.username})
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  Login to Platform
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
