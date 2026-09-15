import React, { useState, useEffect } from 'react';
import { Check, Dna, Clock, Shield, Sparkles, ArrowRight, Calculator, HelpCircle, AlertCircle, FileText } from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';
import { StoragePackage } from '../types';
import { loadPackages } from '../store/adminStore';

interface ProcessAndPricingProps {
  onOpenConsultation: (packageId?: string) => void;
}

export const ProcessAndPricing: React.FC<ProcessAndPricingProps> = ({ onOpenConsultation }) => {
  const [packages, setPackages] = useState<StoragePackage[]>(loadPackages());
  const [selectedPackageId, setSelectedPackageId] = useState<string>('combo-package');
  const [selectedDurationYears, setSelectedDurationYears] = useState<number>(25);

  useEffect(() => {
    const handleUpdate = () => setPackages(loadPackages());
    window.addEventListener('vncord_packages_updated', handleUpdate);
    return () => window.removeEventListener('vncord_packages_updated', handleUpdate);
  }, []);

  const currentPackage = packages.find(p => p.id === selectedPackageId) || packages[0];
  const currentDuration = 
    currentPackage?.durations.find(d => d.years === selectedDurationYears) || 
    currentPackage?.durations[currentPackage.durations.length - 1] || 
    { years: 1, label: 'Gói tiêu chuẩn', totalPriceVnd: 0 };

  // Calculate monthly installment (e.g. 12 months)
  const monthlyInstallment = Math.round((currentDuration?.totalPriceVnd || 0) / 12);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <section id="quy-trinh-chi-phi" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-sky-50/40 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/80 text-teal-900 border border-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
            Khía Cạnh (A): Minh Bạch Y Khoa & Chi Phí
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quy Trình Chuẩn Y Khoa & Dự Toán Chi Phí Lưu Trữ
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Quy trình 5 bước khép kín chuẩn vô trùng sinh học tại VNCORD – DK, kết hợp công cụ dự toán chi phí lưu trữ tế bào gốc cuống rốn công khai, linh hoạt với hỗ trợ trả góp 0%.
          </p>
        </div>

        {/* 1. 5-Step Medical Process */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>5 Bước Quy Trình Lưu Trữ Khép Kín</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                  Chuẩn Phòng Sạch
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                An toàn tuyệt đối cho mẹ và bé – Thực hiện tại phòng sinh của các bệnh viện liên kết
              </p>
            </div>
            <span className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
              <Shield className="w-4 h-4" />
              <span>Bảo hiểm chất lượng mẫu</span>
            </span>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {PROCESS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="relative bg-white rounded-xl p-5 border border-slate-200 hover:border-teal-400/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-extrabold text-sm flex items-center justify-center font-mono shadow-xs">
                      0{item.step}
                    </div>
                    <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      {item.timeframe}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-teal-900 bg-teal-50/50 p-2 rounded-md font-medium">
                  <span className="font-bold block text-teal-950">Điểm cốt lõi:</span>
                  {item.keyAction}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-sky-50 rounded-xl border border-sky-200 flex items-start gap-2.5 text-xs text-sky-900">
            <AlertCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <p>
              <strong>Lưu ý quan trọng cho mẹ bầu:</strong> Máu và mô cuống rốn chỉ có thể thu thập <strong>DUY NHẤT 1 LẦN trong đời</strong> ngay tại thời điểm sinh. Đăng ký sớm trước tuần 36 giúp VNCORD-DK chuẩn bị sẵn sàng bộ kit và nhân sự túc trực tại bệnh viện.
            </p>
          </div>
        </div>

        {/* 2. Interactive Cost & Package Calculator */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden" id="interactive-calculator">
          <div className="bg-gradient-to-r from-teal-50 via-sky-50 to-white text-slate-900 p-6 sm:p-8 border-b border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-800 inline-flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-teal-600" />
                  Công Cụ Dự Toán Chi Phí Minh Bạch
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-1 text-slate-900">
                  Bảng Giá & Dự Toán Gói Lưu Trữ Tế Bào Gốc
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  Lựa chọn loại tế bào gốc bạn muốn lưu giữ cho con và thời gian bảo vệ để nhận báo giá chi tiết, không phát sinh chi phí ẩn.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-teal-200 text-xs text-teal-900 shadow-2xs font-semibold">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Trả góp 0% qua 24 ngân hàng</span>
              </div>
            </div>

            {/* Package Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3 mt-4 sm:mt-6">
              {packages
                .filter((p) => p.isActive !== false)
                .map((pkg) => {
                  const isSelected = pkg.id === selectedPackageId;
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPackageId(pkg.id);
                        if (pkg.durations && pkg.durations.length > 0) {
                          setSelectedDurationYears(pkg.durations[pkg.durations.length - 1].years);
                        }
                      }}
                      className={`relative p-3 sm:p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between min-h-[76px] sm:min-h-[88px] active:scale-[0.99] ${
                        isSelected
                          ? 'bg-white text-slate-900 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                          : 'bg-white/80 text-slate-700 border-slate-200 hover:bg-white hover:border-teal-200 shadow-2xs'
                      }`}
                      id={`package-tab-${pkg.id}`}
                    >
                      {pkg.badge && (
                        <span className="absolute -top-2.5 right-2 sm:right-3 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 shadow-xs">
                          {pkg.badge}
                        </span>
                      )}
                      <div>
                        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5 sm:mb-1 text-teal-700">
                          {pkg.targetCellType?.split('(')[1]?.replace(')', '') || pkg.category || 'Tế Bào Gốc'}
                        </div>
                        <div className="font-bold text-xs sm:text-sm leading-snug text-slate-900 line-clamp-2">
                          {pkg.title.replace('Lưu Trữ Tế Bào Gốc ', '').replace('Gói ', '')}
                        </div>
                      </div>
                      <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-slate-500 line-clamp-1 font-medium">
                        {pkg.durations && pkg.durations.length > 0
                          ? `Từ ${formatCurrency(pkg.durations[0].totalPriceVnd)}`
                          : ''}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Calculator Body */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Package Details & Benefits */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div>
                  <div className="inline-block text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 mb-1.5 sm:mb-2">
                    {currentPackage.targetCellType}
                  </div>
                  <h4 className="text-base sm:text-xl font-extrabold text-slate-900">
                    {currentPackage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
                    {currentPackage.shortDesc}
                  </p>
                </div>

                {/* Medical Indication */}
                <div className="bg-sky-50/70 rounded-xl p-3.5 sm:p-4 border border-sky-200">
                  <h5 className="text-[11px] sm:text-xs font-bold text-sky-950 uppercase tracking-wider mb-1">
                    Chỉ định y khoa & Khả năng điều trị:
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentPackage.suitableFor}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-2 sm:space-y-2.5">
                  <h5 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Đặc quyền & Cam kết dịch vụ:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {currentPackage.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Picker */}
                <div>
                  <label className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2 sm:mb-2.5">
                    Chọn thời hạn lưu trữ mong muốn:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2">
                    {currentPackage.durations.map((dur) => {
                      const isDurationActive = dur.years === selectedDurationYears;
                      return (
                        <button
                          key={dur.years}
                          onClick={() => setSelectedDurationYears(dur.years)}
                          className={`p-2 sm:p-2.5 min-h-[42px] sm:min-h-[46px] rounded-xl text-center text-xs font-bold transition-all cursor-pointer border active:scale-[0.98] ${
                            isDurationActive
                              ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                          id={`duration-btn-${dur.years}`}
                        >
                          <div>{dur.years} Năm</div>
                          {dur.savingsPercent && (
                            <div className={`text-[9px] sm:text-[10px] font-normal ${isDurationActive ? 'text-teal-200' : 'text-emerald-600'}`}>
                              Tiết kiệm {dur.savingsPercent}%
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Estimated Price Summary Card */}
              <div className="lg:col-span-5">
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm relative">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Dự toán trọn gói {currentDuration.years} năm
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-teal-800 font-mono">
                      {formatCurrency(currentDuration.totalPriceVnd)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    Đã bao gồm: Bộ kit vô trùng + Phí thu thập tại bệnh viện + Vận chuyển nhiệt độ chuẩn + Phân lập lab + Bảo quản nitơ lỏng.
                  </p>

                  {/* Installment simulation */}
                  <div className="mt-5 p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Hỗ trợ trả góp 0% (12 tháng):</span>
                      <span className="font-bold text-slate-900 font-mono">
                        ~{formatCurrency(monthlyInstallment)} / tháng
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Chi phí bình quân:</span>
                      <span className="font-bold text-emerald-700 font-mono">
                        ~{formatCurrency(Math.round(currentDuration.totalPriceVnd / currentDuration.years / 365))} / ngày
                      </span>
                    </div>
                  </div>

                  {/* Action CTA buttons */}
                  <div className="mt-6 space-y-2.5">
                    <button
                      onClick={() => onOpenConsultation(currentPackage.id)}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-teal-700 hover:bg-teal-800 shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      id="pricing-cta-book-package-btn"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Nhận Tư Vấn & Giữ Ưu Đãi Gói Này</span>
                    </button>

                    <button
                      onClick={() => onOpenConsultation(currentPackage.id)}
                      className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-200/70 border border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      id="pricing-cta-quote-zalo-btn"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>Nhận file dự toán & hợp đồng mẫu qua Zalo</span>
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 text-center">
                    Cam kết không phát sinh thêm chi phí trong suốt thời hạn hợp đồng.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
