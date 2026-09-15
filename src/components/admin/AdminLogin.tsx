import React, { useState } from 'react';
import { Shield, Lock, User, Eye, EyeOff, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../store/apiStore';
import { VnCordLogo } from '../VnCordLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(async () => {
      const result = await loginAdmin(username, password, rememberMe);
      if (result.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(result.error || 'Đăng nhập không thành công. Vui lòng kiểm tra lại mật khẩu.');
        setIsLoading(false);
      }
    }, 300);
  };


  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col justify-center items-center p-4 selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Top Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay về Website chính thức</span>
          </button>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            SSL 256-Bit Encrypted
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-[#161b22] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50 text-slate-100">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <VnCordLogo variant="vertical" size="lg" inverted />
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Cổng Quản Trị Hệ Thống
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Xác thực quyền quản trị viên nội bộ ngân hàng mô & tế bào gốc
            </p>
          </div>

          {/* Error notification */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mật khẩu quản trị
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-hidden focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-teal-500 focus:ring-teal-500 bg-slate-900 border-slate-700"
                />
                <span>Duy trì đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 active:from-teal-700 active:to-sky-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Đang xác thực...' : 'Đăng Nhập Vào Trang Quản Trị'}</span>
            </button>
          </form>

        </div>

        {/* Security disclaimer footer */}
        <div className="mt-6 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3 text-slate-500" />
          <span>Hệ thống giám sát nội bộ – VNCORD-DK Tissue Bank © {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};
