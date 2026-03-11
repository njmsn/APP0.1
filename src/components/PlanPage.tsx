import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Circle,
  Timer,
  ClipboardCheck,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Plan {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  type: string;
  address: string;
  time: string;
  method: string;
  elapsedTime: string;
  isDaily: boolean;
}

const PlanPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('状态');
  const [typeFilter, setTypeFilter] = useState('类型');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const statusOptions = ['全部', '未完成', '已完成', '已经过', '已填报'];
  const typeOptions = ['全部', '调压器', '阀门'];

  const plans: Plan[] = [
    {
      id: '1',
      name: '黄浦区南京东路路灯巡检计划',
      status: 'in_progress',
      type: '调压器',
      address: '上海市黄浦区南京东路123号',
      time: '2026-03-11 08:00 - 12:00',
      method: '手机端填报',
      elapsedTime: '01:45:20',
      isDaily: true
    },
    {
      id: '2',
      name: '静安寺周边电力设施维护',
      status: 'pending',
      type: '阀门',
      address: '上海市静安区南京西路1688号',
      time: '2026-03-11 13:30 - 17:30',
      method: '扫码填报',
      elapsedTime: '00:00:00',
      isDaily: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-500 bg-emerald-50';
      case 'in_progress': return 'text-blue-500 bg-blue-50';
      default: return 'text-slate-400 bg-slate-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in_progress': return '进行中';
      default: return '待开始';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      {/* Page Title */}
      <div className="px-6 pt-6 pb-4 bg-white shrink-0">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">计划</h2>
      </div>

      {/* Plans List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search & Filters (No Card) */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 px-1"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="搜索计划名称或地址"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all text-sm"
            />
          </div>

          {/* Filters Row */}
          <div className="flex gap-2 relative">
            <div className="flex-1 relative">
              <button 
                onClick={() => { setIsStatusOpen(!isStatusOpen); setIsTypeOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <span className={statusFilter !== '状态' ? 'text-blue-600 font-bold' : ''}>{statusFilter}</span>
                <ChevronDown size={14} className={`transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isStatusOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-100 rounded-lg shadow-xl z-50 py-1"
                  >
                    {statusOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setStatusFilter(opt === '全部' ? '状态' : opt); setIsStatusOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-1 relative">
              <button 
                onClick={() => { setIsTypeOpen(!isTypeOpen); setIsStatusOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <span className={typeFilter !== '类型' ? 'text-blue-600 font-bold' : ''}>{typeFilter}</span>
                <ChevronDown size={14} className={`transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isTypeOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-100 rounded-lg shadow-xl z-50 py-1"
                  >
                    {typeOptions.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => { setTypeFilter(opt === '全部' ? '类型' : opt); setIsTypeOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="flex items-center gap-1 px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter size={14} />
              <span>高级筛选</span>
            </button>
          </div>
        </motion.div>
        {plans.map((plan) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden group"
          >
            {/* Daily Tag */}
            {plan.isDaily && (
              <div className="absolute top-0 left-0 text-blue-600 text-xs px-3 py-1.5 font-bold tracking-wider z-10">
                日计划
              </div>
            )}

            {/* Status Corner Tag */}
            <div className={`absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl text-xs font-bold z-10 ${getStatusColor(plan.status)}`}>
              {getStatusText(plan.status)}
            </div>

            <div className="flex justify-between items-start mb-4 mt-6">
              <h3 className="text-base font-bold text-slate-800 flex-1 pr-4 leading-snug">
                {plan.name}
              </h3>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-center gap-3 group/addr cursor-pointer">
                <MapPin size={16} className="text-slate-400 shrink-0" />
                <span className="text-sm text-slate-500 flex-1 truncate">{plan.address}</span>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors shrink-0">
                  <Navigation size={16} />
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-slate-400 shrink-0" />
                <span className="text-sm text-slate-500">{plan.time}</span>
              </div>

              {/* Method */}
              <div className="flex items-center gap-3">
                <ClipboardCheck size={16} className="text-slate-400 shrink-0" />
                <span className="text-sm text-slate-500">完成方式：{plan.method}</span>
              </div>

              {/* Elapsed Time */}
              <div className="flex items-center gap-3">
                <Timer size={16} className="text-slate-400 shrink-0" />
                <span className="text-sm text-slate-500">经过时间：<span className="font-mono text-blue-600 font-bold">{plan.elapsedTime}</span></span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-50 flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-10 py-3 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2">
                填报
              </button>
            </div>
          </motion.div>
        ))}
        
        {/* Bottom Spacing */}
        <div className="h-4" />
      </div>
    </div>
  );
};

export default PlanPage;
