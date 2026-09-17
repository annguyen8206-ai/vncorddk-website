import React, { useState, useEffect } from 'react';
import { Building2, Phone, Mail, MapPin, Shield, FileCheck, Award, HeartHandshake, ChevronRight, Dna, Layers, TrendingUp, ShieldAlert, Newspaper, Settings } from 'lucide-react';
import { COMPANY_LEGAL } from '../data/mockData';
import { PageId } from '../types';
import { loadSettings } from '../store/adminStore';
import { VnCordLogo } from './VnCordLogo';

interface FooterProps {
  onOpenLegal: () => void;
  onOpenConsultation: (pkgId?: string) => void;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenConsultation, onNavigate }) => {
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    const handleUpdate = () => setSettings(loadSettings());
    window.addEventListener('vncord_settings_updated', handleUpdate);
    return () => window.removeEventListener('vncord_settings_updated', handleUpdate);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 text-slate-600 text-xs border-t border-slate-200">
      {/* Top CTA Band */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 text-white py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-teal-200" />
              <span>Bảo Hiểm Sinh Học Cho Thế Hệ Tương Lai</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mt-1 text-white">
              Bạn Cần Tư Vấn Lưu Trữ Mẫu Tế Bào Gốc Ngay Hôm Nay?
            </h3>
            <p className="text-teal-50 text-xs sm:text-sm mt-1">
              Đội ngũ bác sĩ & kỹ thuật viên y sinh VNCORD – DK luôn sẵn sàng hỗ trợ mẹ bầu và gia đình 24/7.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenConsultation()}
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white text-teal-900 hover:bg-teal-50 transition-all cursor-pointer shadow-md"
              id="footer-cta-register-btn"
            >
              Đăng Ký Tư Vấn Miễn Phí
            </button>
            <a
              href={`tel:${settings.hotlineRaw}`}
              className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-teal-800/80 hover:bg-teal-900 text-white border border-teal-500/40 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span>{settings.hotlineDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Corporate Info */}
          <div className="md:col-span-5 space-y-4">
            <VnCordLogo
              variant="horizontal"
              size="md"
              onClick={() => handleNav('home')}
            />

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">{COMPANY_LEGAL.companyName}</strong> là doanh nghiệp chuyên môn trong lĩnh vực y sinh, tập trung vào lưu trữ tế bào gốc và vận hành ngân hàng mô tại Việt Nam.
            </p>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{settings.address || COMPANY_LEGAL.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Mã số thuế: <strong className="text-slate-900 font-mono font-bold">{COMPANY_LEGAL.taxCode}</strong> (Cấp ngày: {COMPANY_LEGAL.foundedDate})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Đại diện pháp luật: <strong className="text-slate-900 font-bold">{COMPANY_LEGAL.legalRepresentative}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Đường dây nóng phòng sinh: <strong className="text-teal-700 font-bold">{settings.hotlineDisplay}</strong></span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook VNCORD-DK"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow-blue-200 hover:scale-105"
                  id="footer-facebook-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              )}
              {settings.zaloUrl && (
                <a
                  href={settings.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Zalo VNCORD-DK"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#0068FF] text-xs font-bold transition-all shadow-sm hover:scale-105"
                  style={{ background: '#e8f4ff', border: '2px solid #90c8ff' }}
                  id="footer-zalo-link"
                >
                  <img src="/logo-zalo-icon.png" alt="Zalo" className="w-4 h-4 object-contain" />
                  <span>Zalo</span>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Services Submenu Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Dịch Vụ Y Sinh Trọng Tâm
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => handleNav('service-cord-blood')}
                  className="text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Tế bào gốc dây rốn (Máu cuống rốn – HSC)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-tissue')}
                  className="text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Tế bào gốc từ mô (Mô cuống rốn – MSC)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-expansion')}
                  className="text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Tăng sinh tế bào (Cell Expansion)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('service-nk-cells')}
                  className="text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Điều hòa hệ miễn dịch (Tế bào NK)</span>
                </button>
              </li>
              <li className="pt-2 border-t border-slate-200">
                <button
                  onClick={() => handleNav('technology')}
                  className="text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Công nghệ & Tiêu chuẩn vận hành</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('news')}
                  className="text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Tin tức & Nghiên cứu tế bào</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Liên hệ & Đặt bộ kit vô trùng</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Partners & Commitments */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Đối Tác Chiến Lược & Y Tế
            </h4>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs">
              <div className="font-bold text-teal-800 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-teal-600" />
                <span>Viện Tế Bào Gốc (SCI)</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Hợp tác chuyên sâu thúc đẩy nghiên cứu ứng dụng tế bào gốc vào thực tiễn điều trị và kiểm định chất lượng.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs">
              <div className="font-bold text-sky-800 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                <span>BV Thống Nhất & BVĐK Tâm Trí</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Mạng lưới liên viện hỗ trợ thu nhận mẫu vô trùng tại phòng sinh và hội thảo khoa học thường niên.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p
            onDoubleClick={() => handleNav('admin')}
            title="CÔNG TY CỔ PHẦN NGÂN HÀNG MÔ VNCORD – DK"
            className="cursor-default select-none"
          >
            © {new Date().getFullYear()} CÔNG TY CỔ PHẦN NGÂN HÀNG MÔ VNCORD – DK. Giữ toàn quyền.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button onClick={onOpenLegal} className="hover:text-teal-700 cursor-pointer font-medium">
              Điều khoản pháp lý
            </button>
            <span>•</span>
            <span className="text-teal-700 font-semibold font-mono">MST: 0317291365</span>
            <span>•</span>
            <span className="text-slate-500">Hệ thống Y sinh Chuẩn AABB</span>
            <span>•</span>
            <span className="text-slate-500">Thành viên hệ sinh thái DK Group</span>
            <span>•</span>
            {settings.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                id="footer-bottom-facebook-link"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                Facebook
              </a>
            )}
            {settings.zaloUrl && (
              <a
                href={settings.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold transition-colors hover:opacity-80"
                style={{ color: '#0068FF' }}
                id="footer-bottom-zalo-link"
              >
                <img src="/logo-zalo-icon.png" alt="Zalo" className="w-3.5 h-3.5 object-contain" />
                Zalo
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
