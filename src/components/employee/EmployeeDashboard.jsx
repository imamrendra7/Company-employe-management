import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTasks, updateTask } from '../../utils/storage';
import { CheckCircle, Clock, PlayCircle, AlertCircle, Calendar, Flag, Inbox } from 'lucide-react';

const EmployeeDashboard = () => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, [currentUser]);

  const loadTasks = () => {
    if (currentUser) {
      const allTasks = getTasks();
      const myTasks = allTasks.filter((task) => task.assignedTo === currentUser.id);
      setTasks(myTasks);
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (taskToUpdate) {
      const updatedTask = {
        ...taskToUpdate,
        status: newStatus,
        completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
      };
      updateTask(updatedTask);
      loadTasks();
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'pending') return <Clock size={16} color="#fbbf24" />;
    if (status === 'in-progress') return <PlayCircle size={16} color="#818cf8" />;
    if (status === 'completed') return <CheckCircle size={16} color="#34d399" />;
    return <AlertCircle size={16} color="var(--text-muted)" />;
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') return <span className="badge badge-pending">Pending</span>;
    if (status === 'in-progress') return <span className="badge badge-progress">In Progress</span>;
    if (status === 'completed') return <span className="badge badge-completed">Completed</span>;
    return <span className="badge">{status}</span>;
  };

  const formatDate = (ds) =>
    new Date(ds).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const isOverdue = (dueDate, status) => new Date(dueDate) < new Date() && status !== 'completed';

  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate, t.status));
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  const stats = [
    { label: 'Total Tasks', value: tasks.length, color: 'purple', icon: Inbox },
    { label: 'Completed', value: completedTasks.length, color: 'green', icon: CheckCircle },
    { label: 'In Progress', value: inProgressTasks.length, color: 'cyan', icon: PlayCircle },
    { label: 'Overdue', value: overdueTasks.length, color: 'red', icon: AlertCircle },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Page Header */}
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
            My <span className="text-gradient">Dashboard</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.375rem', fontSize: '0.9rem' }}>
            Welcome back, <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{currentUser?.name}</span>
            {currentUser?.position && (
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> · {currentUser.position}</span>
            )}
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-muted)'
        }}>
          <Calendar size={14} />
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`stat-card ${stat.color} animate-fade-up animate-fade-up-${i + 1}`}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className={`icon-badge ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {stat.value}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {stat.label}
              </p>
              {/* Progress bar for completion */}
              {stat.label === 'Completed' && (
                <>
                  <div className="progress-bar" style={{ marginTop: '0.25rem' }}>
                    <div className="progress-fill green" style={{ width: `${completionRate}%` }} />
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                    {completionRate}% completion rate
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* My Tasks */}
      <div className="glass-card-static animate-fade-up animate-fade-up-4" style={{ overflow: 'hidden' }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>My Tasks</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {tasks.length} tasks assigned to you
            </p>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Inbox size={26} style={{ color: 'var(--text-muted)' }} />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                No tasks assigned yet
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Your admin will assign tasks that appear here
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1rem' }}>
              {tasks.map((task, i) => {
                const overdue = isOverdue(task.dueDate, task.status);
                return (
                  <div
                    key={task.id}
                    className={`task-card ${overdue ? 'overdue' : ''} animate-fade-up animate-fade-up-${Math.min(i + 1, 4)}`}
                  >
                    {/* Task Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                      <div style={{ flex: 1, minWidth: 0, marginRight: '0.75rem' }}>
                        <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem', lineHeight: 1.3 }}>
                          {task.title}
                        </h3>
                        <p className="line-clamp-2" style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {task.description}
                        </p>
                      </div>
                      {getStatusIcon(task.status)}
                    </div>

                    <hr className="divider-line" style={{ marginBottom: '0.875rem' }} />

                    {/* Meta */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <Flag size={12} style={{ color: 'var(--text-muted)' }} />
                          <span className={`priority-${task.priority}`}>{task.priority}</span>
                        </div>
                        {getStatusBadge(task.status)}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem' }}>
                        <Calendar size={12} style={{ flexShrink: 0, color: overdue ? '#f87171' : 'var(--text-muted)' }} />
                        <span style={{ color: overdue ? '#f87171' : 'var(--text-muted)' }}>
                          Due: {formatDate(task.dueDate)}
                          {overdue && <span style={{ fontWeight: 700, marginLeft: '0.375rem' }}> · OVERDUE</span>}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {task.status !== 'completed' && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {task.status === 'pending' && (
                          <button
                            id={`start-task-${task.id}`}
                            onClick={() => updateTaskStatus(task.id, 'in-progress')}
                            className="btn-start"
                            style={{ flex: 1, justifyContent: 'center' }}
                          >
                            <PlayCircle size={14} />
                            Start Task
                          </button>
                        )}
                        {task.status === 'in-progress' && (
                          <button
                            id={`complete-task-${task.id}`}
                            onClick={() => updateTaskStatus(task.id, 'completed')}
                            className="btn-success"
                            style={{ flex: 1, justifyContent: 'center' }}
                          >
                            <CheckCircle size={14} />
                            Mark Complete
                          </button>
                        )}
                      </div>
                    )}

                    {task.status === 'completed' && task.completedAt && (
                      <p style={{ fontSize: '0.72rem', color: '#34d399', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <CheckCircle size={12} />
                        Completed on {formatDate(task.completedAt)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;