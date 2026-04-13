import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Flame, FileText, Clock, Hash, Sun, Moon, Sparkles, LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ darkMode, setDarkMode }) => {
  const navItems = [
    { to: '/', name: 'Home', icon: Home },
    { to: '/hashtags', name: 'Hashtags', icon: Hash },
    { to: '/trending', name: 'Explore', icon: Flame },
    { to: '/blog', name: 'Academy', icon: FileText },
    { to: '/history', name: 'Archive', icon: Clock },
  ];

  return (
    <div className="hidden md:flex flex-col w-[260px] bg-card h-screen fixed left-0 top-0 z-50 border-r border-secondary transition-colors duration-200">
      <div className="p-8 flex flex-col h-full">
        <div className="mb-12 flex justify-between items-center px-2">
          <h1 className="text-xl font-bold tracking-tight text-primary">CaptionCraft</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-secondary text-primary hover:text-accent-blue transition-all outline-none"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive ? 'bg-secondary text-primary' : 'text-secondary hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-accent-blue rounded-r-full" />}
                  {item.icon && <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-accent-blue' : ''}`} />}
                  <span className="text-xs font-semibold tracking-tight">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: Home },
    { to: '/hashtags', icon: Hash },
    { to: '/trending', icon: Flame },
    { to: '/blog', icon: FileText },
    { to: '/history', icon: Clock }
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-card border border-secondary/20 rounded-[2rem] shadow-2xl z-50 flex items-center justify-around px-4">
      {navItems.map((item, i) => (
        <NavLink
          key={i}
          to={item.to}
          className={({ isActive }) =>
            `p-3.5 rounded-2xl transition-all ${isActive ? 'bg-accent-blue text-white' : 'text-secondary hover:bg-secondary'
            }`
          }
        >
          <item.icon className="w-6 h-6" />
        </NavLink>
      ))}
    </div>
  );
};

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('theme') !== 'light' : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-primary transition-colors duration-200">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Mobile Header with Theme Toggle */}
      <div className="md:hidden flex justify-between items-center p-6 bg-card sticky top-0 z-40 border-b border-secondary/20">
        <h1 className="text-lg font-semibold text-primary tracking-tight">CaptionCraft</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl bg-secondary text-primary hover:text-accent-blue transition-all outline-none"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <main className="md:ml-[260px] p-6 md:p-12 pb-32 md:pb-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
