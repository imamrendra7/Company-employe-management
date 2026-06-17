import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogOut, Building2, Moon, Sun, Shield, User } from 'lucide-react';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header className="app-header">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '38px', height: '38px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
              }}>
                <Building2 size={20} color="white" />
              </div>
              <div>
                <h1 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  EMS Portal
                </h1>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                  Employee Management
                </p>
              </div>
            </div>

            {/* User section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Role badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.3rem 0.75rem',
                background: currentUser?.role === 'admin'
                  ? 'rgba(99, 102, 241, 0.12)'
                  : 'rgba(6, 182, 212, 0.1)',
                border: `1px solid ${currentUser?.role === 'admin'
                  ? 'rgba(99, 102, 241, 0.25)'
                  : 'rgba(6, 182, 212, 0.2)'}`,
                borderRadius: '100px',
              }}>
                {currentUser?.role === 'admin'
                  ? <Shield size={12} color="#818cf8" />
                  : <User size={12} color="#22d3ee" />
                }
                <span style={{
                  fontSize: '0.72rem', fontWeight: 700, textTransform: 'capitalize',
                  color: currentUser?.role === 'admin' ? '#818cf8' : '#22d3ee',
                  letterSpacing: '0.04em'
                }}>
                  {currentUser?.role}
                </span>
              </div>

              {/* Avatar & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div className="avatar" style={{ width: '34px', height: '34px', fontSize: '0.875rem' }}>
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'none' }} className="user-info-desktop">
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>
                    {currentUser?.name}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {currentUser?.position}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: '1px', height: '28px', background: 'var(--border)' }} />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn-ghost"
                style={{ padding: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              {/* Logout */}
              <button
                id="logout-btn"
                onClick={logout}
                className="btn-ghost"
                style={{ padding: '0.45rem 0.875rem', fontSize: '0.8rem' }}
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;