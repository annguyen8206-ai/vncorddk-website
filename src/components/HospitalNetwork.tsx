import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Search, CheckCircle2, AlertCircle, ArrowRight, Stethoscope, Sparkles } from 'lucide-react';
import { loadHospitals, loadSettings } from '../store/adminStore';
import { HospitalPartner } from '../types';

interface HospitalNetworkProps {
  onSelectHospital: (hospitalName: string) => void;
}

export const HospitalNetwork: React.FC<HospitalNetworkProps> = ({ onSelectHospital }) => {
  const [hospitals, setHospitals] = useState<HospitalPartner[]>(loadHospitals());
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    const handleHospUpdate = () => setHospitals(loadHospitals());
    window.addEventListener('vncord_hospitals_updated', handleHospUpdate);
    return () => window.removeEventListener('vncord_hospitals_updated', handleHospUpdate);
  }, []);

  useEffect(() => {
    const handleSettingsUpdate = () => setSettings(loadSettings());
    window.addEventListener('vncord_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('vncord_settings_updated', handleSettingsUpdate);
  }, []);

  const provinces: string[] = ['all', ...Array.from(new Set(hospitals.map((h) => h.province).filter(Boolean))) as string[]];

  const filteredHospitals = hospitals.filter((h) => {
    const matchesProvince = selectedProvince === 'all' || h.province === selectedProvince;
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvince && matchesSearch;
  });

  return (
    <section id="benh-vien-lien-ket" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Khía Cạnh (C): Mạng Lưới Điểm Sinh & Bệnh Viện
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tra Cứu Bệnh Viện Liên Kết Gần Nơi Bạn Ở
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            VNCORD – DK hợp tác chặt chẽ cùng các bệnh viện đa khoa, phụ sản trọng điểm tại TP.HCM, Đồng Tháp và các tỉnh miền Nam, đảm bảo kỹ thuật viên có mặt kịp thời tại phòng sinh.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên bệnh viện, địa chỉ hoặc quận/huyện..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-800"
                id="hospital-search-input"
              />
            </div>

            {/* Province selector pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
              {provinces.map((prov) => (
                <button
                  key={prov}
                  onClick={() => setSelectedProvince(prov)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedProvince === prov
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  id={`province-filter-${prov.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {prov === 'all' ? 'Tất cả khu vực' : prov}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className={`bg-white rounded-2xl p-6 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                hosp.isKeyPartner ? 'border-teal-400/80 ring-1 ring-teal-300/40' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {hosp.province}
                  </span>
                  {hosp.isKeyPartner && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                      Đối tác trọng điểm
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {hosp.name}
                </h3>
                <div className="text-xs text-teal-700 font-semibold mt-1">
                  {hosp.type}
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{hosp.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{hosp.hotline}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-0.5">Hoạt động phối hợp:</span>
                  {hosp.collaborationDetails}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-emerald-700 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Sẵn sàng kit phòng sinh</span>
                </span>

                <button
                  onClick={() => onSelectHospital(hosp.name)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Chọn sinh tại đây</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Hospital Inter-facility Guarantee Box */}
        <div className="mt-12 bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-6 sm:p-8 border border-teal-200 text-slate-800 shadow-xs">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Thủ tục liên viện nhanh chóng</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Bệnh Viện Bạn Dự Sinh Chưa Có Trong Danh Sách Trên?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Đừng lo lắng! Quy chế y tế cho phép sản phụ tự do lựa chọn dịch vụ lưu trữ tế bào gốc. Đội ngũ chuyên viên pháp chế VNCORD-DK sẽ hỗ trợ hoàn tất thủ tục liên viện và điều phối bộ kit thu thập vô trùng tới <strong className="text-slate-900">BẤT KỲ bệnh viện phụ sản nào</strong> trên toàn quốc mà mẹ đăng ký sinh.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <button
                onClick={() => onSelectHospital('Bệnh viện ngoài danh sách')}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 text-white hover:bg-teal-700 transition-colors text-center cursor-pointer shadow-md"
                id="register-custom-hospital-btn"
              >
                Đăng Ký Điểm Sinh Của Bạn
              </button>
              <a
                href={`tel:${settings.hotlineRaw}`}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors text-center flex items-center justify-center gap-2 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Hotline Hỗ Trợ: {settings.hotlineDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
