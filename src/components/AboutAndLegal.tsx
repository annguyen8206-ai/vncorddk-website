import React from 'react';
import { Building2, User, Calendar, MapPin, Briefcase, FileCheck, Stethoscope, HeartHandshake, ShieldCheck, Microscope, FlaskConical, ExternalLink } from 'lucide-react';
import { COMPANY_LEGAL } from '../data/mockData';

interface AboutAndLegalProps {
  onOpenConsultation: () => void;
  onOpenLegalModal: () => void;
}

export const AboutAndLegal: React.FC<AboutAndLegalProps> = ({ onOpenConsultation, onOpenLegalModal }) => {
  return (
    <section id="gioi-thieu" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Hồ Sơ Doanh Nghiệp & Pháp Lý
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Công Ty Cổ Phần Ngân Hàng Mô <span className="text-teal-700">VNCORD – DK</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Doanh nghiệp chuyên môn trong lĩnh vực y sinh, tập trung vào lưu trữ tế bào gốc và vận hành ngân hàng mô tại Việt Nam, kết nối nghiên cứu học thuật cùng hệ thống lâm sàng y tế hàng đầu.
          </p>
        </div>

        {/* 2-Column Overview: Legal Card + Mission Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Legal Card */}
          <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative">
            <div className="flex items-center justify-between pb-5 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Thông Tin Pháp Lý & Hành Chính</h3>
                  <p className="text-xs text-slate-500">Đăng ký và cấp phép theo quy định pháp luật Việt Nam</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-300">
                Đang hoạt động
              </span>
            </div>

            {/* Legal items table */}
            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200">
                <Building2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div className="grow">
                  <span className="text-slate-500 block text-xs">Tên doanh nghiệp:</span>
                  <span className="font-bold text-slate-900">{COMPANY_LEGAL.companyName}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200">
                  <FileCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">Mã số thuế:</span>
                    <span className="font-mono font-bold text-teal-800 text-base">{COMPANY_LEGAL.taxCode}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200">
                  <User className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">Người đại diện pháp luật:</span>
                    <span className="font-bold text-slate-900">{COMPANY_LEGAL.legalRepresentative}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200">
                <Calendar className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs">Ngày bắt đầu hoạt động:</span>
                  <span className="font-semibold text-slate-900">{COMPANY_LEGAL.foundedDate} (Cơ quan thuế quản lý xác nhận)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200">
                <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs">Địa chỉ trụ sở chính:</span>
                  <span className="font-semibold text-slate-900">{COMPANY_LEGAL.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200">
                <Briefcase className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-xs">Lĩnh vực kinh doanh chính:</span>
                  <span className="font-medium text-slate-800 leading-snug">{COMPANY_LEGAL.mainSector}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">Tra cứu thông tin chính thức</span>
              <button
                onClick={onOpenLegalModal}
                className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
                id="view-full-legal-details-btn"
              >
                <span>Xem chi tiết chứng thư</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mission & Key Roles Card */}
          <div className="lg:col-span-6 space-y-6">
            {/* Value card 1 */}
            <div className="bg-gradient-to-br from-teal-50/70 to-sky-50/70 rounded-2xl p-6 sm:p-7 border border-teal-200/80">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Lưu Trữ Tế Bào Gốc – "Bảo Hiểm Sinh Học" Cho Tương Lai
              </h3>
              <p className="text-slate-700 text-sm mt-2 leading-relaxed">
                Tế bào gốc cuống rốn là tế bào nguyên thủy nhất của sự sống. Lưu trữ tại VNCORD-DK giúp gia đình bảo toàn một nguồn tế bào gốc tạo máu (HSC) và tế bào gốc trung mô (MSC) chất lượng cao nhất, hỗ trợ điều trị nhiều bệnh lý hiểm nghèo về máu và suy giảm miễn dịch trong tương lai.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-teal-800 border border-teal-200">
                  Bạch cầu & Suy tủy
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-teal-800 border border-teal-200">
                  Thalassemia
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-teal-800 border border-teal-200">
                  Rối loạn miễn dịch
                </span>
              </div>
            </div>

            {/* Value card 2 */}
            <div className="bg-gradient-to-br from-sky-50/70 to-indigo-50/70 rounded-2xl p-6 sm:p-7 border border-sky-200/80">
              <div className="w-10 h-10 rounded-xl bg-sky-700 text-white flex items-center justify-center mb-4 shadow-sm">
                <Microscope className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Phát Triển Y Học Tái Tạo & Công Nghệ Y Sinh
              </h3>
              <p className="text-slate-700 text-sm mt-2 leading-relaxed">
                VNCORD-DK đóng vai trò tiên phong trong việc nâng cao năng lực lưu trữ mô và ứng dụng công nghệ sinh học trong nền y tế nước nhà. Kết nối trực tiếp giữa các công trình nghiên cứu hàn lâm và ứng dụng lâm sàng điều trị thực tiễn.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-sky-800 border border-sky-200">
                  Thoái hóa khớp & Mô sụn
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-sky-800 border border-sky-200">
                  Tái tạo tế bào gan & thần kinh
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-sky-800 border border-sky-200">
                  Y học cá thể hóa
                </span>
              </div>
            </div>

            {/* Strategic Bridge summary banner */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 flex items-center justify-between gap-4 shadow-2xs">
              <div>
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">Cầu Nối Y Sinh Trọng Điểm</div>
                <div className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                  Viện Tế bào gốc ⇄ Bệnh viện Thống Nhất ⇄ BV ĐK Tâm Trí
                </div>
              </div>
              <button
                onClick={onOpenConsultation}
                className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shrink-0 shadow-xs transition-colors cursor-pointer"
              >
                Nhận Hồ Sơ Tư Vấn
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
