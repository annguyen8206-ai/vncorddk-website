import React, { useState, useEffect } from 'react';
import { HospitalPartner } from '../../types';
import { loadHospitals, saveHospitals, resetHospitals } from '../../store/apiStore';
import {
  Building2,
  Plus,
  Search,
  MapPin,
  Phone,
  Edit2,
  Trash2,
  CheckCircle2,
  Star,
  Save,
  RotateCcw,
  Check,
  X,
  Stethoscope,
  Info,
} from 'lucide-react';

export const AdminHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<HospitalPartner[]>(loadHospitals());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProvince, setFilterProvince] = useState('all');
  const [notification, setNotification] = useState('');
  const [editingHospital, setEditingHospital] = useState<HospitalPartner | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form state for Add/Edit
  const [formData, setFormData] = useState<HospitalPartner>({
    id: '',
    name: '',
    type: 'Bệnh viện Chuyên khoa Sản Phụ khoa',
    province: 'TP. Hồ Chí Minh',
    address: '',
    specialty: 'Sản phụ khoa, Y học tái tạo',
    hotline: '',
    collaborationDetails: 'Kỹ thuật viên VNCORD-DK túc trực phòng sinh phối hợp lấy mẫu tế bào gốc cuống rốn.',
    isKeyPartner: false,
    isActiveInConsultation: true,
  });

  useEffect(() => {
    const handleUpdate = () => setHospitals(loadHospitals());
    window.addEventListener('vncord_hospitals_updated', handleUpdate);
    return () => window.removeEventListener('vncord_hospitals_updated', handleUpdate);
  }, []);

  const provinces: string[] = ['all', ...Array.from(new Set(hospitals.map((h) => h.province).filter(Boolean))) as string[]];

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvince = filterProvince === 'all' || h.province === filterProvince;
    return matchesSearch && matchesProvince;
  });

  const handleOpenAdd = () => {
    setFormData({
      id: 'bv-' + Date.now(),
      name: '',
      type: 'Bệnh viện Chuyên khoa Sản Phụ khoa',
      province: 'TP. Hồ Chí Minh',
      address: '',
      specialty: 'Sản phụ khoa, Hỗ trợ sinh sản, Y học tái tạo',
      hotline: '028 ',
      collaborationDetails: 'Kỹ thuật viên VNCORD-DK túc trực phòng sinh tiếp nhận và bàn giao mẫu vô trùng 24/7.',
      isKeyPartner: false,
      isActiveInConsultation: true,
    });
    setIsAddingNew(true);
    setEditingHospital(null);
  };

  const handleOpenEdit = (hosp: HospitalPartner) => {
    setFormData({ ...hosp });
    setEditingHospital(hosp);
    setIsAddingNew(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    let updated: HospitalPartner[];
    if (isAddingNew) {
      updated = [formData, ...hospitals];
      setNotification(`Đã thêm thành công bệnh viện "${formData.name}"!`);
    } else {
      updated = hospitals.map((h) => (h.id === formData.id ? formData : h));
      setNotification(`Đã cập nhật bệnh viện "${formData.name}"!`);
    }

    setHospitals(updated);
    saveHospitals(updated);
    setIsAddingNew(false);
    setEditingHospital(null);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa bệnh viện "${name}" khỏi danh sách?`)) {
      const updated = hospitals.filter((h) => h.id !== id);
      setHospitals(updated);
      saveHospitals(updated);
      setNotification(`Đã xóa bệnh viện "${name}"`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleToggleConsultation = (id: string) => {
    const updated = hospitals.map((h) => {
      if (h.id === id) {
        return { ...h, isActiveInConsultation: !h.isActiveInConsultation };
      }
      return h;
    });
    setHospitals(updated);
    saveHospitals(updated);
  };

  const handleToggleKeyPartner = (id: string) => {
    const updated = hospitals.map((h) => {
      if (h.id === id) {
        return { ...h, isKeyPartner: !h.isKeyPartner };
      }
      return h;
    });
    setHospitals(updated);
    saveHospitals(updated);
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục danh sách bệnh viện về mặc định ban đầu?')) {
      const def = resetHospitals();
      setHospitals(def);
      setNotification('Đã khôi phục danh sách bệnh viện về mặc định!');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const countActiveConsultation = hospitals.filter((h) => h.isActiveInConsultation !== false).length;
  const countKeyPartners = hospitals.filter((h) => h.isKeyPartner).length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Quản Lý Mạng Lưới Bệnh Viện & Phòng Sinh</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium">
              Đồng bộ Form Tư Vấn
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cấu hình danh sách bệnh viện dự kiến sinh con xuất hiện trong dropdown đăng ký tư vấn và trang mạng lưới đối tác
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Khôi phục danh sách mẫu ban đầu"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Mặc định</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
            id="admin-add-hospital-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Bệnh Viện Mới</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111620] border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400 font-medium">Tổng bệnh viện</div>
          <div className="text-xl font-bold text-white mt-1">{hospitals.length}</div>
        </div>
        <div className="bg-[#111620] border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-teal-400 font-medium">Hiện trên Form Tư Vấn</div>
          <div className="text-xl font-bold text-teal-300 mt-1">{countActiveConsultation} BV</div>
        </div>
        <div className="bg-[#111620] border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-amber-400 font-medium">Đối tác trọng điểm</div>
          <div className="text-xl font-bold text-amber-300 mt-1">{countKeyPartners} BV</div>
        </div>
        <div className="bg-[#111620] border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-sky-400 font-medium">Tỉnh / Thành phố</div>
          <div className="text-xl font-bold text-sky-300 mt-1">{provinces.length - 1} khu vực</div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-[#111620] border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative grow">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên bệnh viện, địa chỉ hoặc chuyên khoa..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 shrink-0">
          {provinces.map((prov) => (
            <button
              key={prov}
              onClick={() => setFilterProvince(prov)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filterProvince === prov
                  ? 'bg-teal-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {prov === 'all' ? 'Tất cả' : prov}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((hosp) => {
          const inConsultation = hosp.isActiveInConsultation !== false;
          return (
            <div
              key={hosp.id}
              className={`bg-white rounded-xl p-5 border text-slate-800 shadow-sm transition-all flex flex-col justify-between ${
                hosp.isKeyPartner ? 'border-teal-400 ring-1 ring-teal-300/40' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {hosp.province}
                      </span>
                      {hosp.isKeyPartner && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>Đối tác trọng điểm</span>
                        </span>
                      )}
                      {inConsultation ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                          ✓ Có trong Form tư vấn
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                          Ẩn trên Form
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">{hosp.name}</h3>
                    <p className="text-[11px] text-teal-700 font-medium">{hosp.type}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-[11px]">{hosp.address}</span>
                  </div>
                  {hosp.hotline && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[11px] font-mono font-semibold text-slate-700">{hosp.hotline}</span>
                    </div>
                  )}
                  {hosp.specialty && (
                    <div className="flex items-start gap-2">
                      <Stethoscope className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-slate-600">{hosp.specialty}</span>
                    </div>
                  )}
                </div>

                {hosp.collaborationDetails && (
                  <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                    "{hosp.collaborationDetails}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inConsultation}
                      onChange={() => handleToggleConsultation(hosp.id)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>Hiện trên Form</span>
                  </label>

                  <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!hosp.isKeyPartner}
                      onChange={() => handleToggleKeyPartner(hosp.id)}
                      className="rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span>Trọng điểm</span>
                  </label>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(hosp)}
                    className="p-1.5 text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                    title="Chỉnh sửa thông tin bệnh viện"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(hosp.id, hosp.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Xóa bệnh viện này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="p-8 text-center bg-[#111620] rounded-xl border border-slate-800 text-slate-400 text-xs">
          Không tìm thấy bệnh viện nào phù hợp với bộ lọc tìm kiếm.
        </div>
      )}

      {/* Add / Edit Hospital Modal */}
      {(isAddingNew || editingHospital) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden text-slate-900 animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {isAddingNew ? 'Thêm Bệnh Viện Đối Tác / Điểm Sinh Mới' : 'Cập Nhật Thông Tin Bệnh Viện'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingHospital(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Tên Bệnh Viện / Điểm Sinh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Bệnh Viện Phụ Sản Từ Dũ (TP.HCM)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tỉnh / Thành phố</label>
                  <input
                    type="text"
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    placeholder="TP. Hồ Chí Minh, Đồng Tháp, Cần Thơ..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phân loại / Tuyến</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Bệnh viện Chuyên khoa Sản Hạng I, Bệnh viện Quốc tế..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Địa chỉ chi tiết</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Đường dây nóng (Hotline)</label>
                  <input
                    type="text"
                    value={formData.hotline}
                    onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                    placeholder="028 38xx xxxx"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chuyên khoa thế mạnh</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    placeholder="Sản phụ khoa, Y học tái tạo, Nhi sơ sinh..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quy trình điều phối & Hợp tác</label>
                <textarea
                  rows={3}
                  value={formData.collaborationDetails}
                  onChange={(e) => setFormData({ ...formData, collaborationDetails: e.target.value })}
                  placeholder="Chi tiết phối hợp thu thập kit tại phòng sinh, tổ chức tập huấn, liên viện..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActiveInConsultation !== false}
                    onChange={(e) => setFormData({ ...formData, isActiveInConsultation: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>Hiển thị trong danh sách chọn Bệnh Viện của Form Đăng Ký Tư Vấn</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!formData.isKeyPartner}
                    onChange={(e) => setFormData({ ...formData, isKeyPartner: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                  <span>Đánh dấu là Đối tác trọng điểm (Hiển thị nổi bật trên website)</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingHospital(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isAddingNew ? 'Thêm Vào Hệ Thống' : 'Lưu Thay Đổi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
