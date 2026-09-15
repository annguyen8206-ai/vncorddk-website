import React from 'react';
import {
  TrendingUp,
  Microscope,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  FlaskConical,
  Activity,
  Sparkles,
  HeartPulse,
} from 'lucide-react';

interface ExpansionServicePageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const ExpansionServicePage: React.FC<ExpansionServicePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-violet-50 via-teal-50/60 to-white text-slate-800 rounded-3xl p-8 sm:p-12 md:p-16 border border-violet-100 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-900 text-xs font-bold mb-6 border border-violet-200 shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5 text-violet-700" />
              <span>Công Nghệ Sinh Học Phân Tử</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Dịch Vụ Tăng Sinh Tế Bào (Cell Expansion)
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Nhân bội số lượng tế bào gốc trong môi trường nuôi cấy vô trùng khép kín, đáp ứng đủ liều lượng tế bào trị liệu cần thiết cho các phác đồ điều trị lâm sàng phức tạp và y học chống lão hóa.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onOpenConsultation('Dịch vụ Tăng sinh tế bào')}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-teal-600 hover:from-violet-700 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Tư Vấn Tăng Sinh Tế Bào Trị Liệu</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl p-4.5 sm:p-6 lg:p-8 shadow-xs border border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                <span className="w-2 sm:w-2.5 h-6 sm:h-8 bg-violet-600 rounded-full"></span>
                Tại Sao Cần Tăng Sinh Tế Bào?
              </h2>
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
                <p>
                  Trong điều trị y khoa lâm sàng (như ghép tế bào gốc cho người trưởng thành hoặc điều trị các bệnh mạn tính thoái hóa), số lượng tế bào cần thiết thường dao động từ <strong>1 – 2 triệu tế bào/kg thể trọng</strong> cho mỗi lần truyền.
                </p>
                <p>
                  Số lượng tế bào thu thập ban đầu từ mô có thể không đủ cho nhiều liệu trình dài hạn. Quy trình tăng sinh (Ex-vivo Expansion) tại phòng Lab của VNCORD-DK cho phép nuôi cấy nhân số lượng tế bào lên hàng chục đến hàng trăm lần mà vẫn bảo toàn nguyên vẹn cấu trúc di truyền và tiềm năng biệt hóa ban đầu.
                </p>
              </div>

              <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-violet-50/70 border border-violet-100">
                  <h3 className="font-bold text-violet-900 text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-violet-600 shrink-0" />
                    Môi Trường Chuẩn GMP
                  </h3>
                  <p className="text-xs text-violet-800 leading-relaxed">
                    Sử dụng môi trường nuôi cấy không huyết thanh động vật (Xeno-free/Serum-free) giảm thiểu tối đa nguy cơ dị ứng hay lây nhiễm chéo.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-teal-50/70 border border-teal-100">
                  <h3 className="font-bold text-teal-900 text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    Kiểm Chuẩn Di Truyền Nghiêm Ngặt
                  </h3>
                  <p className="text-xs text-teal-800 leading-relaxed">
                    Mỗi mẻ tăng sinh đều được xét nghiệm bộ nhiễm sắc thể đồ (Karyotype) để bảo đảm không xảy ra bất thường nhiễm sắc thể trong quá trình nhân đôi.
                  </p>
                </div>
              </div>
            </div>

            {/* Quy trình kiểm định chất lượng */}
            <div className="bg-white rounded-2xl p-4.5 sm:p-6 lg:p-8 shadow-xs border border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Microscope className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-violet-600" />
                Các Tiêu Chuẩn Xuất Xưởng Tế Bào Sau Tăng Sinh
              </h2>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Tỷ lệ sống sót:</strong> Đạt trên 95% bằng phương pháp nhuộm huỳnh quang tự động.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Xét nghiệm vi sinh:</strong> Hoàn toàn vô trùng, âm tính với Mycoplasma, nội độc tố vi khuẩn (Endotoxin &lt; 0.5 EU/ml) và các chủng virus lây truyền.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Xác nhận kiểu hình miễn dịch (Flow Cytometry):</strong> Kiểm tra các cụm biệt hóa (CD marker) đúng chuẩn của Hiệp hội Liệu pháp Tế bào Quốc tế (ISCT).
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-3">Ứng Dụng Lâm Sàng</h3>
              <p className="text-xs text-slate-600 mb-4">Các liệu trình yêu cầu tăng sinh số lượng lớn</p>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block">Điều trị cơ xương khớp</span>
                  Tiêm trực tiếp tế bào MSC tăng sinh vào khớp thoái hóa, đĩa đệm.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block">Phục hồi thần kinh</span>
                  Hỗ trợ cải thiện cho trẻ bại não, bệnh nhân tai biến mạch máu não.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block">Trẻ hóa & Chống lão hóa sinh học</span>
                  Tăng cường sinh lực tế bào, cải thiện sắc tố da và tuần hoàn toàn diện.
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Dịch vụ Tăng sinh tế bào')}
                className="w-full mt-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Nhận Đánh Giá Hồ Sơ Tế Bào</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-teal-50 border border-violet-200 text-slate-800 shadow-2xs">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-1.5 text-violet-900">
                <HeartPulse className="w-4 h-4 text-violet-600" />
                Hợp Tác Chuyên Gia Viện Tế Bào Gốc
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đội ngũ kỹ thuật viên phòng nuôi cấy được đào tạo bài bản và chuyển giao công nghệ trực tiếp từ Viện Tế bào gốc, đảm bảo từng giọt sinh phẩm tinh khiết nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
