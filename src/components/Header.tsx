import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  Phone,
  MapPin,
  Menu,
  X,
  FileCheck,
  Stethoscope,
  ChevronDown,
  Newspaper,
  Mail,
  Home,
  Users,
  Settings,
} from 'lucide-react';
import { VnCordLogo } from './VnCordLogo';
import { COMPANY_LEGAL } from '../data/mockData';
import { PageId } from '../types';
import { loadSettings } from '../store/adminStore';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (pkgId?: string) => void;
  onOpenLegal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenConsultation,
  onOpenLegal,
}) => {
  const [settings, setSettings] = useState(loadSettings());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpdate = () => setSettings(loadSettings());
    window.addEventListener('vncord_settings_updated', handleUpdate);
    return () => window.removeEventListener('vncord_settings_updated', handleUpdate);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceClick = (servicePage: PageId) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(servicePage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServiceActive =
    currentPage === 'service-cord-blood' ||
    currentPage === 'service-tissue' ||
    currentPage === 'service-expansion' ||
    currentPage === 'service-nk-cells';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      {/* Top emergency & legal banner */}
      <div className="bg-teal-50/90 border-b border-teal-100 text-teal-900 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-bold text-teal-800">
              <Shield className="w-3.5 h-3.5 text-teal-600" />
              <span>Ngân Hàng Mô VNCORD – DK</span>
            </span>
            <span className="hidden sm:inline-block text-teal-300">|</span>
            <button
              onClick={onOpenLegal}
              className="hidden sm:inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 transition-colors cursor-pointer underline decoration-teal-300 underline-offset-2 font-medium"
              id="top-bar-legal-btn"
            >
              <FileCheck className="w-3 h-3 text-teal-600" />
              <span>MST: {COMPANY_LEGAL.taxCode} (Cấp phép chính thức)</span>
            </button>
            <span className="hidden md:inline-block text-teal-300">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-600">
              <MapPin className="w-3 h-3 text-teal-600" />
              <span>51 - 53 Ngô Thị Bì, KDC Him Lam, P. Tân Hưng, TPHCM</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Social icons */}
            {settings.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook VNCORD-DK"
                className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110 shadow-sm"
                id="header-facebook-link"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
            )}
            {settings.zaloUrl && (
              <a
                href={settings.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Zalo VNCORD-DK"
                className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full transition-all hover:scale-110 shadow-sm"
                style={{ background: '#e8f4ff', border: '2px solid #90c8ff' }}
                id="header-zalo-link"
              >
                <img src="/logo-zalo-icon.png" alt="Zalo" className="w-3.5 h-3.5 object-contain" />
              </a>
            )}
            <div className="flex items-center gap-1.5 font-semibold text-teal-900 bg-white px-2.5 py-0.5 rounded-full border border-teal-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Phone className="w-3 h-3 text-teal-600" />
              <span>Hotline 24/7: </span>
              <a href={`tel:${settings.hotlineRaw}`} className="text-teal-700 hover:text-teal-900 font-extrabold">
                {settings.hotlineDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <VnCordLogo variant="horizontal" size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {/* Trang chủ */}
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors py-2 cursor-pointer ${
                currentPage === 'home' ? 'text-teal-600 font-bold' : 'hover:text-teal-600'
              }`}
              id="nav-home-btn"
            >
              Trang Chủ
            </button>

            {/* Về Chúng tôi */}
            <button
              onClick={() => {
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors py-2 cursor-pointer ${
                currentPage === 'about' ? 'text-teal-600 font-bold' : 'hover:text-teal-600'
              }`}
              id="nav-about-btn"
            >
              Về Chúng Tôi
            </button>

            {/* Công nghệ */}
            <button
              onClick={() => {
                onNavigate('technology');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors py-2 cursor-pointer ${
                currentPage === 'technology' ? 'text-teal-600 font-bold' : 'hover:text-teal-600'
              }`}
              id="nav-technology-btn"
            >
              Công Nghệ
            </button>

            {/* Dịch vụ Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`transition-colors py-2 cursor-pointer flex items-center gap-1.5 ${
                  isServiceActive ? 'text-teal-600 font-bold' : 'hover:text-teal-600'
                }`}
                id="nav-services-btn"
              >
                <span>Dịch Vụ</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-teal-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Dropdown Menu Popup */}
              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Danh mục dịch vụ y sinh
                  </div>

                  <button
                    onClick={() => handleServiceClick('service-cord-blood')}
                    className={`w-full text-left px-4 py-2.5 hover:bg-teal-50/70 transition-colors cursor-pointer group ${
                      currentPage === 'service-cord-blood' ? 'bg-teal-50' : ''
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                      Tế bào gốc dây rốn (HSC)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Lưu trữ tế bào gốc máu cuống rốn tạo máu
                    </div>
                  </button>

                  <button
                    onClick={() => handleServiceClick('service-tissue')}
                    className={`w-full text-left px-4 py-2.5 hover:bg-teal-50/70 transition-colors cursor-pointer group ${
                      currentPage === 'service-tissue' ? 'bg-teal-50' : ''
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                      Tế bào gốc từ mô (MSC)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Lưu trữ tế bào gốc trung mô cuống rốn
                    </div>
                  </button>

                  <button
                    onClick={() => handleServiceClick('service-expansion')}
                    className={`w-full text-left px-4 py-2.5 hover:bg-teal-50/70 transition-colors cursor-pointer group ${
                      currentPage === 'service-expansion' ? 'bg-teal-50' : ''
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                      Tăng sinh tế bào
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Nhân bội số lượng tế bào đạt chuẩn trị liệu
                    </div>
                  </button>

                  <button
                    onClick={() => handleServiceClick('service-nk-cells')}
                    className={`w-full text-left px-4 py-2.5 hover:bg-teal-50/70 transition-colors cursor-pointer group ${
                      currentPage === 'service-nk-cells' ? 'bg-teal-50' : ''
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                      Điều hòa hệ miễn dịch (NK)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Hoạt hóa tế bào diệt tự nhiên phòng ngừa ung thư
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Tin tức */}
            <button
              onClick={() => {
                onNavigate('news');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors py-2 cursor-pointer ${
                currentPage === 'news' ? 'text-teal-600 font-bold' : 'hover:text-teal-600'
              }`}
              id="nav-news-btn"
            >
              Tin Tức
            </button>

            {/* Liên hệ */}
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors py-2 cursor-pointer ${
                currentPage === 'contact' ? 'text-teal-600 font-bold' : 'hover:text-teal-600'
              }`}
              id="nav-contact-btn"
            >
              Liên Hệ
            </button>
          </nav>

          {/* Action CTA & Mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenConsultation()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-teal-500/20 transition-all cursor-pointer"
              id="header-consult-btn"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Đăng Ký Tư Vấn</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {/* Trang chủ */}
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'home' ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Trang Chủ
          </button>

          {/* Về Chúng tôi */}
          <button
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'about' ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Về Chúng Tôi
          </button>

          {/* Công nghệ */}
          <button
            onClick={() => {
              onNavigate('technology');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'technology' ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Công Nghệ
          </button>

          {/* Dịch vụ (có 4 submenu) */}
          <div className="border-y border-slate-100 py-1">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <span>Dịch Vụ</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform ${
                  mobileServicesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="pl-4 pr-2 py-1.5 space-y-0.5 bg-slate-50 rounded-xl">
                <button
                  onClick={() => handleServiceClick('service-cord-blood')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'service-cord-blood' ? 'bg-teal-100 text-teal-800' : 'text-slate-700 hover:bg-white hover:text-teal-700'
                  }`}
                >
                  Tế bào gốc dây rốn (HSC)
                </button>
                <button
                  onClick={() => handleServiceClick('service-tissue')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'service-tissue' ? 'bg-teal-100 text-teal-800' : 'text-slate-700 hover:bg-white hover:text-teal-700'
                  }`}
                >
                  Tế bào gốc từ mô (MSC)
                </button>
                <button
                  onClick={() => handleServiceClick('service-expansion')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'service-expansion' ? 'bg-teal-100 text-teal-800' : 'text-slate-700 hover:bg-white hover:text-teal-700'
                  }`}
                >
                  Tăng sinh tế bào
                </button>
                <button
                  onClick={() => handleServiceClick('service-nk-cells')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentPage === 'service-nk-cells' ? 'bg-teal-100 text-teal-800' : 'text-slate-700 hover:bg-white hover:text-teal-700'
                  }`}
                >
                  Điều hòa hệ miễn dịch (NK)
                </button>
              </div>
            )}
          </div>

          {/* Tin tức */}
          <button
            onClick={() => {
              onNavigate('news');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'news' ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Tin Tức
          </button>

          {/* Liên hệ */}
          <button
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
              currentPage === 'contact' ? 'bg-teal-50 text-teal-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Liên Hệ
          </button>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-sky-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Đăng Ký Tư Vấn Mẫu</span>
            </button>
            <a
              href={`tel:${settings.hotlineRaw}`}
              className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline 24/7: {settings.hotlineDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
