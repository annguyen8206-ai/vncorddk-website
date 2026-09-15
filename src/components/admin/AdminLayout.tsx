import React, { useState } from 'react';
import { AdminTab, PageId } from '../../types';
import { AdminDashboard } from './AdminDashboard';
import { AdminNewsSeo } from './AdminNewsSeo';
import { AdminCrmLeads } from './AdminCrmLeads';
import { AdminPricing } from './AdminPricing';
import { AdminHospitals } from './AdminHospitals';
import { AdminReviews } from './AdminReviews';
import { AdminSettings } from './AdminSettings';
import {
  LayoutDashboard,
  FileText,
  Users,
  DollarSign,
  Building2,
  Star,
  Settings,
  Globe,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User,
} from 'lucide-react';
import { VnCordMark } from '../VnCordLogo';

interface AdminLayoutProps {
  onExitAdmin: () => void;
  onLogout?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitAdmin, onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('settings');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'news' as AdminTab, label: 'Tin tức', icon: FileText },
    { id: 'crm' as AdminTab, label: 'Khách hàng CRM', icon: Users },
    { id: 'pricing' as AdminTab, label: 'Bảng giá', icon: DollarSign },
    { id: 'hospitals' as AdminTab, label: 'Bệnh viện', icon: Building2 },
    { id: 'reviews' as AdminTab, label: 'Đánh giá KH', icon: Star },
    { id: 'settings' as AdminTab, label: 'Cài đặt', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#12161f] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Header bar matching user screenshot */}
      <header className="h-14 bg-[#111620] border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="font-bold text-base text-white tracking-wide flex items-center gap-2.5">
            <VnCordMark size={28} />
            <span>VNCORD-DK Admin</span>
          </div>
        </div>

        {/* Top Right: Xem trang web | admin | Đăng xuất */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <button
            onClick={onExitAdmin}
            className="text-slate-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            id="admin-view-site-btn"
          >
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>Xem trang web</span>
          </button>

          <div className="flex items-center gap-1.5 text-slate-300 font-medium px-2 py-1 rounded-md bg-slate-800/50">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">admin</span>
          </div>

          <button
            onClick={onLogout ? onLogout : onExitAdmin}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
            title="Đăng xuất khỏi phiên quản trị"
          >
            <LogOut className="w-3 h-3" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Main Body: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Desktop matching user screenshot */}
        <aside
          className={`hidden md:flex flex-col justify-between bg-[#111620] border-r border-slate-800/80 transition-all duration-200 shrink-0 ${
            isCollapsed ? 'w-16' : 'w-56'
          }`}
        >
          {/* Nav List */}
          <div className="py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`admin-nav-${item.id}`}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#1c2331] text-sky-400 border-l-2 border-sky-500'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                  title={item.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Bottom "Thu gọn" button matching user screenshot */}
          <div className="p-3 border-t border-slate-800/80">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 mx-auto" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span>Thu gọn</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Mobile Dropdown Sidebar */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-14 bg-[#111620] border-b border-slate-800 z-40 p-4 space-y-1 shadow-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold rounded-lg text-left ${
                    isActive ? 'bg-[#1c2331] text-sky-400' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#12161f]">
          {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
          {activeTab === 'news' && <AdminNewsSeo />}
          {activeTab === 'crm' && <AdminCrmLeads />}
          {activeTab === 'pricing' && <AdminPricing />}
          {activeTab === 'hospitals' && <AdminHospitals />}
          {activeTab === 'reviews' && <AdminReviews />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};
