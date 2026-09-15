import React, { useState, useEffect } from 'react';
import {
  Building2,
  FileCheck,
  Award,
  Users,
  ShieldCheck,
  Microscope,
  Calendar,
  MapPin,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Clock,
  HeartPulse,
} from 'lucide-react';
import { COMPANY_LEGAL, REVIEWS } from '../data/mockData';
import { VnCordLogo } from './VnCordLogo';
import { loadSettings } from '../store/adminStore';

interface AboutPageProps {
  onOpenConsultation: () => void;
  onOpenLegal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation, onOpenLegal }) => {
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    const handleUpdate = () => setSettings(loadSettings());
    window.addEventListener('vncord_settings_updated', handleUpdate);
    return () => window.removeEventListener('vncord_settings_updated', handleUpdate);
  }, []);

  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Hero Banner for About Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-teal-50 via-sky-50/60 to-white text-slate-800 rounded-3xl p-8 sm:p-12 md:p-14 border border-teal-100 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-6 border border-teal-200 shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-teal-700" />
              <span>Giới Thiệu VNCORD – DK</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-6">
              Về Chúng Tôi – Ngân Hàng Mô & Tế Bào Gốc Tiên Phong
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              {COMPANY_LEGAL.companyName} là đơn vị chuyên môn hoạt động trong lĩnh vực vận hành ngân hàng mô, lưu trữ tế bào gốc, nghiên cứu khoa học và ứng dụng công nghệ y sinh hiện đại vì sức khỏe người Việt.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onOpenLegal}
                className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-teal-700 text-sm font-bold rounded-xl border border-slate-200 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
                id="about-view-legal-btn"
              >
                <FileCheck className="w-4 h-4 text-teal-600" />
                <span>Xem Hồ Sơ Pháp Lý Chi Tiết</span>
              </button>
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                id="about-consult-cta-btn"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Liên Hệ Ban Chuyên Môn</span>
              </button>
            </div>
          </div>

          {/* Official Brand Logo Feature Card */}
          <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-sky-100 shadow-lg shadow-sky-900/5 flex flex-col items-center shrink-0 w-full sm:w-auto min-w-[260px]">
            <VnCordLogo variant="vertical" size="lg" />
            <div className="mt-4 pt-3 border-t border-slate-100 text-center w-full">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Biểu Trưng Chính Thức
              </span>
              <span className="text-xs font-semibold text-teal-700 mt-0.5 block">
                Ngân Hàng Mô & Tế Bào Gốc
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Overview & Legal Specs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main profile card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xs border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-2.5 h-8 bg-teal-600 rounded-full"></span>
              Thông Tin Doanh Nghiệp & Giấy Phép Hoạt Động
            </h2>
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Được thành lập ngày <strong>{COMPANY_LEGAL.foundedDate}</strong> dưới sự quản lý và cấp phép của các cơ quan quản lý y tế và chuyên môn, VNCORD-DK định hình là trung tâm kết nối khoa học chuyên sâu giữa các cơ sở sản phụ khoa hàng đầu và viện nghiên cứu tế bào gốc đầu ngành.
              </p>
              <p>
                Với cơ sở vật chất hiện đại đặt tại số 51 - 53, Ngô Thị Bì, KDC Him Lam, Phường Tân Hưng, TPHCM, hệ thống phòng sạch (Cleanroom) và hệ thống cấp đông tự động bảo đảm chuẩn mực lưu trữ mô và tế bào tương đương các ngân hàng sinh học quốc tế.
              </p>
            </div>

            {/* Legal Attributes Table */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Mã Số Doanh Nghiệp (MST)</div>
                <div className="text-base font-bold text-teal-800 font-mono">{COMPANY_LEGAL.taxCode}</div>
                <div className="text-xs text-slate-500 mt-1">Cấp bởi Sở KH&ĐT TP. Hồ Chí Minh</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Đại Diện Pháp Luật</div>
                <div className="text-base font-bold text-slate-900">{COMPANY_LEGAL.legalRepresentative}</div>
                <div className="text-xs text-slate-500 mt-1">Chủ tịch HĐQT kiêm Tổng Giám Đốc</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Địa Chỉ Trụ Sở Chính</div>
                <div className="text-sm font-bold text-slate-900">{COMPANY_LEGAL.address}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Lĩnh Vực Hoạt Động</div>
                <div className="text-xs font-medium text-slate-800">{COMPANY_LEGAL.mainSector}</div>
              </div>
            </div>
          </div>

          {/* Pillars & Values */}
          <div className="bg-gradient-to-br from-teal-50 to-sky-50 text-slate-800 rounded-2xl p-8 border border-teal-200 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Cam Kết Y Sinh Học
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Mỗi tế bào được lưu trữ tại VNCORD-DK là một lời hứa bảo vệ sự sống lâu dài, được quản lý bằng quy trình truy vết mã vạch cá nhân hóa tuyệt đối bảo mật.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Hệ thống Nitơ lỏng -196°C vận hành độc lập, tự động bổ sung liên tục.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Đồng hành học thuật và kiểm chuẩn chất lượng với Viện Tế bào gốc.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Quy trình điều phối vô trùng khép kín đến tận phòng sinh 24/7.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-teal-200 text-xs text-teal-800 flex items-center justify-between">
              <span className="font-semibold">Hỗ trợ kỹ thuật 24/7:</span>
              <span className="font-extrabold text-teal-900">{settings.hotlineDisplay}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Academic Partnerships */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Hợp Tác Chiến Lược & Hội Đồng Cố Vấn</h2>
          <p className="text-slate-600 text-sm">
            Kết hợp giữa năng lực pháp lý ngân hàng mô và năng lực nghiên cứu ứng dụng từ các viện nghiên cứu và bệnh viện tuyến đầu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Viện Tế Bào Gốc (SCI)</h3>
            <p className="text-slate-600 text-sm leading-relaxed grow">
              Hợp tác chuyển giao quy trình phân lập, kiểm định độ sống tế bào và đào tạo đội ngũ chuyên viên phòng sạch chuẩn quốc tế.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-teal-700 font-semibold">
              Biên bản ghi nhớ R&D Y sinh
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Bệnh Viện Thống Nhất</h3>
            <p className="text-slate-600 text-sm leading-relaxed grow">
              Tổ chức các hội thảo y khoa chuyên đề, báo cáo lâm sàng về ứng dụng tế bào gốc trong phục hồi chức năng và điều hòa miễn dịch.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-sky-700 font-semibold">
              Hội thảo khoa học định kỳ
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">BVĐK Tâm Trí Đồng Tháp</h3>
            <p className="text-slate-600 text-sm leading-relaxed grow">
              Đối tác chiến lược khu vực Tây Nam Bộ trong việc triển khai quy trình thu thập mẫu tại phòng sinh và kết nối điều trị liên viện.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-semibold">
              Mạng lưới phòng sinh vệ tinh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
