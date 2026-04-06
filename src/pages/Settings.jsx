import React from 'react';

const Settings = ({ toggleTheme, theme }) => {
  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-700 p-4 md:p-8 lg:p-12">
      <header>
        <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-[var(--text-main)]">
          Settings
        </h1>
        <p className="text-[var(--text-muted)] text-xs lg:text-sm font-medium">
          Personalize your APEX interface
        </p>
      </header>

      <div className="max-w-2xl space-y-4">
        {/* THEME SETTING CARD */}
        <div className="pro-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <p className="font-black text-[var(--text-main)] uppercase tracking-tight text-sm lg:text-base">
              Interface Theme
            </p>
            <p className="text-[var(--text-muted)] text-[10px] lg:text-xs font-medium mt-1">
              Currently using <span className="text-[var(--accent)] font-bold uppercase">{theme}</span> mode
            </p>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="w-full sm:w-auto px-6 py-3 bg-[var(--accent)] hover:opacity-80 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-purple-500/20 active:scale-95"
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* PROFILE PREVIEW CARD (Visual Filler) */}
        <div className="pro-card opacity-50 pointer-events-none">
          <div>
            <p className="font-black text-[var(--text-main)] uppercase tracking-tight text-sm">
              Account Security
            </p>
            <p className="text-[var(--text-muted)] text-[10px] mt-1">
              Two-factor authentication is enabled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;