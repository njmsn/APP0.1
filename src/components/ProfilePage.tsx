import React from 'react';
import { 
  Settings, 
  ChevronRight, 
  Lock, 
  Users, 
  Info, 
  LogOut 
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProfilePageProps {
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const menuItems = [
    { id: 'password', label: '修改密码', icon: <Lock size={20} className="text-blue-500" /> },
    { id: 'contacts', label: '通讯录', icon: <Users size={20} className="text-emerald-500" /> },
    { id: 'settings', label: '系统设定', icon: <Settings size={20} className="text-slate-500" /> },
    { id: 'about', label: '关于', icon: <Info size={20} className="text-indigo-500" /> },
    { id: 'logout', label: '退出登录', icon: <LogOut size={20} className="text-red-500" />, action: onLogout },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-20">
      {/* Header Section (Same as HomePage) */}
      <div className="bg-blue-600 pt-12 pb-28 px-6 rounded-b-[3rem] shadow-lg shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full -ml-16 -mb-16 blur-xl" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl border-2 border-white/30 overflow-hidden shadow-inner bg-white/20 flex items-center justify-center">
            <img 
              src="https://picsum.photos/seed/inspector/200/200" 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white tracking-tight">张建国</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-100 text-sm font-medium">工作中 · 巡检中</span>
            </div>
          </div>
          <button 
            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors group relative"
          >
            <Settings size={20} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              设置
            </span>
          </button>
        </div>
      </div>

      {/* Menu List Section */}
      <div className="px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ backgroundColor: '#f8fafc' }}
              onClick={item.action}
              className="w-full px-5 py-4 flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm font-bold text-slate-700">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Version Info */}
      <div className="mt-auto py-8 text-center">
        <p className="text-[10px] text-slate-300 font-bold tracking-[0.2em] uppercase">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default ProfilePage;
