import React from 'react';
import { 
  LogOut, 
  ClipboardList, 
  BarChart3, 
  ChevronRight, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface HomePageProps {
  onLogout: () => void;
}

const chartData = [
  { name: '一', value: 40 },
  { name: '二', value: 70 },
  { name: '三', value: 45 },
  { name: '四', value: 90 },
  { name: '五', value: 65 },
  { name: '六', value: 80 },
  { name: '七', value: 55 },
];

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto pb-20">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-xs shadow-2xl border border-slate-100"
          >
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
              <LogOut className="text-red-500" size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">签退下班</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">确定要结束当前工作并签退下班吗？</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={onLogout}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-200 transition-colors"
              >
                确定
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header Section */}
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
            onClick={() => setShowLogoutConfirm(true)}
            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors group relative"
          >
            <LogOut size={20} />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              签退下班
            </span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 -mt-6 space-y-6 relative z-20">
        {/* Work Statistics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '今日待办', value: '12', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: '已完成', value: '08', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: '异常项', value: '02', color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -2 }}
              className={`${stat.bg} p-4 rounded-xl border border-white shadow-sm flex flex-col items-center`}
            >
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* My To-do List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <ClipboardList size={18} className="text-blue-600" />
              我的待办
            </h3>
            <button className="text-xs text-blue-600 font-medium flex items-center gap-0.5">
              查看全部 <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'A区变压器例行巡检', time: '10:30 - 11:30', status: '待执行', icon: <Clock size={16} className="text-blue-500" /> },
              { title: 'B2层消防设施月度检查', time: '14:00 - 16:00', status: '进行中', icon: <AlertCircle size={16} className="text-orange-500" /> },
              { title: '配电房环境安全排查', time: '16:30 - 17:30', status: '待执行', icon: <Clock size={16} className="text-blue-500" /> },
            ].map((task, idx) => (
              <motion.div 
                key={idx}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                  {task.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{task.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{task.time}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                  task.status === '进行中' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {task.status}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Message Notifications */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Bell size={18} className="text-blue-600" />
              消息通知
            </h3>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-50">
            {[
              { title: '系统维护通知', content: '今晚 22:00 系统将进行例行维护...', time: '1小时前' },
              { title: '任务指派提醒', content: '您有一项新的临时巡检任务待确认', time: '3小时前' },
            ].map((msg, idx) => (
              <div key={idx} className="p-4 flex gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800">{msg.title}</h4>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 truncate">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Statistics Chart */}
        <section className="space-y-3 pb-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-600" />
              工作统计
            </h3>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      fontSize: '12px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                <span className="text-xs text-slate-500">本周巡检完成率</span>
              </div>
              <span className="text-sm font-bold text-slate-800">85%</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
