import React from 'react';
import {
  Dna,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Clock,
  Sparkles,
  ArrowRight,
  FileCheck,
  HeartPulse,
} from 'lucide-react';
import { STORAGE_PACKAGES } from '../data/mockData';

interface CordBloodServicePageProps {
  onOpenConsultation: (pkgId?: string) => void;
}

export const CordBloodServicePage: React.FC<CordBloodServicePageProps> = ({ onOpenConsultation }) => {
  const hscPackage = STORAGE_PACKAGES.find((p) => p.id === 'hsc-package') || STORAGE_PACKAGES[0];

  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-sky-50 via-teal-50/60 to-white text-slate-800 rounded-3xl p-8 sm:p-12 md:p-16 border border-sky-100 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold mb-6 border border-sky-200 shadow-2xs">
              <Dna className="w-3.5 h-3.5 text-sky-700" />
              <span>Dịch Vụ Y Sinh Chuyên Sâu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Lưu Trữ Tế Bào Gốc Dây Rốn (Máu Cuống Rốn – HSC)
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Máu cuống rốn là nguồn chứa tế bào gốc tạo máu (Hematopoietic Stem Cells – HSC) dồi dào, đóng vai trò "hạt giống vàng" trong tái tạo toàn bộ hệ thống máu và tế bào miễn dịch của cơ thể con người.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onOpenConsultation('hsc-package')}
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Đăng Ký Lưu Trữ Máu Cuống Rốn</span>
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
                <span className="w-2 sm:w-2.5 h-6 sm:h-8 bg-sky-600 rounded-full"></span>
                Tế Bào Gốc Tạo Máu (HSC) Là Gì?
              </h2>
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
                <p>
                  Tế bào gốc tạo máu (HSC) là những tế bào nguyên thủy chưa biệt hóa được tìm thấy trong máu dây rốn của trẻ sơ sinh ngay sau khi chào đời. Chúng có năng lực tự nhân đôi và biệt hóa thành mọi dòng tế bào máu trong cơ thể: hồng cầu (vận chuyển oxy), bạch cầu (hệ miễn dịch chống nhiễm trùng) và tiểu cầu (đông máu cầm máu).
                </p>
                <p>
                  Khác với tủy xương người trưởng thành, tế bào gốc máu cuống rốn non trẻ hơn rất nhiều, có telomere dài hơn, ít bị đột biến do tác nhân môi trường và có tính sinh miễn dịch thấp hơn, giúp giảm nguy cơ bệnh mảnh ghép chống ký chủ (GVHD) khi ghép tế bào gốc.
                </p>
              </div>

              <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50/70 border border-sky-100">
                  <h3 className="font-bold text-sky-900 text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                    Điều Trị Hơn 80 Bệnh Lý Nguy Hiểm
                  </h3>
                  <p className="text-xs text-sky-800 leading-relaxed">
                    Ung thư máu (Leukemia), u lympho, thiếu máu bất sản tủy, tan máu bẩm sinh Thalassemia và các hội chứng suy giảm miễn dịch kết hợp trầm trọng (SCID).
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-teal-50/70 border border-teal-100">
                  <h3 className="font-bold text-teal-900 text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    Tương Thích Cho Người Thân
                  </h3>
                  <p className="text-xs text-teal-800 leading-relaxed">
                    Tương thích 100% tự thân cho chính em bé, và tỷ lệ hòa hợp HLA rất cao cho anh/chị/em ruột (25% hoàn toàn, 50% bán phần) và cha mẹ.
                  </p>
                </div>
              </div>
            </div>

            {/* Quy trình thu thập */}
            <div className="bg-white rounded-2xl p-4.5 sm:p-6 lg:p-8 shadow-xs border border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-teal-600" />
                Quy Trình Thu Thập An Toàn Tuyệt Đối
              </h2>
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5">1</span>
                  <div>
                    <span className="font-bold text-slate-900">Sau khi cắt rốn:</span> Bác sĩ sản khoa sát khuẩn đoạn dây rốn và châm kim vô trùng để dẫn lưu lượng máu còn lại trong nhau thai vào túi gom chuyên dụng có sẵn chất chống đông CPD.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5">2</span>
                  <div>
                    <span className="font-bold text-slate-900">Không can thiệp đến em bé:</span> Toàn bộ thao tác chỉ diễn ra trên phần phụ của thai đã tách rời sau sinh, hoàn toàn không gây đau đớn hay ảnh hưởng đến bất kỳ chỉ số sinh tồn nào của mẹ và bé.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5">3</span>
                  <div>
                    <span className="font-bold text-slate-900">Vận chuyển lạnh chuẩn sinh phẩm:</span> Mẫu máu được niêm phong mã định danh và chuyển bằng thiết bị kiểm soát nhiệt độ về Ngân hàng mô VNCORD-DK trong 24 giờ.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Duration Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-3">Gói Chi Phí Lưu Trữ HSC</h3>
              <p className="text-xs text-slate-600 mb-4">Lựa chọn kỳ hạn bảo quản tại hầm đông Nitơ lỏng -196°C</p>

              <div className="space-y-3">
                {hscPackage.durations.map((d) => (
                  <div key={d.years} className="p-3 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-800">{d.label}</div>
                      <div className="text-[11px] text-slate-500">
                        {d.annualVnd ? `${(d.annualVnd / 1000000).toFixed(1)} triệu/năm` : 'Lưu trữ trọn gói'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-teal-700 font-mono">
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
                onClick={() => onOpenConsultation('hsc-package')}
                className="w-full mt-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Nhận Dự Toán Trả Góp 0%</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-200 text-slate-800 shadow-2xs">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-1.5 text-sky-900">
                <FileCheck className="w-4 h-4 text-sky-600" />
                Chứng Thư Sinh Học
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mỗi mẫu lưu trữ tại VNCORD-DK đều được cấp Chứng thư phân tích sinh học ghi nhận số lượng tế bào có nhân (TNC), tế bào CD34+ và tỷ lệ sống sau xử lý.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
