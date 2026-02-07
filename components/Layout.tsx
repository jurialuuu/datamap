
import React from 'react';
import { Map as MapIcon, BookOpen, Info } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  progress: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, progress }) => {
  const tabs = [
    { id: AppTab.Map, label: 'Learning Map', icon: MapIcon },
    { id: AppTab.Cases, label: 'Case Studies', icon: BookOpen },
    { id: AppTab.About, label: 'About', icon: Info },
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-stone-200 bg-white px-6 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">
            OA
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-stone-900 leading-none tracking-tight">Operator → Analyst</h1>
            <p className="text-[9px] text-stone-400 uppercase tracking-widest font-black">Strategic Decision Engine v1.0</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-stone-400 hover:bg-stone-50 hover:text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon size={14} />
                {tab.label}
              </div>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Path Progress</span>
            <div className="w-32 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200/50">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  progress === 100 ? 'bg-green-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-stone-100 flex items-center justify-center text-stone-900 font-black text-xs shadow-sm ring-4 ring-stone-50">
            {Math.round(progress)}%
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Mobile Nav */}
      <nav className="md:hidden h-16 border-t border-stone-200 bg-white flex items-center justify-around px-2 z-40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === tab.id ? 'text-indigo-600 font-black' : 'text-stone-400 font-bold'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[9px] uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
