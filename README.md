# 🏢 Company Employe Management System (EMS)

A modern, premium, and fully responsive **Company Employe Management System** built with **React 19**, **Vite**, and **Tailwind CSS v4**. It features a stunning glassmorphism dark/light design system, complete task workflow management, local storage persistence, and role-based access control.

## 🚀 Live Demo
The application is live and hosted on GitHub Pages:
👉 **[https://imamrendra7.github.io/Company-employe-management/](https://imamrendra7.github.io/Company-employe-management/)**

---

## ✨ Features

### 🔑 Authentication & Role-Based Dashboards
* **System Admin Portal**:
  * Complete statistics of team productivity (Total Tasks, Completed Tasks, Progress percentage).
  * Comprehensive **Employee List** with positions, salary, and contact information.
  * Real-time **Task Management** (Assign tasks, update status, set priorities, and delete tasks).
* **Employee Portal**:
  * Personal statistics dashboard (Total, Active, and Completed Tasks).
  * Interactive task board to view and change assigned task statuses (e.g., mark as *In Progress* or *Completed*).
  * Automated update notifications sync directly back to the Admin Dashboard.

### 🎨 Premium UI & Styling
* **Harmonious Themes**: Seamless dark mode and a customized, low-intensity eye-care light mode.
* **Glassmorphic Aesthetic**: Beautiful frosted-glass card overlays, glowing borders, custom scrollbars, and vibrant gradients.
* **Fully Responsive**: Highly adaptable design for mobile, tablet, and desktop viewports.
* **Micro-Animations**: Smooth transition effects on hover, tab switches, and modal overlays.

### 💾 Robust Architecture
* **State Persistence**: Uses browser `localStorage` to save all state (newly signed-up employees, newly assigned tasks, status changes).
* **React Context API**: Efficient global state sharing for user authentication and UI themes.

---

## 🛠️ Tech Stack

* **Frontend Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite](https://vite.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icon Library**: [Lucide React](https://lucide.dev/)
* **Deployment**: [GitHub Pages](https://pages.github.com/)

---

## 📦 Getting Started

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/imamrendra7/Company-employe-management.git
   ```
2. Navigate into the directory:
   ```bash
   cd "Company Employee Management"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### 🖥️ Running Locally
To launch the development server locally:
```bash
npm run dev
```
Open **[http://localhost:5173/Company-employe-management/](http://localhost:5173/Company-employe-management/)** in your browser.

### 🚀 Build and Deployment
To build and deploy the latest version of the app directly to GitHub Pages:
```bash
npm run deploy
```

---

## 🔐 Credentials for Testing

Use the quick-login buttons on the login page or type in the following credentials:

### 🛡️ Admin Account
* **Email**: `admin@company.com`
* **Password**: `admin123`

### 👥 Demo Employee Account
* **Email**: `arjun@company.com` or `arjun99@gmail.com` (or create a new employee via the "Sign Up" option)
* **Password**: `employee123`
