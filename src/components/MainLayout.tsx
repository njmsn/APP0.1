import React, { useState } from 'react';
import { 
  Home, 
  LayoutGrid, 
  CalendarCheck, 
  Map, 
  UserCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HomePage from './HomePage';
import WorkbenchPage from './WorkbenchPage';
import ProfilePage from './ProfilePage';
import MapPage from './MapPage';
import PlanPage from './PlanPage';

interface MainLayoutProps {
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: '首页', icon: <Home size={24} /> },
    { id: 'workbench', label: '工作台', icon: <LayoutGrid size={24} /> },
    { id: 'plan', label: '计划', icon: <CalendarCheck size={24} /> },
    { id: 'map', label: '地图', icon: <Map size={24} /> },
    { id: 'mine', label: '我的', icon: <UserCircle2 size={24} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onLogout={onLogout} />;
      case 'workbench':
        return <WorkbenchPage />;
      case 'plan':
        return <PlanPage />;
      case 'map':
        return <MapPage />;
      case 'mine':
        return <ProfilePage onLogout={onLogout} />;
      default:
        return <HomePage onLogout={onLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:p-8 font-sans">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden -z-10 bg-slate-50">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-screen sm:h-[844px] sm:w-[390px] sm:rounded-[3rem] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 bg-white overflow-hidden relative flex flex-col"
      >
        {/* Status Bar Mockup */}
        <div className="h-12 flex items-center justify-between px-8 pt-2 shrink-0 bg-transparent z-50">
          <span className="text-sm font-bold text-slate-800">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-4 rounded-full border-2 border-slate-800 flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-slate-800 rounded-full" />
            </div>
            <div className="w-5 h-2.5 border-2 border-slate-800 rounded-sm relative">
              <div className="absolute left-0 top-0 h-full bg-slate-800 w-4" />
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="h-20 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-4 shrink-0 relative z-50">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 relative group"
            >
              <div className={`transition-all duration-300 ${
                activeTab === tab.id ? 'text-blue-600 scale-110' : 'text-slate-400 group-hover:text-slate-600'
              }`}>
                {tab.icon}
              </div>
              <span className={`text-[10px] font-bold transition-all duration-300 ${
                activeTab === tab.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
              }`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Home Indicator Mockup */}
        <div className="h-8 flex justify-center items-center shrink-0 bg-white">
          <div className="w-32 h-1.5 bg-slate-200 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default MainLayout;
