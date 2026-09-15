import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  Activity,
  HeartPulse,
  Flame,
  Zap,
} from 'lucide-react';

interface NkCellsServicePageProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const NkCellsServicePage: React.FC<NkCellsServicePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-rose-50 via-sky-50/60 to-white text-slate-800 rounded-3xl p-8 sm:p-12 md:p-16 border border-rose-100 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-6 border border-rose-200 shadow-2xs">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
              <span>Liệu Pháp Miễn Dịch Tự Thân</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
              Điều Hòa Hệ Miễn Dịch – Tế Bào Diệt Tự Nhiên (NK Cells)
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Tế bào NK (Natural Killer cells) được ví như đội đặc nhiệm tuyến đầu của hệ miễn dịch bẩm sinh, có khả năng nhận diện và tiêu diệt trực tiếp các tế bào đột biến ung thư và tế bào nhiễm virus nguy hiểm.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onOpenConsultation('Liệu pháp tế bào NK')}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-sky-600 hover:from-rose-700 hover:to-sky-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Đăng Ký Tư Vấn Liệu Pháp NK</span>
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
                <span className="w-2 sm:w-2.5 h-6 sm:h-8 bg-rose-600 rounded-full"></span>
                Cơ Chế Hoạt Động Của Tế Bào NK (Natural Killer)
              </h2>
              <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
                <p>
                  Khác với tế bào T cần quá trình nhận diện kháng nguyên phức tạp, tế bào NK có khả năng phát hiện các tế bào suy giảm biểu hiện MHC lớp I (đặc điểm thường thấy ở các tế bào khối u hoặc tế bào bị virus xâm chiếm) và phóng thích ngay các hạt độc tế bào như <strong>Perforin</strong> và <strong>Granzyme</strong> để phá hủy màng tế bào lạ chỉ trong tích tắc.
                </p>
                <p>
                  Theo thời gian, do áp lực công việc, lão hóa, dinh dưỡng hoặc sau các đợt hóa trị/xạ trị, số lượng và độc lực của tế bào NK trong máu ngoại vi có xu hướng sụt giảm nghiêm trọng, tạo điều kiện cho tế bào ung thư lẩn trốn hệ miễn dịch.
                </p>
              </div>

              <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50/70 border border-rose-100">
                  <h3 className="font-bold text-rose-900 text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-rose-600 shrink-0" />
                    Hoạt Hóa Độc Lực Tự Nhiên
                  </h3>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    Tách chiết tế bào bạch cầu đơn nhân từ máu ngoại vi của chính người bệnh, nuôi cấy và kích hoạt để nhân số lượng tế bào NK lên gấp hàng trăm lần.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-sky-50/70 border border-sky-100">
                  <h3 className="font-bold text-sky-900 text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                    Không Gây Đào Thải (Tự Thân)
                  </h3>
                  <p className="text-xs text-sky-800 leading-relaxed">
                    Do sử dụng nguồn tế bào của chính cơ thể người tiếp nhận, liệu pháp có độ an toàn sinh học cao, hạn chế tối đa sốc phản vệ hay biến chứng đào thải.
                  </p>
                </div>
              </div>
            </div>

            {/* Quy trình thực hiện liệu trình NK */}
            <div className="bg-white rounded-2xl p-4.5 sm:p-6 lg:p-8 shadow-xs border border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Activity className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-rose-600" />
                Quy Trình 4 Bước Liệu Pháp Tế Bào NK
              </h2>
              <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-slate-900">Khám sàng lọc & lấy máu:</strong> Bác sĩ chuyên khoa miễn dịch thăm khám, xét nghiệm chỉ số máu và thu thập khoảng 50 – 60ml máu ngoại vi.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-slate-900">Phân lập & Kích hoạt trong phòng sạch:</strong> Đưa mẫu vào phòng thí nghiệm VNCORD-DK, bổ sung các cytokine chuyên biệt (như IL-2, IL-15) để kích hoạt thụ thể diệt tự nhiên.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-slate-900">Nuôi cấy nhân số lượng (14 – 21 ngày):</strong> Số lượng tế bào NK tăng trưởng vượt bậc với độ tinh khiết và hoạt tính diệt tế bào u &gt; 80%.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0 mt-0.5">4</span>
                  <div>
                    <strong className="text-slate-900">Truyền trả tự thân dưới giám sát y khoa:</strong> Truyền lại cho người nhận tại bệnh viện theo dõi sát các thông số sinh tồn.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-3">Đối Tượng Phù Hợp</h3>
              <p className="text-xs text-slate-600 mb-4">Ứng dụng phòng ngừa và hỗ trợ y khoa</p>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block">Hỗ trợ bệnh nhân ung bướu</span>
                  Kết hợp sau phẫu thuật, hóa/xạ trị nhằm dọn sạch tế bào vi di căn và kích hoạt lại miễn dịch.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block">Người có nguy cơ ung thư cao</span>
                  Tiền sử gia đình có người mắc ung thư, sống trong môi trường độc hại hoặc suy nhược kéo dài.
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-900 block">Tăng cường sức đề kháng người lớn tuổi</span>
                  Tái tạo lá chắn sinh học, chống lại các đợt nhiễm trùng virus mạn tính.
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation('Liệu pháp tế bào NK')}
                className="w-full mt-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Tư Vấn Miễn Dịch Chuyên Sâu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-sky-50 border border-rose-200 text-slate-800 shadow-2xs">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-1.5 text-rose-900">
                <Flame className="w-4 h-4 text-rose-600" />
                Kiểm Soát Chất Lượng Tuyệt Đối
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mỗi mẫu sinh phẩm NK trước khi xuất xưởng đều được kiểm định hoạt tính tiêu diệt khối u (Cytotoxicity assay) và độ vô trùng tuyệt đối theo tiêu chuẩn ngân hàng mô.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
