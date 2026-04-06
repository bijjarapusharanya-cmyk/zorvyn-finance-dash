import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className="flex h-screen w-full bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden transition-colors duration-500 font-sans">
        
        {/* SIDEBAR: Shrink to w-14 on mobile to save every pixel */}
        <aside className="w-14 lg:w-64 bg-[var(--sidebar-bg)] border-r border-[var(--border)] p-2 lg:p-8 flex flex-col transition-all duration-500 z-10">
          <div className="text-xl lg:text-2xl font-black mb-8 lg:mb-12 text-purple-500 italic tracking-tighter text-center lg:text-left mt-4">
            <span className="lg:hidden">A</span>
            <span className="hidden lg:inline">APEX</span>
          </div>
          
          <nav className="flex-1 space-y-4 lg:space-y-6">
            {[
              { name: 'Dashboard', path: '/', icon: 'D' },
              { name: 'Analytics', path: '/analytics', icon: 'A' },
              { name: 'Transactions', path: '/transactions', icon: 'T' },
              { name: 'Settings', path: '/settings', icon: 'S' }
            ].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `flex items-center justify-center lg:justify-start py-2 transition-all duration-300 relative ${
                    isActive 
                    ? "text-[var(--text-main)] font-black" 
                    : "text-[var(--text-muted)] font-medium opacity-40"
                  }`
                }
              >
                {/* Visual indicator for mobile active state */}
                <span className="lg:hidden text-[10px] border border-current w-7 h-7 flex items-center justify-center rounded-lg shadow-sm">
                  {link.icon}
                </span>
                <span className="hidden lg:inline">{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT: Reduced p-4 on mobile to prevent squishing */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 custom-scrollbar">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 lg:mb-10">
             <h1 className="text-lg md:text-2xl lg:text-3xl font-black tracking-tighter uppercase italic leading-tight text-[var(--text-main)]">
                Market Intelligence
             </h1>
             <div className="flex items-center gap-3 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-[var(--bg-input)] px-4 py-2 rounded-full border border-[var(--border)] text-xs focus:outline-none focus:ring-2 ring-purple-500/20 text-[var(--text-main)] flex-1 md:w-48" 
                />
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-md shrink-0" />
             </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings toggleTheme={toggleTheme} theme={theme} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;