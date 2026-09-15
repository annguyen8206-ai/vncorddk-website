import React from 'react';
import { X, FileCheck, Building2, User, Calendar, MapPin, Briefcase, CheckCircle2, Shield } from 'lucide-react';
import { COMPANY_LEGAL } from '../data/mockData';

interface LegalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalInfoModal: React.FC<LegalInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-50 to-teal-50 border-b border-teal-100 text-slate-900 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Hồ Sơ Pháp Lý Doanh Nghiệp</h3>
              <p className="text-[11px] text-teal-800 font-medium">Cơ sở dữ liệu đăng ký doanh nghiệp & Ngân hàng mô</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
          {/* Status Badge */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs text-emerald-900">
              <span className="font-bold block">Tình trạng pháp lý: Đang hoạt động bình thường</span>
              Doanh nghiệp được thành lập và cấp mã số thuế hợp pháp bởi cơ quan quản lý nhà nước có thẩm quyền.
            </div>
          </div>

          {/* Legal Records List */}
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Tên pháp lý đầy đủ:
              </span>
              <span className="font-bold text-slate-900 text-sm">{COMPANY_LEGAL.companyName}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                  Mã số thuế (MST):
                </span>
                <span className="font-mono font-bold text-teal-800 text-base">{COMPANY_LEGAL.taxCode}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                  Người đại diện pháp luật:
                </span>
                <span className="font-bold text-slate-900">{COMPANY_LEGAL.legalRepresentative}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Ngày bắt đầu hoạt động:
              </span>
              <span className="font-semibold text-slate-900">{COMPANY_LEGAL.foundedDate}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Địa chỉ trụ sở chính:
              </span>
              <span className="font-semibold text-slate-900 leading-snug">{COMPANY_LEGAL.address}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Lĩnh vực kinh doanh chính:
              </span>
              <span className="font-medium text-slate-800 leading-relaxed">{COMPANY_LEGAL.mainSector}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
