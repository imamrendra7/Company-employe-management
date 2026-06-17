import React from "react";
import { Mail, Briefcase, Calendar, MapPin } from "lucide-react";

const EmployeeList = ({ employees }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const deptColors = {
    Development: 'purple',
    Design: 'cyan',
    IT: 'blue',
    HR: 'orange',
    Marketing: 'green',
  };

  const getColor = (dept) => deptColors[dept] || 'purple';

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Team Members</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {employees.length} active employees
          </p>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <span style={{ fontSize: '1.5rem' }}>👥</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No employees found</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {employees.map((employee, i) => {
            const color = getColor(employee.department);
            return (
              <div key={employee.id} className={`emp-card animate-fade-up animate-fade-up-${Math.min(i + 1, 4)}`}>
                {/* Card Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="avatar" style={{
                    width: '50px', height: '50px', fontSize: '1.25rem',
                    background: `linear-gradient(135deg, ${
                      color === 'purple' ? '#6366f1, #8b5cf6' :
                      color === 'cyan' ? '#06b6d4, #0ea5e9' :
                      color === 'blue' ? '#3b82f6, #6366f1' :
                      color === 'orange' ? '#f59e0b, #f97316' : '#10b981, #34d399'
                    })`
                  }}>
                    {employee.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {employee.name}
                    </h3>
                    <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {employee.position}
                    </p>
                  </div>
                  <span className="badge badge-active">Active</span>
                </div>

                {/* Divider */}
                <hr className="divider-line" style={{ marginBottom: '1rem' }} />

                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Mail size={13} style={{ flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{employee.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Briefcase size={13} style={{ flexShrink: 0 }} />
                    <span>{employee.department}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Calendar size={13} style={{ flexShrink: 0 }} />
                    <span>Joined {formatDate(employee.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
