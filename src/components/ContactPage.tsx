import React, { useState, useEffect } from 'react';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Calendar,
} from 'lucide-react';
import { COMPANY_LEGAL } from '../data/mockData';
import { addLead, loadSettings } from '../store/adminStore';

interface ContactPageProps {
  onOpenLegal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenLegal }) => {
  const [settings, setSettings] = useState(loadSettings());
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceInterest: 'Lưu trữ tế bào gốc máu cuống rốn (HSC)',
    expectedHospital: '',
    dueDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleUpdate = () => setSettings(loadSettings());
    window.addEventListener('vncord_settings_updated', handleUpdate);
    return () => window.removeEventListener('vncord_settings_updated', handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      expectedHospital: formData.expectedHospital,
      gestationalAge: formData.dueDate ? `Dự sinh: ${formData.dueDate}` : undefined,
      interestedPackage: formData.serviceInterest,
      note: formData.message,
      status: 'new',
    });
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[calc(100vh-200px)]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-br from-teal-50 via-sky-50/60 to-white text-slate-800 rounded-3xl p-8 sm:p-12 border border-teal-100 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-4 border border-teal-200 shadow-2xs">
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>Hỗ Trợ Trực Tuyến & Cấp Cứu Phòng Sinh 24/7</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
              Liên Hệ Ngân Hàng Mô VNCORD – DK
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Quý gia đình và đối tác y khoa có thể liên hệ trực tiếp đến trụ sở chính tại 51 - 53, Ngô Thị Bì, KDC Him Lam, Phường Tân Hưng, TPHCM hoặc thông qua đường dây nóng điều phối vô trùng phòng sinh.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details & Headquarters */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                Trụ Sở Vận Hành & Ngân Hàng Mô
              </h2>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Địa chỉ đăng ký & Phòng Lab:</div>
                    <p className="text-xs text-slate-600 mt-0.5">{settings.address || COMPANY_LEGAL.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Đường dây nóng điều phối 24/7:</div>
                    <a href={`tel:${settings.hotlineRaw}`} className="text-sm font-extrabold text-teal-700 hover:underline">
                      {settings.hotlineDisplay}
                    </a>
                    <div className="text-[11px] text-slate-500">Túc trực tiếp nhận điều phối bộ kit sinh khẩn cấp</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Hộp thư điện tử:</div>
                    <a href={`mailto:${settings.email}`} className="text-xs text-sky-700 hover:underline font-mono">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Giờ làm việc văn phòng:</div>
                    <p className="text-xs text-slate-600">{settings.workingHours}</p>
                    <p className="text-xs text-emerald-600 font-semibold">Đội ngũ kỹ thuật phòng sinh trực 24/24 kể cả ngày lễ</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Mã số thuế:</span>
                  <span className="text-xs font-bold text-slate-800 ml-1 font-mono">{COMPANY_LEGAL.taxCode}</span>
                </div>
                <button
                  onClick={onOpenLegal}
                  className="text-xs text-teal-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Xem GP hoạt động</span>
                </button>
              </div>
            </div>

            {/* Emergency Hotline Callout */}
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 text-slate-800 rounded-2xl p-6 shadow-2xs">
              <h3 className="font-bold text-base mb-2 flex items-center gap-2 text-slate-900">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Mẹ Bầu Sắp Chuyển Dạ?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Nếu mẹ có dấu hiệu sinh sớm hơn dự kiến, hãy gọi ngay đường dây nóng <strong className="text-teal-800">{settings.hotlineDisplay}</strong>. Đội ngũ chuyên viên sẽ mang bộ kit vô trùng đến bệnh viện dự sinh trong vòng 45 – 60 phút.
              </p>
              <a
                href={`tel:${settings.hotlineRaw}`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:from-teal-700 hover:to-emerald-700 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>GỌI KHẨN CẤP PHÒNG SINH 24/7</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Gửi Yêu Cầu Tư Vấn & Đặt Bộ Kit</h2>
              <p className="text-xs text-slate-500 mb-6">
                Chuyên viên y sinh của VNCORD-DK sẽ liên hệ phản hồi và gửi tài liệu chi tiết trong vòng 15 phút.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-teal-50 border border-teal-200 rounded-2xl">
                  <div className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Đăng Ký Thành Công!</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
                    Cảm ơn Quý khách. Hồ sơ yêu cầu tư vấn đã được chuyển tới Ban điều phối mẫu sinh học VNCORD-DK. Chuyên viên sẽ gọi điện thoại hỗ trợ Quý khách trong ít phút.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        serviceInterest: 'Lưu trữ tế bào gốc máu cuống rốn (HSC)',
                        expectedHospital: '',
                        dueDate: '',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Họ và tên Quý khách / Sản phụ *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ví dụ: Nguyễn Thị Mai"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Số điện thoại liên hệ *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="09xx xxx xxx"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Địa chỉ Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Dịch vụ quan tâm
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      >
                        <option value="Lưu trữ tế bào gốc máu cuống rốn (HSC)">Tế bào gốc dây rốn (HSC)</option>
                        <option value="Lưu trữ tế bào gốc từ mô dây rốn (MSC)">Tế bào gốc từ mô (MSC)</option>
                        <option value="Combo Kép (HSC + MSC toàn diện)">Combo Kép (HSC + MSC toàn diện)</option>
                        <option value="Dịch vụ Tăng sinh tế bào">Tăng sinh tế bào</option>
                        <option value="Điều hòa hệ miễn dịch (NK)">Điều hòa hệ miễn dịch (NK)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Bệnh viện dự kiến sinh (nếu có)
                      </label>
                      <input
                        type="text"
                        value={formData.expectedHospital}
                        onChange={(e) => setFormData({ ...formData, expectedHospital: e.target.value })}
                        placeholder="Ví dụ: Từ Dũ, Hùng Vương, Tâm Trí..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Ngày dự sinh / Thời gian dự kiến
                      </label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nội dung cần tư vấn thêm
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ghi chú về tiền sử gia đình hoặc câu hỏi về chi phí..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
