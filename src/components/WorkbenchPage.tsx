import React from 'react';
import { 
  ShieldCheck, 
  Gauge, 
  ClipboardList, 
  Search, 
  Upload,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';

const WorkbenchPage: React.FC = () => {
  const categories = [
    {
      title: '我的收藏',
      items: [
        { id: 'safety', label: '居民安检', icon: <ShieldCheck size={24} />, color: 'bg-blue-500', shadow: 'shadow-blue-100' },
        { id: 'order', label: '工单管理', icon: <ClipboardList size={24} />, color: 'bg-orange-500', shadow: 'shadow-orange-100' },
      ]
    },
    {
      title: '工作计划',
      items: [
        { id: 'meter', label: '居民抄表', icon: <Gauge size={24} />, color: 'bg-emerald-500', shadow: 'shadow-emerald-100' },
        { id: 'plan', label: '巡检计划', icon: <BarChart3 size={24} />, color: 'bg-indigo-500', shadow: 'shadow-indigo-100' },
      ]
    },
    {
      title: '安检管理',
      items: [
        { id: 'query', label: '用户查询', icon: <Search size={24} />, color: 'bg-slate-500', shadow: 'shadow-slate-100' },
        { id: 'upload', label: '上传单据', icon: <Upload size={24} />, color: 'bg-rose-500', shadow: 'shadow-rose-100' },
        { id: 'record', label: '安检记录', icon: <ShieldCheck size={24} />, color: 'bg-amber-500', shadow: 'shadow-amber-100' },
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">工作台</h2>
      </div>

      {/* Categorized Menu */}
      <div className="p-6 space-y-8">
        {categories.map((category, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full" />
              <h3 className="text-sm font-bold text-slate-800">{category.title}</h3>
            </div>
            <div className="grid grid-cols-4 gap-y-6 gap-x-4">
              {category.items.map((item) => (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center text-white shadow-md ${item.shadow} transition-transform group-hover:-translate-y-1 duration-300`}>
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 tracking-tight text-center">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkbenchPage;
