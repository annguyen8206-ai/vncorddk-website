import React from 'react';
import { ShieldCheck, Award, Building2, Sparkles, ArrowRight, Dna, Clock, CheckCircle2, ChevronDown } from 'lucide-react';
import { COMPANY_LEGAL } from '../data/mockData';

interface HeroProps {
  onSelectOption: (option: 'A' | 'B' | 'C') => void;
  onOpenConsultation: () => void;
  onOpenLegal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectOption, onOpenConsultation, onOpenLegal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-sky-50/40 to-white text-slate-800 pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Background medical grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      
      {/* Soft ambient orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/90 border border-teal-200 text-teal-900 text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span>Tổ Chức Ngân Hàng Mô Được Cấp Phép</span>
          </div>
          <button
            onClick={onOpenLegal}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-sky-200 text-sky-900 hover:text-sky-950 text-xs font-medium cursor-pointer transition-colors shadow-2xs"
          >
            <span>MST: {COMPANY_LEGAL.taxCode}</span>
            <span className="text-teal-600 font-bold">•</span>
            <span>51-53 Ngô Thị Bì, P. Tân Hưng, TPHCM</span>
          </button>
        </div>

        {/* Hero Main Heading & Intro */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight text-slate-900">
              Lưu Giữ <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-cyan-700 to-sky-700 font-black">"Bảo Hiểm Sinh Học"</span> Vì Tương Lai Con & Gia Đình
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              <strong className="text-slate-900 font-bold">Công ty Cổ phần Ngân hàng mô VNCORD – DK</strong> là doanh nghiệp chuyên môn trong lĩnh vực y sinh, tập trung vào lưu trữ tế bào gốc và vận hành ngân hàng mô tại Việt Nam. Đồng hành cùng <span className="text-teal-700 font-bold">Viện Tế bào gốc</span> và các bệnh viện lớn (như <span className="text-sky-700 font-bold">Bệnh viện Thống Nhất</span>, <span className="text-sky-700 font-bold">Bệnh viện Đa khoa Tâm Trí Đồng Tháp</span>).
            </p>

            {/* Key trust bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 text-sm text-slate-700 bg-white p-3 rounded-xl border border-teal-100 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Lưu Trữ Tế Bào Gốc Cuống Rốn</div>
                  <div className="text-xs text-slate-500">Tạo máu (HSC) & Trung mô (MSC) đông sâu -196°C</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-sm text-slate-700 bg-white p-3 rounded-xl border border-teal-100 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Phát Triển Y Học Tái Tạo</div>
                  <div className="text-xs text-slate-500">Nâng cao năng lực lưu trữ và ứng dụng CNSH Việt Nam</div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 hover:from-teal-700 hover:to-sky-800 shadow-md shadow-teal-700/20 transition-all transform active:scale-98 cursor-pointer flex items-center gap-2"
                id="hero-primary-consult-btn"
              >
                <Sparkles className="w-5 h-5 text-teal-200" />
                <span>Đăng Ký Tư Vấn Gói Lưu Trữ</span>
                <ArrowRight className="w-4 h-4 text-teal-200" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('quy-trinh-chi-phi');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-700 hover:text-teal-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors cursor-pointer flex items-center gap-2"
                id="hero-see-process-btn"
              >
                <span>Xem Quy Trình & Bảng Giá</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white p-6 sm:p-7 border border-slate-200 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Dna className="w-5 h-5 text-teal-600 animate-pulse" />
                  <span className="text-xs uppercase font-extrabold tracking-widest text-teal-800">
                    Ngân Hàng Tế Bào Gốc Chuẩn Quốc Tế
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-mono font-bold">
                  ISO / GMP Ready
                </span>
              </div>

              {/* Fast Stats Grid */}
              <div className="grid grid-cols-2 gap-3.5 my-5">
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                  <div className="text-2xl font-black text-cyan-700 font-mono">-196°C</div>
                  <div className="text-xs text-slate-800 font-bold mt-1">Hệ Thống Nitơ Lỏng</div>
                  <div className="text-[11px] text-slate-500">Bảo toàn vĩnh cửu tế bào</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                  <div className="text-2xl font-black text-teal-700 font-mono">80+</div>
                  <div className="text-xs text-slate-800 font-bold mt-1">Bệnh Lý Hỗ Trợ</div>
                  <div className="text-[11px] text-slate-500">Bệnh về máu & miễn dịch</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                  <div className="text-2xl font-black text-emerald-700 font-mono">24/7</div>
                  <div className="text-xs text-slate-800 font-bold mt-1">Kỹ Thuật Thu Thập</div>
                  <div className="text-[11px] text-slate-500">Có mặt ngay khi sản phụ sinh</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                  <div className="text-2xl font-black text-sky-700 font-mono">100%</div>
                  <div className="text-xs text-slate-800 font-bold mt-1">Pháp Lý Minh Bạch</div>
                  <div className="text-[11px] text-slate-500">Cấp phép ngân hàng mô</div>
                </div>
              </div>

              {/* Trust Partners banner */}
              <div className="bg-teal-50/80 rounded-xl p-3.5 border border-teal-100 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-teal-900 font-bold">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>Cầu nối Nghiên cứu & Liên kết Trọng điểm:</span>
                </div>
                <p className="text-slate-600 leading-normal">
                  Ký kết thỏa thuận chuyên sâu với <strong className="text-slate-900">Viện Tế bào gốc</strong> & đồng hành cùng <strong className="text-slate-900">Bệnh viện Thống Nhất</strong>, <strong className="text-slate-900">Bệnh viện ĐK Tâm Trí Đồng Tháp</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Quick Jump Cards matching the user query's (A), (B), (C) */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-7">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Điều bạn quan tâm nhất về VNCORD – DK
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              Bạn Muốn Tìm Hiểu Sâu Hơn Về Khía Cạnh Nào?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Option A */}
            <div
              onClick={() => onSelectOption('A')}
              className="group relative rounded-xl bg-white hover:bg-teal-50/40 p-5 border border-slate-200 hover:border-teal-400 shadow-2xs hover:shadow-md cursor-pointer transition-all transform hover:-translate-y-0.5"
              id="hero-jump-option-a"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-teal-100 border border-teal-200 text-teal-800 font-black text-sm flex items-center justify-center font-mono">
                  A
                </span>
                <span className="text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Chi phí và quy trình lưu trữ tế bào gốc tại đây?
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Quy trình 5 bước chuẩn y khoa khép kín từ phòng sinh đến bình Nitơ -196°C & Công cụ tính toán dự toán chi phí trọn gói.
              </p>
            </div>

            {/* Option B */}
            <div
              onClick={() => onSelectOption('B')}
              className="group relative rounded-xl bg-white hover:bg-sky-50/40 p-5 border border-slate-200 hover:border-sky-400 shadow-2xs hover:shadow-md cursor-pointer transition-all transform hover:-translate-y-0.5"
              id="hero-jump-option-b"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 text-sky-800 font-black text-sm flex items-center justify-center font-mono">
                  B
                </span>
                <span className="text-xs font-bold text-sky-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Xem đánh giá <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                Các đánh giá / review về uy tín của trung tâm này?
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Thẩm định chuyên môn y khoa, hồ sơ pháp lý minh bạch (MST 0317291365) và đánh giá từ các bác sĩ sản khoa & gia đình.
              </p>
            </div>

            {/* Option C */}
            <div
              onClick={() => onSelectOption('C')}
              className="group relative rounded-xl bg-white hover:bg-emerald-50/40 p-5 border border-slate-200 hover:border-emerald-400 shadow-2xs hover:shadow-md cursor-pointer transition-all transform hover:-translate-y-0.5"
              id="hero-jump-option-c"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 font-black text-sm flex items-center justify-center font-mono">
                  C
                </span>
                <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Tra cứu ngay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Các địa chỉ bệnh viện liên kết gần nơi bạn ở?
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Mạng lưới liên kết BV Thống Nhất, BV ĐK Tâm Trí Đồng Tháp, hệ thống bệnh viện phụ sản lớn và điều phối kit toàn quốc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
