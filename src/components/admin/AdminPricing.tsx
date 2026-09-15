import React, { useState, useEffect } from 'react';
import { StoragePackage } from '../../types';
import { loadPackages, savePackages, resetPackages } from '../../store/apiStore';
import {
  DollarSign,
  Save,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
  Edit2,
  Plus,
  Trash2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Check,
  X,
  Tag,
  Dna,
  ListFilter,
} from 'lucide-react';

export const AdminPricing: React.FC = () => {
  const [packages, setPackages] = useState<StoragePackage[]>(loadPackages());
  const [notification, setNotification] = useState('');
  const [activePackageId, setActivePackageId] = useState<string>(packages[0]?.id || 'combo-package');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddingNewPackage, setIsAddingNewPackage] = useState(false);

  // New package modal form
  const [newPkgForm, setNewPkgForm] = useState<StoragePackage>({
    id: '',
    title: '',
    shortDesc: '',
    targetCellType: '',
    suitableFor: '',
    category: 'combo',
    badge: 'Gói Mới',
    isConsultationChoice: true,
    isActive: true,
    benefits: [
      'Thu thập mẫu vô trùng đạt chuẩn y sinh',
      'Định danh và kiểm định hoạt lực tế bào trước lưu trữ',
      'Bảo quản trong nitơ lỏng -196°C chuẩn AABB / ISO',
    ],
    durations: [
      { years: 1, label: '1 Năm đầu', totalPriceVnd: 25000000, annualVnd: 3500000 },
      { years: 5, label: '5 Năm', totalPriceVnd: 38000000, savingsPercent: 12 },
      { years: 10, label: '10 Năm', totalPriceVnd: 55000000, savingsPercent: 20 },
      { years: 25, label: 'Trọn gói 25 Năm', totalPriceVnd: 89000000, savingsPercent: 35 },
    ],
  });

  useEffect(() => {
    const handleUpdate = () => {
      setPackages(loadPackages());
    };
    window.addEventListener('vncord_packages_updated', handleUpdate);
    return () => window.removeEventListener('vncord_packages_updated', handleUpdate);
  }, []);

  const currentPkg = packages.find((p) => p.id === activePackageId) || packages[0];

  const handlePriceChange = (yearIndex: number, newPriceVnd: number) => {
    const updated = packages.map((pkg) => {
      if (pkg.id === activePackageId) {
        const newDurations = [...pkg.durations];
        const years = newDurations[yearIndex].years;
        const annual = years > 0 ? Math.round(newPriceVnd / years) : newPriceVnd;
        newDurations[yearIndex] = {
          ...newDurations[yearIndex],
          totalPriceVnd: newPriceVnd,
          annualVnd: annual,
        };
        return {
          ...pkg,
          durations: newDurations,
        };
      }
      return pkg;
    });

    setPackages(updated);
  };

  const handleDurationLabelChange = (yearIndex: number, newLabel: string) => {
    const updated = packages.map((pkg) => {
      if (pkg.id === activePackageId) {
        const newDurations = [...pkg.durations];
        newDurations[yearIndex] = {
          ...newDurations[yearIndex],
          label: newLabel,
        };
        return { ...pkg, durations: newDurations };
      }
      return pkg;
    });
    setPackages(updated);
  };

  const handleAddDuration = () => {
    const updated = packages.map((pkg) => {
      if (pkg.id === activePackageId) {
        return {
          ...pkg,
          durations: [
            ...pkg.durations,
            { years: 18, label: '18 Năm (Trưởng thành)', totalPriceVnd: 75000000, savingsPercent: 30 },
          ],
        };
      }
      return pkg;
    });
    setPackages(updated);
  };

  const handleDeleteDuration = (idx: number) => {
    const updated = packages.map((pkg) => {
      if (pkg.id === activePackageId) {
        const newDurations = pkg.durations.filter((_, i) => i !== idx);
        return { ...pkg, durations: newDurations };
      }
      return pkg;
    });
    setPackages(updated);
  };

  const handlePackageFieldChange = (field: keyof StoragePackage, val: any) => {
    const updated = packages.map((pkg) => {
      if (pkg.id === activePackageId) {
        return { ...pkg, [field]: val };
      }
      return pkg;
    });
    setPackages(updated);
  };

  const handleBenefitChange = (index: number, val: string) => {
    const updated = packages.map((pkg) => {
      if (pkg.id === activePackageId) {
        const newBenefits = [...pkg.benefits];
        newBenefits[index] = val;
        return { ...pkg, benefits: newBenefits };
      }
      return pkg;
    });
    setPackages(updated);
  };

  const handleAddBenefit = () => {
    const updated = packages.map((pkg) => {
      if (pkg.id === activePackageId) {
        return { ...pkg, benefits: [...pkg.benefits, 'Quyền lợi y sinh bảo hiểm bổ sung...'] };
      }
      return pkg;
    });
    setPackages(updated);
  };

  const handleDeleteBenefit = (index: number) => {
    const updated = packages.map((pkg) => {
      if (pkg.id === activePackageId) {
        const newBenefits = pkg.benefits.filter((_, i) => i !== index);
        return { ...pkg, benefits: newBenefits };
      }
      return pkg;
    });
    setPackages(updated);
  };

  const handleSaveAll = () => {
    savePackages(packages);
    setNotification('Đã lưu và đồng bộ toàn bộ bảng giá & các gói quan tâm trên website!');
    setTimeout(() => setNotification(''), 3500);
  };

  const handleResetPackages = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục lại bảng giá và danh sách gói về mặc định ban đầu?')) {
      const def = resetPackages();
      setPackages(def);
      setActivePackageId(def[0]?.id || 'combo-package');
      setNotification('Đã khôi phục bảng giá mặc định thành công!');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleDeletePackage = (id: string, title: string) => {
    if (packages.length <= 1) {
      alert('Không thể xóa gói cuối cùng trong hệ thống!');
      return;
    }
    if (window.confirm(`Xác nhận xóa gói "${title}" khỏi hệ thống?`)) {
      const updated = packages.filter((p) => p.id !== id);
      setPackages(updated);
      savePackages(updated);
      setActivePackageId(updated[0].id);
      setNotification(`Đã xóa gói "${title}"`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleCreateNewPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgForm.title.trim()) return;

    const newId = newPkgForm.id.trim() || 'pkg-' + Date.now();
    const pkgToAdd: StoragePackage = {
      ...newPkgForm,
      id: newId,
    };

    const updated = [...packages, pkgToAdd];
    setPackages(updated);
    savePackages(updated);
    setActivePackageId(newId);
    setIsAddingNewPackage(false);
    setNotification(`Đã thêm gói "${pkgToAdd.title}" vào hệ thống thành công!`);
    setTimeout(() => setNotification(''), 3500);
  };

  const filteredTabs = packages.filter((pkg) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'consultation') return pkg.isConsultationChoice !== false;
    return pkg.category === filterCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Quản Lý Bảng Giá & Gói Dịch Vụ Quan Tâm</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium">
              Đồng bộ Form Tư Vấn & Bảng Giá
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cấu hình biểu phí, quyền lợi và các gói tế bào gốc (HSC, MSC, NK Cells, Tăng sinh MSC, Gói 4 tế bào...) xuất hiện trong Form Tư Vấn
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetPackages}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Khôi phục bảng giá mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Mặc định</span>
          </button>

          <button
            onClick={() => {
              setNewPkgForm({
                id: 'pkg-' + Date.now(),
                title: '',
                shortDesc: '',
                targetCellType: '',
                suitableFor: '',
                category: 'combo',
                badge: 'Gói Nổi Bật',
                isConsultationChoice: true,
                isActive: true,
                benefits: [
                  'Quy trình chiết xuất và lưu trữ đạt tiêu chuẩn kiểm nghiệm',
                  'Bảo hiểm bồi hoàn sinh học khi sử dụng mẫu',
                  'Đội ngũ kỹ thuật viên túc trực phòng sinh 24/7',
                ],
                durations: [
                  { years: 1, label: '1 Năm đầu', totalPriceVnd: 28000000 },
                  { years: 5, label: '5 Năm', totalPriceVnd: 42000000, savingsPercent: 12 },
                  { years: 10, label: '10 Năm', totalPriceVnd: 58000000, savingsPercent: 20 },
                  { years: 25, label: 'Trọn gói 25 Năm', totalPriceVnd: 95000000, savingsPercent: 35 },
                ],
              });
              setIsAddingNewPackage(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
            id="admin-add-package-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Gói Mới</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
            id="admin-save-pricing-btn"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Toàn Bộ</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Package Tabs */}
      <div className="bg-[#111620] border border-slate-800 p-3 rounded-xl space-y-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <ListFilter className="w-3.5 h-3.5" />
            <span>Lọc phân loại:</span>
          </span>
          {[
            { id: 'all', label: 'Tất cả gói' },
            { id: 'consultation', label: 'Hiện trên Form Tư Vấn' },
            { id: 'combo', label: 'Combo kép' },
            { id: 'cord_blood', label: 'Máu cuống rốn (HSC)' },
            { id: 'tissue', label: 'Tế bào mô (MSC)' },
            { id: 'immune_cells', label: 'Tế bào NK' },
            { id: 'expansion', label: 'Tăng sinh MSC' },
            { id: 'other', label: 'Gói mở rộng khác' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Package selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 border-t border-slate-800/80">
          {filteredTabs.map((pkg) => {
            const isSelected = activePackageId === pkg.id;
            const inConsultation = pkg.isConsultationChoice !== false;
            return (
              <button
                key={pkg.id}
                onClick={() => setActivePackageId(pkg.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-md border-sky-400 ring-2 ring-sky-500/30'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border-slate-800'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                <span className="truncate max-w-[180px]">{pkg.title}</span>
                {inConsultation && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-emerald-400'}`} title="Hiện trong form tư vấn" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Package Editor Card */}
      {currentPkg && (
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 border border-slate-200 text-slate-800 space-y-8 animate-in fade-in duration-150">
          {/* Package Metadata Info */}
          <div className="border-b border-slate-200 pb-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                  Mã gói: {currentPkg.id}
                </span>
                {currentPkg.badge && (
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    {currentPkg.badge}
                  </span>
                )}
                {currentPkg.isConsultationChoice !== false ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                    ✓ Có trong dropdown Form Tư Vấn
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                    Ẩn khỏi dropdown Form Tư Vấn
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeletePackage(currentPkg.id, currentPkg.title)}
                  className="px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa Gói Này</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên Gói Dịch Vụ / Gói Quan Tâm
                </label>
                <input
                  type="text"
                  value={currentPkg.title}
                  onChange={(e) => handlePackageFieldChange('title', e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Huy Hiệu Nổi Bật (Badge)
                </label>
                <input
                  type="text"
                  value={currentPkg.badge || ''}
                  onChange={(e) => handlePackageFieldChange('badge', e.target.value)}
                  placeholder="Ví dụ: Phổ biến nhất, Liệu pháp Miễn dịch..."
                  className="w-full px-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mô Tả Ngắn Gọn
              </label>
              <textarea
                rows={2}
                value={currentPkg.shortDesc}
                onChange={(e) => handlePackageFieldChange('shortDesc', e.target.value)}
                className="w-full px-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loại Tế Bào Đích
                </label>
                <input
                  type="text"
                  value={currentPkg.targetCellType}
                  onChange={(e) => handlePackageFieldChange('targetCellType', e.target.value)}
                  className="w-full px-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đối Tượng & Ứng Dụng Phù Hợp
                </label>
                <input
                  type="text"
                  value={currentPkg.suitableFor}
                  onChange={(e) => handlePackageFieldChange('suitableFor', e.target.value)}
                  className="w-full px-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Checkbox settings */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPkg.isConsultationChoice !== false}
                  onChange={(e) => handlePackageFieldChange('isConsultationChoice', e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <span>Hiển thị trong dropdown "Gói tế bào gốc quan tâm" của Form Đăng Ký Tư Vấn</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentPkg.isActive !== false}
                  onChange={(e) => handlePackageFieldChange('isActive', e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Kích hoạt công khai trên Bảng giá Website</span>
              </label>
            </div>
          </div>

          {/* Pricing Durations Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Biểu Phí Theo Mốc Thời Gian / Liệu Trình (VNĐ)</span>
              </h3>

              <button
                type="button"
                onClick={handleAddDuration}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm mốc thời gian</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentPkg.durations.map((dur, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-sky-300 transition-colors space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={dur.label}
                      onChange={(e) => handleDurationLabelChange(idx, e.target.value)}
                      className="font-bold text-slate-900 text-xs bg-transparent border-b border-transparent hover:border-slate-300 focus:border-sky-500 focus:bg-white px-1 py-0.5 rounded w-full mr-2"
                    />
                    {currentPkg.durations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteDuration(idx)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Xóa mốc này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Tổng Phí Lưu Trữ (VNĐ)
                    </label>
                    <input
                      type="number"
                      step={1000000}
                      value={dur.totalPriceVnd}
                      onChange={(e) => handlePriceChange(idx, Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-teal-700 font-mono focus:ring-2 focus:ring-sky-500"
                    />
                    <div className="text-[11px] text-slate-500 mt-1 font-semibold">
                      {dur.totalPriceVnd.toLocaleString('vi-VN')} VNĐ
                    </div>
                  </div>

                  {dur.annualVnd && (
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 flex justify-between">
                      <span>Trung bình/năm:</span>
                      <span className="font-semibold text-slate-700 font-mono">
                        {dur.annualVnd.toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  )}

                  {dur.savingsPercent && (
                    <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                      Tiết kiệm {dur.savingsPercent}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Package Benefits List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-slate-500" />
                <span>Quyền Lợi & Tiêu Chuẩn Y Khoa ({currentPkg.benefits.length})</span>
              </h3>
              <button
                type="button"
                onClick={handleAddBenefit}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm quyền lợi</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {currentPkg.benefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(bIdx, e.target.value)}
                    className="grow px-3 py-2 text-xs text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteBenefit(bIdx)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Xóa dòng"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <AlertCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>
                Nhấn <strong>"Lưu Thay Đổi Gói"</strong> để cập nhật trực tiếp vào Form tư vấn và bộ tính phí trên website.
              </span>
            </div>

            <button
              onClick={handleSaveAll}
              className="w-full sm:w-auto px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Thay Đổi Bảng Giá</span>
            </button>
          </div>
        </div>
      )}

      {/* Add New Package Modal */}
      {isAddingNewPackage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden text-slate-900 animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  Thêm Gói Lưu Trữ / Gói Dịch Vụ Quan Tâm Mới
                </h3>
              </div>
              <button
                onClick={() => setIsAddingNewPackage(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPackage} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Tên Gói Dịch Vụ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPkgForm.title}
                  onChange={(e) => setNewPkgForm({ ...newPkgForm, title: e.target.value })}
                  placeholder="Ví dụ: Gói Lưu Trữ Tế Bào Miễn Dịch Tự Nhiên (NK Cells)..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phân loại chuyên mục</label>
                  <select
                    value={newPkgForm.category || 'combo'}
                    onChange={(e) => setNewPkgForm({ ...newPkgForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold focus:bg-white focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="combo">Combo Kép (HSC + MSC)</option>
                    <option value="cord_blood">Tế bào gốc máu (HSC)</option>
                    <option value="tissue">Tế bào gốc mô (MSC)</option>
                    <option value="immune_cells">Tế bào miễn dịch (NK Cells)</option>
                    <option value="expansion">Tăng sinh tế bào (GMP Expansion)</option>
                    <option value="other">Gói chuyên biệt khác</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Huy hiệu hiển thị</label>
                  <input
                    type="text"
                    value={newPkgForm.badge || ''}
                    onChange={(e) => setNewPkgForm({ ...newPkgForm, badge: e.target.value })}
                    placeholder="Mới ra mắt, Khuyên dùng..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mô tả ngắn gọn</label>
                <textarea
                  rows={2}
                  required
                  value={newPkgForm.shortDesc}
                  onChange={(e) => setNewPkgForm({ ...newPkgForm, shortDesc: e.target.value })}
                  placeholder="Mô tả ý nghĩa và lợi ích cốt lõi của gói tế bào này..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Loại tế bào đích</label>
                  <input
                    type="text"
                    value={newPkgForm.targetCellType}
                    onChange={(e) => setNewPkgForm({ ...newPkgForm, targetCellType: e.target.value })}
                    placeholder="Tế bào NK, MSCs, HSCs..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Đối tượng phù hợp</label>
                  <input
                    type="text"
                    value={newPkgForm.suitableFor}
                    onChange={(e) => setNewPkgForm({ ...newPkgForm, suitableFor: e.target.value })}
                    placeholder="Y học tái tạo, phòng ngừa u bướu..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPkgForm.isConsultationChoice !== false}
                    onChange={(e) => setNewPkgForm({ ...newPkgForm, isConsultationChoice: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>Xuất hiện trong dropdown "Gói tế bào gốc quan tâm" của Form Đăng Ký Tư Vấn</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddingNewPackage(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tạo Gói Mới</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
