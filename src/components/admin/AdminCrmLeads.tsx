import React, { useState, useEffect } from 'react';
import { CrmLead, LeadStatus } from '../../types';
import { loadLeads, saveLeads, addLead, updateLeadStatus, deleteLead } from '../../store/apiStore';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  Mail,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  X,
  FileText,
  Save,
  Trash2,
  Edit2,
} from 'lucide-react';

export const AdminCrmLeads: React.FC = () => {
  const [leads, setLeads] = useState<CrmLead[]>(loadLeads());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [doctorNoteDraft, setDoctorNoteDraft] = useState('');
  const [notification, setNotification] = useState('');

  // Form state for adding manual lead
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    expectedHospital: '',
    gestationalAge: '',
    interestedPackage: 'Combo Kép Toàn Diện (HSC + MSC)',
    note: '',
    doctorNotes: '',
    status: 'new' as LeadStatus,
  });

  useEffect(() => {
    const handleUpdate = () => {
      setLeads(loadLeads());
    };
    window.addEventListener('vncord_leads_updated', handleUpdate);
    return () => window.removeEventListener('vncord_leads_updated', handleUpdate);
  }, []);

  const handleOpenDetail = (lead: CrmLead) => {
    setSelectedLead(lead);
    setDoctorNoteDraft(lead.doctorNotes || '');
  };

  const handleSaveDoctorNote = () => {
    if (!selectedLead) return;
    updateLeadStatus(selectedLead.id, selectedLead.status, doctorNoteDraft);
    setSelectedLead((prev) => (prev ? { ...prev, doctorNotes: doctorNoteDraft } : null));
    setNotification('Đã cập nhật ghi chú bác sĩ tư vấn thành công!');
    setTimeout(() => setNotification(''), 2500);
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus(leadId, newStatus);
    setNotification(`Đã cập nhật trạng thái hồ sơ ${leadId}!`);
    setTimeout(() => setNotification(''), 2500);
  };

  const handleDelete = (leadId: string) => {
    if (window.confirm('Bạn có chắc muốn xóa hồ sơ đăng ký này không?')) {
      deleteLead(leadId);
      if (selectedLead?.id === leadId) setSelectedLead(null);
    }
  };

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.fullName || !newLeadForm.phone) {
      alert('Vui lòng điền họ tên và số điện thoại');
      return;
    }

    addLead({
      fullName: newLeadForm.fullName,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      expectedHospital: newLeadForm.expectedHospital,
      gestationalAge: newLeadForm.gestationalAge,
      interestedPackage: newLeadForm.interestedPackage,
      note: newLeadForm.note,
      doctorNotes: newLeadForm.doctorNotes,
      status: newLeadForm.status,
    });

    setIsAddModalOpen(false);
    setNewLeadForm({
      fullName: '',
      phone: '',
      email: '',
      expectedHospital: '',
      gestationalAge: '',
      interestedPackage: 'Combo Kép Toàn Diện (HSC + MSC)',
      note: '',
      doctorNotes: '',
      status: 'new',
    });
    setNotification('Đã thêm hồ sơ khách hàng mới vào CRM thành công!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleExportCsv = () => {
    const headers = ['Mã Lead', 'Họ Tên', 'Số Điện Thoại', 'Email', 'Bệnh Viện', 'Thai Kỳ', 'Gói Quan Tâm', 'Trạng Thái', 'Ngày Đăng Ký', 'Ghi Chú'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.expectedHospital || ''}"`,
      `"${l.gestationalAge || ''}"`,
      `"${l.interestedPackage || ''}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${(l.doctorNotes || l.note || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VNCORD_DK_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.expectedHospital && lead.expectedHospital.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Quản Lý Khách Hàng (CRM)</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {leads.length} hồ sơ
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Theo dõi yêu cầu tư vấn mẫu sinh học, điều phối kít vô trùng và tình trạng thu thập tại phòng sinh
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Xuất CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Hồ Sơ Khách</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên sản phụ, số điện thoại, bệnh viện..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-400 text-xs rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tất cả ({leads.length})
          </button>
          <button
            onClick={() => setStatusFilter('new')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'new'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Mới ({leads.filter((l) => l.status === 'new').length})
          </button>
          <button
            onClick={() => setStatusFilter('consulting')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'consulting'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Đang tư vấn ({leads.filter((l) => l.status === 'consulting').length})
          </button>
          <button
            onClick={() => setStatusFilter('contracted')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'contracted'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Đã ký HĐ ({leads.filter((l) => l.status === 'contracted').length})
          </button>
          <button
            onClick={() => setStatusFilter('collected')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'collected'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Đã thu mẫu ({leads.filter((l) => l.status === 'collected').length})
          </button>
        </div>
      </div>

      {/* CRM Main Table Card */}
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500 uppercase font-bold tracking-wider">
                <th className="py-3 px-4">Mã / Sản phụ</th>
                <th className="py-3 px-4">Liên hệ</th>
                <th className="py-3 px-4">Bệnh viện & Tuần thai</th>
                <th className="py-3 px-4">Gói dịch vụ</th>
                <th className="py-3 px-4">Trạng thái xử lý</th>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Không tìm thấy hồ sơ khách hàng nào theo bộ lọc này.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Customer */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900 text-sm">{lead.fullName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lead.id}</div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono text-slate-800 font-bold">
                        <Phone className="w-3 h-3 text-teal-600" />
                        <span>{lead.phone}</span>
                      </div>
                      {lead.email && (
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{lead.email}</div>
                      )}
                    </td>

                    {/* Hospital & Pregnancy */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{lead.expectedHospital || 'Chưa chọn'}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">{lead.gestationalAge || 'N/A'}</div>
                    </td>

                    {/* Package */}
                    <td className="py-4 px-4 max-w-xs">
                      <span className="text-slate-800 font-medium line-clamp-1">
                        {lead.interestedPackage || 'Tư vấn chung'}
                      </span>
                      {lead.note && (
                        <p className="text-[10px] text-slate-400 italic line-clamp-1">"{lead.note}"</p>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1 border cursor-pointer focus:outline-hidden ${
                          lead.status === 'new'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : lead.status === 'consulting'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : lead.status === 'contracted'
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : lead.status === 'collected'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <option value="new">Mới nhận</option>
                        <option value="consulting">Đang tư vấn</option>
                        <option value="contracted">Đã ký Hợp đồng</option>
                        <option value="collected">Đã thu nhận mẫu</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                      {lead.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(lead)}
                          className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold rounded-md transition-colors text-xs cursor-pointer"
                        >
                          Xem & Note
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                          title="Xóa lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: View Lead Detail & Doctor Notes */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-sky-50 to-teal-50 border-b border-teal-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-700" />
                <div>
                  <h3 className="font-bold text-slate-900">Chi Tiết Hồ Sơ & Nhật Ký Tư Vấn</h3>
                  <p className="text-[11px] text-teal-800 font-mono">{selectedLead.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Khách hàng:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedLead.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Điện thoại:</span>
                  <span className="font-bold text-teal-700 font-mono">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Bệnh viện dự sinh:</span>
                  <span className="text-slate-800 font-medium">{selectedLead.expectedHospital || 'Chưa rõ'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Tuần thai:</span>
                  <span className="text-slate-800 font-medium">{selectedLead.gestationalAge || 'Chưa rõ'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Gói quan tâm:</span>
                  <span className="text-slate-800 font-bold">{selectedLead.interestedPackage || 'Tư vấn chung'}</span>
                </div>
                {selectedLead.note && (
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Lời nhắn từ khách:</span>
                    <span className="text-slate-700 italic">"{selectedLead.note}"</span>
                  </div>
                )}
              </div>

              {/* Doctor / Specialist Notes Area */}
              <div>
                <label className="block font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>Nhật Ký Chăm Sóc & Ghi Chú Bác Sĩ</span>
                  <span className="text-[10px] text-slate-400 font-normal">Chỉ hiển thị nội bộ</span>
                </label>
                <textarea
                  rows={4}
                  value={doctorNoteDraft}
                  onChange={(e) => setDoctorNoteDraft(e.target.value)}
                  placeholder="Ghi chú nội dung cuộc gọi: tiền sử bệnh lý gia đình, thắc mắc về trả góp, điều phối kít vô trùng cho bệnh viện..."
                  className="w-full p-3 border border-slate-300 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleSaveDoctorNote}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Ghi Chú</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Manual Lead */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="bg-gradient-to-r from-teal-50 to-sky-50 border-b border-teal-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-slate-900">Thêm Hồ Sơ Khách Hàng Thủ Công</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualLead} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Họ tên sản phụ / Khách hàng *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.fullName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                    placeholder="Nguyễn Thị Bích"
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bệnh viện dự sinh</label>
                  <input
                    type="text"
                    value={newLeadForm.expectedHospital}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, expectedHospital: e.target.value })}
                    placeholder="Bệnh viện Từ Dũ, Hùng Vương..."
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tuần thai / Ngày dự sinh</label>
                  <input
                    type="text"
                    value={newLeadForm.gestationalAge}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, gestationalAge: e.target.value })}
                    placeholder="Tuần 34 (Dự sinh 20/04)"
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gói dịch vụ quan tâm</label>
                <select
                  value={newLeadForm.interestedPackage}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedPackage: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="Combo Kép Toàn Diện (HSC + MSC)">Combo Kép Toàn Diện (HSC + MSC)</option>
                  <option value="Tế Bào Gốc Máu Cuống Rốn (HSC)">Tế Bào Gốc Máu Cuống Rốn (HSC)</option>
                  <option value="Tế Bào Gốc Mô Cuống Rốn (MSC)">Tế Bào Gốc Mô Cuống Rốn (MSC)</option>
                  <option value="Gói Nuôi Cấy Tăng Sinh Tế Bào">Gói Nuôi Cấy Tăng Sinh Tế Bào</option>
                  <option value="Liệu Pháp Tế Bào NK">Liệu Pháp Tế Bào NK</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ghi chú bác sĩ ban đầu</label>
                <textarea
                  rows={2}
                  value={newLeadForm.doctorNotes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, doctorNotes: e.target.value })}
                  placeholder="Tiếp nhận qua hotline trực ban, bác sĩ sản khoa giới thiệu..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Lưu Hồ Sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
