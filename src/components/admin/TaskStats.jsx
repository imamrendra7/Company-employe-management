import React from 'react';
import { BarChart3, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const TaskStats = ({ tasks, employees }) => {
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'high').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const getOverdueTasks = () => {
    const now = new Date();
    return tasks.filter((t) => new Date(t.dueDate) < now && t.status !== 'completed').length;
  };
  const overdueTasks = getOverdueTasks();

  const getEmployeeTaskCount = () =>
    employees.map((emp) => {
      const empTasks = tasks.filter((t) => t.assignedTo === emp.id);
      return {
        name: emp.name,
        position: emp.position,
        taskCount: empTasks.length,
        completed: empTasks.filter((t) => t.status === 'completed').length,
      };
    });

  const employeeStats = getEmployeeTaskCount();

  const overviewCards = [
    { label: 'Completion Rate', value: `${completionRate}%`, icon: BarChart3, color: 'purple', bg: 'rgba(99,102,241,0.12)', iconColor: '#818cf8' },
    { label: 'Completed', value: completedTasks, icon: TrendingUp, color: 'green', bg: 'rgba(16,185,129,0.12)', iconColor: '#34d399' },
    { label: 'In Progress', value: inProgressTasks, icon: Clock, color: 'cyan', bg: 'rgba(6,182,212,0.12)', iconColor: '#22d3ee' },
    { label: 'Overdue', value: overdueTasks, icon: AlertTriangle, color: 'red', bg: 'rgba(239,68,68,0.12)', iconColor: '#f87171' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 className="section-title">Dashboard Overview</h2>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        {overviewCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`animate-fade-up animate-fade-up-${i + 1}`}
              style={{
                padding: '1.25rem',
                background: card.bg,
                border: `1px solid ${card.bg.replace('0.12', '0.25')}`,
                borderRadius: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '38px', height: '38px',
                background: card.bg.replace('0.12', '0.2'),
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '0.875rem'
              }}>
                <Icon size={19} color={card.iconColor} />
              </div>
              <p style={{ fontSize: '1.625rem', fontWeight: 900, color: card.iconColor, lineHeight: 1, marginBottom: '0.3rem' }}>
                {card.value}
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>

        {/* Employee Performance */}
        <div className="glass-card-static animate-fade-up animate-fade-up-2" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Team Task Distribution
          </h3>
          {employeeStats.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>No employees yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {employeeStats.map((emp) => {
                const pct = emp.taskCount > 0 ? Math.round((emp.completed / emp.taskCount) * 100) : 0;
                return (
                  <div key={emp.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '0.75rem' }}>
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{emp.name}</p>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{emp.position}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-primary)' }}>{emp.completed}/{emp.taskCount}</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{pct}%</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill green" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stats breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Status Distribution */}
          <div className="glass-card-static animate-fade-up animate-fade-up-3" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.875rem' }}>
              Status Distribution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Completed', val: completedTasks, color: '#34d399' },
                { label: 'In Progress', val: inProgressTasks, color: '#818cf8' },
                { label: 'Pending', val: pendingTasks, color: '#fbbf24' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: item.color }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Breakdown */}
          <div className="glass-card-static animate-fade-up animate-fade-up-4" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.875rem' }}>
              Priority Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'High', val: tasks.filter((t) => t.priority === 'high').length, color: '#f87171' },
                { label: 'Medium', val: tasks.filter((t) => t.priority === 'medium').length, color: '#fbbf24' },
                { label: 'Low', val: tasks.filter((t) => t.priority === 'low').length, color: '#34d399' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.label} Priority</span>
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: item.color }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;