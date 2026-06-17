import React, { useState } from 'react';
import { createTask, updateTask, deleteTask, generateId } from '../../utils/storage';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit2, Trash2, Calendar, User as UserIcon, Flag, ClipboardList } from 'lucide-react';
import TaskForm from './TaskForm';

const TaskManagement = ({ tasks, employees, onTaskUpdate }) => {
  const { currentUser } = useAuth();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: generateId(),
      assignedBy: currentUser.id,
      createdAt: new Date().toISOString(),
    };
    createTask(newTask);
    onTaskUpdate();
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData) => {
    if (editingTask) {
      const updatedTask = {
        ...taskData,
        id: editingTask.id,
        assignedBy: editingTask.assignedBy,
        createdAt: editingTask.createdAt,
      };
      updateTask(updatedTask);
      onTaskUpdate();
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
      onTaskUpdate();
    }
  };

  const getEmployeeName = (employeeId) => {
    const emp = employees.find((e) => e.id === employeeId);
    return emp ? emp.name : 'Unknown';
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') return <span className="badge badge-pending">Pending</span>;
    if (status === 'in-progress') return <span className="badge badge-progress">In Progress</span>;
    if (status === 'completed') return <span className="badge badge-completed">Completed</span>;
    return <span className="badge">{status}</span>;
  };

  const getPriorityEl = (priority) => (
    <span className={`priority-${priority}`}>{priority}</span>
  );

  const formatDate = (ds) =>
    new Date(ds).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Task Management</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {tasks.length} tasks total
          </p>
        </div>
        <button
          id="assign-task-btn"
          onClick={() => setShowTaskForm(true)}
          className="btn-primary"
        >
          <Plus size={16} />
          Assign New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <ClipboardList size={26} style={{ color: 'var(--text-muted)' }} />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>No tasks yet</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Click "Assign New Task" to get started</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {tasks.map((task, i) => (
            <div
              key={task.id}
              className={`task-card animate-fade-up animate-fade-up-${Math.min(i + 1, 4)}`}
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
                <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                  <button
                    id={`edit-task-${task.id}`}
                    onClick={() => setEditingTask(task)}
                    style={{
                      width: '30px', height: '30px',
                      background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: '8px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#818cf8', transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'}
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    id={`delete-task-${task.id}`}
                    onClick={() => handleDeleteTask(task.id)}
                    style={{
                      width: '30px', height: '30px',
                      background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '8px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#f87171', transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <hr className="divider-line" style={{ marginBottom: '0.875rem' }} />

              {/* Task Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  <UserIcon size={12} style={{ flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {getEmployeeName(task.assignedTo)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  <Calendar size={12} style={{ flexShrink: 0 }} />
                  <span>Due: {formatDate(task.dueDate)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem' }}>
                  <Flag size={12} style={{ flexShrink: 0, color: 'var(--text-muted)' }} />
                  {getPriorityEl(task.priority)}
                </div>
              </div>

              {/* Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.875rem' }}>
                {getStatusBadge(task.status)}
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showTaskForm || editingTask) && (
        <TaskForm
          employees={employees}
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => { setShowTaskForm(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
};

export default TaskManagement;