import React, { useState } from 'react';
import { Award, ShieldCheck, Microscope, Star, Building2, Quote, CheckCircle2, FileCheck, Stethoscope, ChevronRight, Users } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

interface CredibilityAndPartnersProps {
  onOpenConsultation: () => void;
  onOpenLegal: () => void;
  onNavigateTechnology: () => void;
}

export const CredibilityAndPartners: React.FC<CredibilityAndPartnersProps> = ({ onOpenConsultation, onOpenLegal, onNavigateTechnology }) => {
  const [activeTab, setActiveTab] = useState<'hop-tac' | 'danh-gia' | 'tieu-chuan'>('hop-tac');

  return (
    <section id="uy-tin-hop-tac" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 text-sky-900 border border-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            Khía Cạnh (B): Đánh Giá Uy Tín & Năng Lực Chuyên Môn
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Uy Tín Y Khoa, Hợp Tác Viện Trường & Đánh Giá Thực Tế
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            VNCORD – DK xây dựng uy tín dựa trên nền tảng pháp lý minh bạch, thỏa thuận hợp tác nghiên cứu chuyên sâu cùng Viện Tế bào gốc và liên kết thực tiễn với các bệnh viện lớn tại Việt Nam.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-100 border border-slate-200 gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('hop-tac')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'hop-tac'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              id="tab-btn-partnership"
            >
              Hợp Tác Chiến Lược Y Tế
            </button>
            <button
              onClick={() => setActiveTab('danh-gia')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'danh-gia'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              id="tab-btn-reviews"
            >
              Đánh Giá Bác Sĩ & Gia Đình
            </button>
            <button
              onClick={() => setActiveTab('tieu-chuan')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'tieu-chuan'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              id="tab-btn-standards"
            >
              Tiêu Chuẩn Phòng Lab & An Toàn
            </button>
          </div>
        </div>

        {/* Content Tab 1: Strategic Partnerships */}
        {activeTab === 'hop-tac' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Partner 1: Viện Tế bào gốc */}
              <div className="bg-teal-50/70 rounded-2xl p-7 border border-teal-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-teal-100 text-teal-800 border border-teal-200">
                      Hợp Tác Chuyên Sâu
                    </span>
                    <Microscope className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Thỏa Thuận Hợp Tác Với Viện Tế Bào Gốc
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    VNCORD-DK ký kết thỏa thuận hợp tác chính thức với <strong>Viện Tế bào gốc</strong> (Stem Cell Institute) nhằm thúc đẩy các nghiên cứu ứng dụng tế bào gốc vào thực tiễn điều trị và chăm sóc sức khỏe.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Chuẩn hóa quy trình phân lập và đánh giá độ sống sót tế bào theo chuẩn khoa học</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Chuyển giao và kết nối các đề tài nghiên cứu thử nghiệm lâm sàng y học tái tạo</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>Đào tạo liên tục cho kỹ thuật viên và kiểm định chéo chất lượng sinh phẩm</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-teal-200 flex items-center justify-between text-xs">
                  <span className="text-teal-800 font-semibold">Bảo chứng nền tảng nghiên cứu y sinh học</span>
                  <span className="text-slate-600 font-mono font-bold">Viện Tế Bào Gốc</span>
                </div>
              </div>

              {/* Partner 2: Hệ thống Bệnh viện lớn */}
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-sky-100 text-sky-800 border border-sky-200">
                      Liên Kết Hệ Thống Y Tế
                    </span>
                    <Building2 className="w-6 h-6 text-sky-700" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    Bệnh Viện Thống Nhất & BV ĐK Tâm Trí Đồng Tháp
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Phối hợp cùng các đơn vị khám chữa bệnh lớn tổ chức các hội thảo khoa học, phổ biến kiến thức và triển khai giải pháp lưu trữ tế bào gốc cuống rốn cho sản phụ và gia đình.
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="font-bold text-xs sm:text-sm text-slate-900">Bệnh Viện Thống Nhất (TP.HCM)</div>
                      <p className="text-xs text-slate-600 mt-1">
                        Hội thảo khoa học về ứng dụng tế bào gốc trong y học tái tạo, tập huấn quy trình lấy mẫu an toàn tại phòng sinh.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="font-bold text-xs sm:text-sm text-slate-900">Bệnh Viện Đa Khoa Tâm Trí Đồng Tháp</div>
                      <p className="text-xs text-slate-600 mt-1">
                        Phổ cập kiến thức "Bảo hiểm sinh học" cho hàng trăm sản phụ khu vực ĐBSCL, tiếp nhận bộ kit lưu trữ ngay tại khoa Sản.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Hội thảo định kỳ & Hỗ trợ phòng sinh</span>
                  <button
                    onClick={() => {
                      const el = document.getElementById('benh-vien-lien-ket');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-teal-700 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    Xem mạng lưới bệnh viện <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scientific Seminar Callout */}
            <div className="bg-sky-50/70 rounded-2xl p-6 border border-sky-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-700 text-white flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Đồng Hành Khoa Học Cùng Các Bác Sĩ Sản - Nhi
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Các buổi đào tạo, cập nhật kỹ thuật thu thập mẫu tại phòng sinh diễn ra thường xuyên nhằm đảm bảo từng giọt máu cuống rốn được thu thập trọn vẹn nhất.
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-teal-700 text-white hover:bg-teal-800 transition-colors shrink-0 cursor-pointer"
              >
                Đăng Ký Tư Vấn Cùng Bác Sĩ
              </button>
            </div>
          </div>
        )}

        {/* Content Tab 2: Reviews & Evaluations */}
        {activeTab === 'danh-gia' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="inline-block text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 mb-3">
                      "{rev.highlight}"
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">{rev.author}</div>
                      <div className="text-xs text-slate-500">{rev.role}</div>
                    </div>
                    <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-1 rounded border border-sky-100">
                      {rev.hospital}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <span className="text-xs text-slate-500">
                100% đánh giá được ghi nhận từ các hội thảo y khoa và phản hồi dịch vụ chính thức của khách hàng VNCORD-DK.
              </span>
            </div>
          </div>
        )}

        {/* Content Tab 3: Lab Standards */}
        {activeTab === 'tieu-chuan' && (
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="max-w-3xl mb-8">
              <h3 className="text-xl font-bold text-slate-900">
                Quy Chuẩn An Toàn & Bảo Quản Ngân Hàng Mô
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Tại VNCORD-DK, mỗi mẫu tế bào gốc của bé là tài sản sinh học vô giá được bảo vệ với những tiêu chuẩn kỹ thuật nghiêm ngặt nhất.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Mã Hóa Định Danh Kép</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Mỗi mẫu tế bào được gắn mã vạch Barcode định danh 2 lớp độc bản, bảo mật tuyệt đối thông tin danh tính gia đình và ngăn ngừa hoàn toàn sai sót nhầm lẫn mẫu.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold mb-3">
                  <Microscope className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Kiểm Soát Tỷ Lệ Sống</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Đo lường chỉ số tế bào có nhân (TNC), đếm số lượng tế bào gốc CD34+ và kiểm tra tỷ lệ sống sót &gt; 90% bằng máy đếm tế bào dòng chảy Flow Cytometry trước khi cấp đông.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Nguồn Cấp Lạnh Tự Động</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Hệ thống bình trữ Nitơ lỏng -196°C duy trì hoàn toàn bằng nguyên lý vật lý của nitơ lỏng, trang bị bồn cấp bù tự động và hệ thống cảnh báo nhiệt độ từ xa qua IoT 24/7.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={onNavigateTechnology}
                className="text-teal-700 font-bold text-xs sm:text-sm hover:underline inline-flex items-center gap-1 cursor-pointer"
                id="tieu-chuan-tab-view-technology-btn"
              >
                <span>Tìm hiểu đầy đủ công nghệ & quy trình vận hành</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
