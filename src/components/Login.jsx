import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogIn, Mail, Lock, AlertCircle, Building2, Eye, EyeOff, Moon, Sun, UserPlus, User, Briefcase, Tags } from 'lucide-react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Development',
    position: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  
  const { login, register } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        const result = await register(formData);
        if (!result.success) {
          setError(result.error || 'Registration failed. Please try again.');
        }
      } else {
        const success = await login(formData.email, formData.password);
        if (!success) {
          setError('Invalid email or password. Please try again.');
        }
      }
    } catch (err) {
      setError(`${isSignUp ? 'Registration' : 'Login'} failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (em, pw) => {
    setFormData(prev => ({ ...prev, email: em, password: pw }));
    setIsSignUp(false);
  };

  return (
    <div className="login-page">
      {/* Theme Toggle (Top Right) */}
      <button
        onClick={toggleTheme}
        className="btn-ghost"
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          padding: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%'
        }}
        title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="login-card animate-fade-up" style={{ maxWidth: isSignUp ? '480px' : '420px' }}>
        {/* Logo */}
        <div className="login-logo" style={{ background: 'none', boxShadow: 'none', width: '72px', height: '72px' }}>
          <img
            src={`${import.meta.env.BASE_URL}vite.svg`}
            alt="EMS Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {isSignUp ? 'Join the ' : 'Sign in to '}
            <span className="text-gradient" style={{ fontWeight: 600 }}>Employee Portal</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          
          {isSignUp && (
            <div>
              <label className="form-label">Full Name</label>
              <div className="form-group">
                <User size={16} className="form-icon" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input with-icon"
                  placeholder="Enter your full name"
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="form-label">Email Address</label>
            <div className="form-group">
              <Mail size={16} className="form-icon" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input with-icon"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {isSignUp && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Department</label>
                <div className="form-group">
                  <Briefcase size={16} className="form-icon" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-input with-icon"
                    required={isSignUp}
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Position</label>
                <div className="form-group">
                  <Tags size={16} className="form-icon" />
                  <input
                    name="position"
                    type="text"
                    value={formData.position}
                    onChange={handleChange}
                    className="form-input with-icon"
                    placeholder="e.g. Developer"
                    required={isSignUp}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <div className="form-group">
              <Lock size={16} className="form-icon" />
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="form-input with-icon"
                placeholder={isSignUp ? "Create a password" : "Enter your password"}
                style={{ paddingRight: '2.75rem' }}
                required
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: '0.875rem', top: '50%',
                  transform: 'translateY(-50%)', background: 'none', border: 'none',
                  color: 'var(--text-muted)', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center'
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              animation: 'fadeInUp 0.2s ease'
            }}>
              <AlertCircle size={16} color="#f87171" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', color: '#f87171' }}>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{
              width: '100%', justifyContent: 'center',
              padding: '0.875rem', marginTop: '0.5rem',
              fontSize: '0.9375rem',
              borderRadius: '12px',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                {isSignUp ? 'Creating Account...' : 'Signing in...'}
              </>
            ) : (
              <>
                {isSignUp ? <UserPlus size={16} /> : <LogIn size={16} />}
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              style={{
                background: 'none', border: 'none', padding: 0,
                color: 'var(--primary-light)', fontWeight: 600,
                cursor: 'pointer', textDecoration: 'underline'
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Demo accounts (only in Sign In mode) */}
        {!isSignUp && (
          <div className="demo-box" style={{ marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Quick Access
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                id="demo-admin"
                type="button"
                onClick={() => quickLogin('admin@company.com', 'admin123')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.625rem 0.875rem',
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '8px', cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)'}
              >
                <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 600 }}>Admin Account</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>admin@company.com</span>
              </button>
              <button
                id="demo-employee"
                type="button"
                onClick={() => quickLogin('krish@company.com', 'employee123')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.625rem 0.875rem',
                  background: 'rgba(6, 182, 212, 0.06)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '8px', cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.06)'}
              >
                <span style={{ fontSize: '0.8rem', color: '#22d3ee', fontWeight: 600 }}>Employee Account</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>krish@company.com</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;