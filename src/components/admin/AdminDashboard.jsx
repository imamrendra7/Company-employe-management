import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getUsers, getTasks } from "../../utils/storage";
import { Users, ClipboardList, TrendingUp, Calendar, Layers } from "lucide-react";
import EmployeeList from "./EmployeeList";
import TaskManagement from "./TaskManagement";
import TaskStats from "./TaskStats";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allUsers = getUsers();
    const employeeUsers = allUsers.filter((user) => user.role === "employee");
    setEmployees(employeeUsers);
    setTasks(getTasks());
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;

  const stats = [
    {
      label: "Total Employees",
      value: employees.length,
      icon: Users,
      color: "purple",
      desc: "Active team members",
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      color: "cyan",
      desc: "All assigned tasks",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: TrendingUp,
      color: "green",
      desc: `${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% completion rate`,
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: Calendar,
      color: "orange",
      desc: `${inProgressTasks} in progress`,
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "employees", label: "Employees", icon: Users },
    { id: "tasks", label: "Tasks", icon: ClipboardList },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Page Header */}
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.375rem', fontSize: '0.9rem' }}>
            Welcome back, <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{currentUser?.name}</span>
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          fontSize: '0.8rem', color: 'var(--text-muted)'
        }}>
          <Calendar size={14} />
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`stat-card ${stat.color} animate-fade-up animate-fade-up-${i + 1}`}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className={`icon-badge ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div style={{
                  fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)',
                  lineHeight: 1, fontVariantNumeric: 'tabular-nums'
                }}>
                  {stat.value}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="glass-card-static animate-fade-up animate-fade-up-4" style={{ overflow: 'hidden' }}>
        {/* Tab Nav */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <div className="tab-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Body */}
        <div style={{ padding: '1.5rem' }}>
          <div key={activeTab} className="animate-fade-up">
            {activeTab === "overview" && (
              <TaskStats tasks={tasks} employees={employees} />
            )}
            {activeTab === "employees" && (
              <EmployeeList employees={employees} onEmployeeUpdate={loadData} />
            )}
            {activeTab === "tasks" && (
              <TaskManagement tasks={tasks} employees={employees} onTaskUpdate={loadData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
