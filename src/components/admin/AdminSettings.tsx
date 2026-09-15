import React, { useState, useEffect } from 'react';
import { WebsiteSettings } from '../../types';
import { loadSettings, saveSettings, changePassword } from '../../store/apiStore';
import { Save, CheckCircle2, Phone, Mail, Clock, MapPin, Share2, Lock, KeyRound, ShieldAlert, Check } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [formData, setFormData] = useState<WebsiteSettings>(loadSettings());
  const [isSaved, setIsSaved] = useState(false);

  // Security password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setFormData(loadSettings());
    };
    window.addEventListener('vncord_settings_updated', handleUpdate);
    return () => window.removeEventListener('vncord_settings_updated', handleUpdate);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'Mật khẩu mới và xác nhận mật khẩu không khớp nhau.' });
      return;
    }

    const res = await changePassword(currentPassword, newPassword);
    if (res.success) {
      setPasswordStatus({ type: 'success', message: 'Đổi mật khẩu quản trị viên thành công!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordStatus(null), 4000);
    } else {
      setPasswordStatus({ type: 'error', message: res.error || 'Đổi mật khẩu thất bại. Vui lòng kiểm tra mật khẩu hiện tại.' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Title & Action Bar matching screenshot */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Cài đặt Website</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cập nhật thông tin liên hệ, hotline tổng đài và các kênh kết nối khách hàng
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          id="admin-save-settings-btn"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-sm font-semibold rounded-lg shadow-md transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Lưu cài đặt</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Đã lưu thành công! Thông tin website công khai đã được đồng bộ tức thì.</span>
        </div>
      )}

      {/* Main Settings Card in crisp white matching user image */}
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 text-slate-800 border border-slate-200">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Thông tin liên hệ */}
          <div>
            <div className="flex items-center gap-2 mb-6 text-slate-400 font-semibold text-sm">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>Thông tin liên hệ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* HOTLINE (HIỂN THỊ) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  HOTLINE (HIỂN THỊ)
                </label>
                <input
                  type="text"
                  name="hotlineDisplay"
                  value={formData.hotlineDisplay}
                  onChange={handleChange}
                  placeholder="1900 0909"
                  className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>

              {/* HOTLINE (SỐ THUẦN – DÙNG CHO HREF:TEL) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  HOTLINE (SỐ THUẦN – DÙNG CHO HREF:TEL)
                </label>
                <input
                  type="text"
                  name="hotlineRaw"
                  value={formData.hotlineRaw}
                  onChange={handleChange}
                  placeholder="19000909"
                  className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors font-mono"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="info@vncord-dk.vn"
                  className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>

              {/* GIỜ LÀM VIỆC */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  GIỜ LÀM VIỆC
                </label>
                <input
                  type="text"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleChange}
                  placeholder="08:00 – 18:00 | Thứ 2 – Thứ 7"
                  className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>

              {/* ĐỊA CHỈ */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  ĐỊA CHỈ
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="51 - 53, Ngô Thị Bì, KDC Him Lam, Phường Tân Hưng, TPHCM"
                  className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-200 my-6" />

          {/* Section 2: Mạng xã hội */}
          <div>
            <div className="flex items-center gap-2 mb-6 text-slate-400 font-semibold text-sm">
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Mạng xã hội</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FACEBOOK URL */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  FACEBOOK URL
                </label>
                <input
                  type="text"
                  name="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                  placeholder="https://www.facebook.com/..."
                  className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>

              {/* ZALO URL */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  ZALO URL
                </label>
                <input
                  type="text"
                  name="zaloUrl"
                  value={formData.zaloUrl}
                  onChange={handleChange}
                  placeholder="https://zalo.me/..."
                  className="w-full px-4 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Security Card: Đổi mật khẩu quản trị */}
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 text-slate-800 border border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
            <Lock className="w-4 h-4 text-teal-600" />
            <span>Bảo mật & Mật khẩu Quản trị</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Tài khoản: admin
          </span>
        </div>

        {passwordStatus && (
          <div
            className={`p-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 mb-6 animate-in fade-in duration-200 ${
              passwordStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-rose-50 text-rose-800 border border-rose-300'
            }`}
          >
            {passwordStatus.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                MẬT KHẨU HIỆN TẠI
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                MẬT KHẨU MỚI (TỐI THIỂU 6 KÝ TỰ)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                XÁC NHẬN MẬT KHẨU MỚI
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-slate-800 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-slate-500">
              * Mật khẩu quản trị được lưu mã hóa trong bộ nhớ trình duyệt quản trị viên.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xs transition-all cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-teal-400" />
              <span>Cập nhật mật khẩu mới</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
