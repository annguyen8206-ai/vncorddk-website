import React from 'react';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Clock,
  ArrowRight,
  HeartHandshake,
  Activity,
  Award,
} from 'lucide-react';
import { STORAGE_PACKAGES } from '../data/mockData';

interface TissueServicePageProps {
  onOpenConsultation: (pkgId?: string) => void;
}

export const TissueServicePage: React.FC<TissueServicePageProps> = ({ onOpenConsultation }) => {
  const mscPackage = STORAGE_PACKAGES.find((p) => p.id === 'msc-package') || STORAGE_PACKAGES[1];

  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white text-slate-800 rounded-3xl p-8 sm:p-12 md:p-16 border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-6 border border-emerald-200 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Y Học Tái Tạo & Trị Liệu Tế Bào</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Lưu Trữ Tế Bào Gốc Từ Mô Dây Rốn (Mô Cuống Rốn – MSC)
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Màng đệm thạch Wharton (Wharton's Jelly) trong mô dây rốn chứa mật độ tế bào gốc trung mô (Mesenchymal Stem Cells – MSC) dồi dào với năng lực tái tạo cơ quan tổn thương và điều hòa phản ứng miễn dịch vượt bậc.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onOpenConsultation('msc-package')}
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Đăng Ký Lưu Trữ Mô Dây Rốn</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Detailed Info */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl p-4.5 sm:p-6 lg:p-8 shadow-xs border border-slate-200">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2.5 sm:gap-3">
                <span className="w-2 sm:w-2.5 h-6 sm:h-8 bg-emerald-600 rounded-full"></span>
                Đặc Điểm Vượt Trội Của Tế Bào Gốc Trung Mô (MSC)
              </h2>
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
                <p>
                  Tế bào gốc trung mô (Mesenchymal Stem Cells – MSC) là các tế bào đa tiềm năng có khả năng biệt hóa thành các tế bào mô liên kết như tế bào xương, sụn, cơ, gân, dây chằng và mô mỡ.
                </p>
                <p>
                  Điểm đột phá lớn nhất của MSC là tính <strong>điều hòa miễn dịch (Immunomodulation)</strong> và <strong>không gây phản ứng đào thải</strong> do không biểu hiện kháng nguyên bạch cầu lớp II (HLA-DR). Điều này cho phép ứng dụng điều trị dị ghép (allogeneic) an toàn cho người thân trong gia đình như bố mẹ, ông bà.
                </p>
              </div>

              <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <h3 className="font-bold text-emerald-900 text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-600 shrink-0" />
                    Phục Hồi Tổn Thương & Kháng Viêm
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Điều trị thoái hóa khớp gối, tổn thương cột sống, bệnh phổi tắc nghẽn mạn tính (COPD), xơ gan và phục hồi các mô bị hoại tử do thiếu máu cục bộ.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-teal-50/70 border border-teal-100">
                  <h3 className="font-bold text-teal-900 text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-teal-600 shrink-0" />
                    Ứng Dụng Rộng Rãi Cho Cả Gia Đình
                  </h3>
                  <p className="text-xs text-teal-800 leading-relaxed">
                    Không đòi hỏi phù hợp phức tạp về kháng nguyên HLA, MSC của em bé có thể dùng để hỗ trợ sức khỏe cho bố mẹ và ông bà khi về già.
                  </p>
                </div>
              </div>
            </div>

            {/* Quy trình bảo quản mô cuống rốn */}
            <div className="bg-white rounded-2xl p-4.5 sm:p-6 lg:p-8 shadow-xs border border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-600" />
                Công Nghệ Tách Chiết & Bảo Quản Mô Chuẩn Ngân Hàng
              </h2>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-700">
                <p>
                  Sau khi thu thập đoạn mô dây rốn dài 15 – 20cm từ phòng sinh, mẫu được rửa trôi hồng cầu dư thừa và chuyển về phòng sạch chuẩn ISO Class 5 của VNCORD-DK.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-center">
                  <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase mb-1">Xử lý cơ học & enzym</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">Tách lớp thạch Wharton tinh khiết</div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase mb-1">Kiểm định tế bào học</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">Đánh giá dấu ấn CD73, CD90, CD105</div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase mb-1">Bảo quản lạnh sâu</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">-196°C trong môi trường DMSO chuyên dụng</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Package Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-3">Gói Chi Phí Lưu Trữ MSC</h3>
              <p className="text-xs text-slate-600 mb-4">Chi phí bảo quản mô cuống rốn theo các mốc thời gian</p>

              <div className="space-y-3">
                {mscPackage.durations.map((d) => (
                  <div key={d.years} className="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">{d.label}</div>
                      <div className="text-[11px] text-slate-500">
                        {d.annualVnd ? `${(d.annualVnd / 1000000).toFixed(1)} triệu/năm` : 'Bảo quản toàn diện'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-emerald-700 font-mono">
                        {(d.totalPriceVnd / 1000000).toLocaleString('vi-VN')} triệu
                      </div>
                      {d.savingsPercent && (
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                          Tiết kiệm {d.savingsPercent}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenConsultation('msc-package')}
                className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Nhận Tư Vấn Gói MSC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-slate-800 shadow-2xs">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-1.5 text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Khuyên Dùng: Combo Kép
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Hơn 85% gia đình tại VNCORD-DK lựa chọn gói kết hợp cả Máu cuống rốn (HSC) và Mô dây rốn (MSC) để tối ưu hóa khả năng điều trị toàn diện cả hệ máu và cơ quan nội tạng.
              </p>
              <button
                onClick={() => onOpenConsultation('combo-package')}
                className="text-xs font-bold text-teal-700 hover:text-teal-900 underline cursor-pointer"
              >
                Xem chi tiết gói Combo Kép →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
