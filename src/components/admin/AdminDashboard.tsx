import React, { useState, useEffect } from 'react';
import { loadLeads, loadArticles, loadPackages } from '../../store/apiStore';
import { CrmLead, AdminTab } from '../../types';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Building2,
  Calendar,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const [leads, setLeads] = useState<CrmLead[]>(loadLeads());
  const [articlesCount, setArticlesCount] = useState(loadArticles().length);
  const [packagesCount, setPackagesCount] = useState(loadPackages().length);

  useEffect(() => {
    const handleUpdate = () => {
      setLeads(loadLeads());
      setArticlesCount(loadArticles().length);
      setPackagesCount(loadPackages().length);
    };
    window.addEventListener('vncord_leads_updated', handleUpdate);
    window.addEventListener('vncord_articles_updated', handleUpdate);
    return () => {
      window.removeEventListener('vncord_leads_updated', handleUpdate);
      window.removeEventListener('vncord_articles_updated', handleUpdate);
    };
  }, []);

  const newLeads = leads.filter((l) => l.status === 'new').length;
  const consultingLeads = leads.filter((l) => l.status === 'consulting').length;
  const contractedLeads = leads.filter((l) => l.status === 'contracted').length;
  const collectedLeads = leads.filter((l) => l.status === 'collected').length;

  const totalRevenueEst = (contractedLeads + collectedLeads) * 68000000;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Tổng quan Hoạt động</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Hệ thống VNCORD-DK
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Dữ liệu tiếp nhận mẫu sinh học, đăng ký tư vấn sản phụ và nội dung truyền thông y sinh
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('news')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-teal-400" />
            <span>Viết bài SEO mới</span>
          </button>
          <button
            onClick={() => onNavigateTab('crm')}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Xem danh sách CRM</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Khách hàng cần tư vấn
            </span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{newLeads}</span>
            <span className="text-xs text-amber-600 font-medium">chưa liên hệ</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Tổng tiếp nhận: <strong className="text-slate-700">{leads.length} hồ sơ</strong>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Hợp đồng & Đã thu mẫu
            </span>
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-teal-700">{contractedLeads + collectedLeads}</span>
            <span className="text-xs text-teal-600 font-medium">ca thành công</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            {collectedLeads} mẫu đã chuyển về lưu trữ đông sâu -196°C
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Doanh số tạm tính (HĐ)
            </span>
            <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">
              {(totalRevenueEst / 1000000).toLocaleString('vi-VN')}
            </span>
            <span className="text-xs text-slate-500 font-semibold">Tr. VNĐ</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Gói trung bình 68.000.000đ / hợp đồng
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Bài viết truyền thông SEO
            </span>
            <span className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-violet-700">{articlesCount}</span>
            <span className="text-xs text-emerald-600 font-semibold">Chuẩn SEO 100%</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            {packagesCount} gói dịch vụ niêm yết
          </div>
        </div>
      </div>

      {/* Main Grid: Leads Table + Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Khách Hàng Mới Đăng Ký</h2>
              <p className="text-xs text-slate-500">Form gửi từ website công khai qua popup tư vấn và trang liên hệ</p>
            </div>
            <button
              onClick={() => onNavigateTab('crm')}
              className="text-xs text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả ({leads.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                  <th className="pb-3 pr-4">Khách hàng</th>
                  <th className="pb-3 pr-4">Bệnh viện & Thai kỳ</th>
                  <th className="pb-3 pr-4">Gói quan tâm</th>
                  <th className="pb-3 text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{lead.phone}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="text-slate-800 font-medium">{lead.expectedHospital || 'Chưa chọn'}</div>
                      <div className="text-[11px] text-slate-500">{lead.gestationalAge || 'N/A'}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-slate-700 font-medium line-clamp-1">
                        {lead.interestedPackage || 'Tư vấn chung'}
                      </span>
                      <span className="text-[10px] text-slate-400">{lead.createdAt}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      {lead.status === 'new' && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Mới nhận
                        </span>
                      )}
                      {lead.status === 'consulting' && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                          Đang tư vấn
                        </span>
                      )}
                      {lead.status === 'contracted' && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                          Đã ký HĐ
                        </span>
                      )}
                      {lead.status === 'collected' && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Đã thu mẫu
                        </span>
                      )}
                      {lead.status === 'cancelled' && (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                          Đã hủy
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Funnel & Fast Access */}
        <div className="space-y-6">
          {/* Funnel Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Quy trình Chuyển đổi Lead</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Mới nhận</span>
                  <span className="font-bold text-slate-900">{newLeads} ca</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (newLeads / (leads.length || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Đang trao đổi & gửi kít</span>
                  <span className="font-bold text-slate-900">{consultingLeads} ca</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (consultingLeads / (leads.length || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Đã ký Hợp đồng</span>
                  <span className="font-bold text-slate-900">{contractedLeads} ca</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full"
                    style={{ width: `${Math.min(100, (contractedLeads / (leads.length || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Đã nhập kho bảo quản</span>
                  <span className="font-bold text-slate-900">{collectedLeads} ca</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${Math.min(100, (collectedLeads / (leads.length || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Management Short Cuts */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Lối Tắt Quản Trị</h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('pricing')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 transition-colors flex items-center justify-between text-xs text-slate-700 font-medium cursor-pointer"
              >
                <span>Cập nhật bảng giá & ưu đãi</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigateTab('news')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 transition-colors flex items-center justify-between text-xs text-slate-700 font-medium cursor-pointer"
              >
                <span>Soạn bài viết chuẩn SEO</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => onNavigateTab('settings')}
                className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 transition-colors flex items-center justify-between text-xs text-slate-700 font-medium cursor-pointer"
              >
                <span>Cập nhật Hotline & Giờ làm việc</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
