import React from 'react';
import {
  FlaskConical,
  Microscope,
  Snowflake,
  Radar,
  DatabaseBackup,
  FileSearch2,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
} from 'lucide-react';

interface TechnologyPageProps {
  onOpenConsultation: () => void;
}

const CAPABILITIES = [
  {
    icon: FlaskConical,
    color: 'teal',
    title: 'Xử Lý & Phân Lập Mẫu',
    description:
      'Mẫu máu và mô cuống rốn được xử lý trong phòng sạch, tiến hành ly tâm và phân lập tế bào gốc (HSC/MSC) theo quy trình thao tác chuẩn, hạn chế tối đa thời gian tiếp xúc môi trường ngoài nhằm bảo toàn hoạt lực tế bào.',
  },
  {
    icon: Microscope,
    color: 'sky',
    title: 'Kiểm Soát Chất Lượng',
    description:
      'Trước khi cấp đông, mẫu được đo chỉ số tế bào có nhân (TNC), đếm tế bào CD34+ bằng máy đếm tế bào dòng chảy (Flow Cytometry) và xét nghiệm tầm soát vô trùng vi sinh, đảm bảo tỷ lệ sống trên 90%.',
  },
  {
    icon: Snowflake,
    color: 'indigo',
    title: 'Bảo Quản Đông Sâu',
    description:
      'Mẫu được hạ nhiệt theo chương trình tự động (Controlled-Rate Freezing) trước khi lưu trữ trong bình Nitơ lỏng ở -196°C, có bồn cấp bù nitơ tự động để duy trì nhiệt độ liên tục, không gián đoạn.',
  },
  {
    icon: Radar,
    color: 'emerald',
    title: 'Giám Sát & Cảnh Báo',
    description:
      'Cảm biến nhiệt độ IoT theo dõi tình trạng bồn lưu trữ theo thời gian thực, tự động gửi cảnh báo đến đội ngũ kỹ thuật khi phát hiện bất thường, kết hợp giám sát an ninh cơ sở 24/7.',
  },
  {
    icon: DatabaseBackup,
    color: 'amber',
    title: 'Dự Phòng & Sao Lưu',
    description:
      'Hệ thống bồn lưu trữ được thiết kế dự phòng và hồ sơ mẫu được sao lưu điện tử song song với hồ sơ giấy, giảm thiểu rủi ro gián đoạn vận hành hoặc thất lạc dữ liệu.',
  },
  {
    icon: FileSearch2,
    color: 'rose',
    title: 'Truy Xuất Mẫu & Quản Lý Hồ Sơ',
    description:
      'Mỗi mẫu được gắn mã vạch định danh 2 lớp gắn với hồ sơ gia đình, cấp Chứng thư Lưu trữ Sinh học chính thức. Quyền truy xuất và sử dụng mẫu được kích hoạt khi có chỉ định y khoa phù hợp.',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
};

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="bg-gradient-to-br from-teal-50 via-sky-50/60 to-white rounded-3xl p-8 sm:p-12 md:p-14 border border-teal-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-6 border border-teal-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Công Nghệ & Tiêu Chuẩn Vận Hành</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-6">
              Nền Tảng Công Nghệ Ngân Hàng Mô VNCORD-DK
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Từ khâu xử lý mẫu đến lưu trữ dài hạn, VNCORD-DK vận hành theo quy trình kỹ thuật khép kín, kiểm soát chất lượng ở từng bước và duy trì hệ thống giám sát liên tục 24/7 để bảo vệ mẫu tế bào của gia đình bạn.
            </p>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white text-sm font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              id="technology-hero-consult-btn"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Đăng Ký Tư Vấn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Năng Lực Vận Hành Thực Tế</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Các năng lực dưới đây phản ánh hệ thống vận hành hiện tại của VNCORD-DK, được công bố dựa trên hồ sơ kỹ thuật và quy trình nội bộ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            const colors = colorMap[cap.color];
            return (
              <div
                key={cap.title}
                className={`bg-white p-6 rounded-2xl border ${colors.border} shadow-xs flex flex-col`}
              >
                <div className={`w-11 h-11 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}>
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{cap.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed grow">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            VNCORD-DK công bố các năng lực kỹ thuật đang vận hành thực tế tại hệ thống. Các chứng nhận, tiêu chuẩn chuyên môn quốc tế (nếu có) được công bố kèm hồ sơ xác nhận và phạm vi áp dụng cụ thể tại mục{' '}
            <span className="font-semibold text-slate-600">Pháp lý</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
