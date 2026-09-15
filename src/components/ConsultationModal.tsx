import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Stethoscope, Phone, Calendar, Building2, Shield, Sparkles } from 'lucide-react';
import { addLead, loadHospitals, loadPackages } from '../store/apiStore';
import { loadSettings } from '../store/adminStore';
import { HospitalPartner, StoragePackage } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPackageId?: string;
  prefilledHospital?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefilledPackageId = 'combo-package',
  prefilledHospital = '',
}) => {
  const [hospitals, setHospitals] = useState<HospitalPartner[]>(loadHospitals());
  const [packages, setPackages] = useState<StoragePackage[]>(loadPackages());
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [hospital, setHospital] = useState(prefilledHospital || 'Bệnh Viện Thống Nhất (TP.HCM)');
  const [customHospitalName, setCustomHospitalName] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(prefilledPackageId);
  const [questionArea, setQuestionArea] = useState('A'); // 'A': Chi phí & Quy trình, 'B': Uy tín, 'C': Bệnh viện liên kết
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    const handleSettingsUpdate = () => setSettings(loadSettings());
    window.addEventListener('vncord_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('vncord_settings_updated', handleSettingsUpdate);
  }, []);

  useEffect(() => {
    const handleHospUpdate = () => {
      const latest = loadHospitals();
      setHospitals(latest);
    };
    const handlePkgUpdate = () => {
      const latest = loadPackages();
      setPackages(latest);
    };
    window.addEventListener('vncord_hospitals_updated', handleHospUpdate);
    window.addEventListener('vncord_packages_updated', handlePkgUpdate);
    return () => {
      window.removeEventListener('vncord_hospitals_updated', handleHospUpdate);
      window.removeEventListener('vncord_packages_updated', handlePkgUpdate);
    };
  }, []);

  useEffect(() => {
    if (prefilledPackageId) setSelectedPackage(prefilledPackageId);
    if (prefilledHospital) setHospital(prefilledHospital);
  }, [prefilledPackageId, prefilledHospital]);

  if (!isOpen) return null;

  // Active items for dropdowns
  const activeHospitals = hospitals.filter((h) => h.isActiveInConsultation !== false);
  const activePackages = packages.filter((p) => p.isConsultationChoice !== false && p.isActive !== false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = 'VN-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomId);

    // Save lead to CRM store
    const pkgObj = packages.find((p) => p.id === selectedPackage);
    const finalHospital =
      hospital.includes('khác') && customHospitalName.trim()
        ? `Khác: ${customHospitalName.trim()}`
        : hospital;

    addLead({
      fullName: fullName || 'Khách hàng đăng ký trực tuyến',
      phone: phone || '',
      expectedHospital: finalHospital,
      gestationalAge: dueDate ? `Dự sinh: ${dueDate}` : undefined,
      interestedPackage: pkgObj ? pkgObj.title : selectedPackage,
      note: `Khu vực quan tâm: ${questionArea === 'A' ? 'Chi phí & Quy trình' : questionArea === 'B' ? 'Pháp lý & Uy tín' : 'Bệnh viện liên kết'}`,
      status: 'new',
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-50 to-sky-50 border-b border-teal-100 text-slate-900 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Đăng Ký Tư Vấn Lưu Trữ Mẫu</h3>
              <p className="text-[11px] text-teal-800 font-medium">Bác sĩ & Chuyên viên VNCORD-DK liên hệ trong 15 phút</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Tiếp Nhận Hồ Sơ Thành Công!</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Cảm ơn Quý phụ huynh <strong>{fullName}</strong>. Chuyên viên y sinh của Ngân hàng mô VNCORD – DK đã tiếp nhận thông tin và sẽ gọi điện tư vấn chi tiết giải pháp lưu trữ tế bào gốc cho bé.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Mã tiếp nhận:</span>
                <span className="font-bold text-teal-800">{ticketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Số điện thoại:</span>
                <span className="font-bold text-slate-800">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bệnh viện dự sinh:</span>
                <span className="font-bold text-slate-800 truncate max-w-[200px]">{hospital}</span>
              </div>
            </div>

            <div className="text-[11px] text-teal-800 bg-teal-50 p-2.5 rounded-lg border border-teal-200 flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Đường dây khẩn cấp phòng sinh 24/7: <strong>{settings.hotlineDisplay}</strong></span>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
            >
              Hoàn Tất & Đóng
            </button>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
            {/* Aspect Selection (A), (B), (C) */}
            <div>
              <label className="block font-bold text-slate-800 mb-1 text-xs">
                Khía cạnh bạn muốn được giải đáp kỹ nhất:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setQuestionArea('A')}
                  className={`p-2 rounded-lg text-left border text-xs cursor-pointer transition-all ${
                    questionArea === 'A'
                      ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  (A) Chi phí & Quy trình
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionArea('B')}
                  className={`p-2 rounded-lg text-left border text-xs cursor-pointer transition-all ${
                    questionArea === 'B'
                      ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  (B) Đánh giá uy tín
                </button>
                <button
                  type="button"
                  onClick={() => setQuestionArea('C')}
                  className={`p-2 rounded-lg text-left border text-xs cursor-pointer transition-all ${
                    questionArea === 'C'
                      ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  (C) Bệnh viện gần bạn
                </button>
              </div>
            </div>

            {/* Parent Name */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1 text-xs">
                Họ và tên Phụ huynh / Mẹ bầu <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Thị Mai Phương"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
            </div>

            {/* Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1 text-xs">
                  Số điện thoại / Zalo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xx xxx xxx"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1 text-xs">
                  Ngày dự sinh (EDD)
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-700"
                />
              </div>
            </div>

            {/* Hospital Selection */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1 text-xs">
                Bệnh viện dự kiến sinh con:
              </label>
              <select
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-800 text-xs font-medium"
              >
                {activeHospitals.map((h) => (
                  <option key={h.id} value={h.name}>
                    {h.name} {h.isKeyPartner ? '★ (Đối tác liên kết trọng điểm)' : `(${h.province})`}
                  </option>
                ))}
                <option value="Bệnh viện khác">Bệnh viện khác (VNCORD-DK hỗ trợ thủ tục liên viện)</option>
              </select>

              {hospital.includes('khác') && (
                <div className="mt-2 animate-in fade-in">
                  <input
                    type="text"
                    value={customHospitalName}
                    onChange={(e) => setCustomHospitalName(e.target.value)}
                    placeholder="Nhập tên bệnh viện bạn dự kiến sinh (Ví dụ: BV Phụ sản MêKông, BV An Đức...)"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-teal-400 rounded-lg text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              )}
            </div>

            {/* Package Selection */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1 text-xs">
                Gói tế bào gốc quan tâm:
              </label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-800 text-xs font-medium"
              >
                {activePackages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} {p.badge ? `[${p.badge}]` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-700 to-sky-700 hover:from-teal-800 hover:to-sky-800 shadow-md shadow-teal-700/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                id="modal-submit-consultation-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>Gửi Đăng Ký Tư Vấn Miễn Phí</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Thông tin được bảo mật chuẩn y tế. VNCORD-DK cam kết không cung cấp cho bên thứ ba.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
