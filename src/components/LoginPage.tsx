import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Lock, 
  ShieldCheck, 
  ChevronRight, 
  Smartphone,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Generate a random alphanumeric string (mostly letters)
  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCode(code);
  };

  const drawCaptcha = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background noise
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw characters
    const codeArr = generatedCode.split('');
    const fontSize = 24;
    ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
    ctx.textBaseline = 'middle';

    codeArr.forEach((char, i) => {
      const x = 15 + i * 22;
      const y = canvas.height / 2 + (Math.random() * 10 - 5);
      const angle = (Math.random() * 40 - 20) * Math.PI / 180;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgb(${Math.random() * 150}, ${Math.random() * 150}, ${Math.random() * 150})`;
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });

    // Draw random dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    generateCode();
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('captchaCanvas') as HTMLCanvasElement;
    drawCaptcha(canvas);
  }, [generatedCode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }

    if (verificationCode.toLowerCase() !== generatedCode.toLowerCase()) {
      setError('验证码错误');
      generateCode();
      return;
    }

    if (username === '111' && password === '111') {
      // Mock login success
      console.log('Logging in with:', { username, password, rememberMe });
      onLoginSuccess();
    } else {
      setError('账号或密码错误');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:p-8 font-sans">
      {/* Background Decoration (only visible outside the "phone") */}
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
        {/* Status Bar Mockup (Mobile Feel) */}
        <div className="h-12 flex items-center justify-between px-8 pt-2 shrink-0">
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

        {/* Error Message (Floating Toast) */}
        <div className="absolute top-16 left-0 right-0 px-8 z-50 pointer-events-none">
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="bg-red-500/90 backdrop-blur-md text-white px-4 py-3 rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-red-200/50 pointer-events-auto"
              >
                <AlertCircle size={18} />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col">
          {/* Logo & System Name */}
          <div className="flex flex-col items-center mb-12 mt-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4"
            >
              <Smartphone className="text-white w-10 h-10" />
            </motion.div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">智能巡检系统</h1>
            <p className="text-slate-400 text-sm mt-1">Intelligent Inspection System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 flex-1">
            {/* Username */}
            <div className="space-y-1.5">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="请输入账号"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Verification Code */}
            <div className="space-y-1.5">
              <div className="flex gap-3">
                <div className="relative group flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <ShieldCheck size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="验证码"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700"
                  />
                </div>
                <div 
                  onClick={generateCode}
                  className="w-28 h-[56px] bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors select-none overflow-hidden"
                >
                  <canvas 
                    id="captchaCanvas" 
                    width="112" 
                    height="56" 
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.checked)}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                  />
                  <div className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">记住密码</span>
              </label>
              <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                忘记密码？
              </button>
            </div>

            {/* Login Button */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center transition-all mt-4"
            >
              立即登录
            </motion.button>
          </form>

          {/* Version Number Inside Card */}
          <div className="mt-auto pt-8 pb-4 text-center text-slate-300 text-[10px] font-medium tracking-[0.2em] uppercase">
            Version 1.0.0
          </div>
        </div>

        {/* Home Indicator Mockup */}
        <div className="h-8 flex justify-center items-center shrink-0">
          <div className="w-32 h-1.5 bg-slate-200 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
