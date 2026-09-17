import React from 'react';
import { Building2 } from 'lucide-react';

interface EcosystemMember {
  name: string;
  logo?: string;
}

const ECOSYSTEM_MEMBERS: EcosystemMember[] = [
  { name: 'DK Group', logo: '/ecosystem/dk-group.png' },
  { name: 'DK Clinic', logo: '/ecosystem/dk-clinic.png' },
  { name: 'DK Pharma', logo: '/ecosystem/dk-pharma.png' },
  { name: 'DK Biotek', logo: '/ecosystem/dk-biotek.png' },
  { name: 'DK Hospital', logo: '/ecosystem/dk-hospital.png' },
  { name: '-gen®', logo: '/ecosystem/dk-gen.png' },
  { name: 'Angel Kids Kindergarten', logo: '/ecosystem/angel-kids.png' },
];

export const EcosystemSection: React.FC = () => {
  return (
    <section id="he-sinh-thai-dk-group" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <Building2 className="w-3.5 h-3.5" />
            DK Group Ecosystem
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            VNCORD-DK — Thành Viên Trong Hệ Sinh Thái DK Group
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Một hệ sinh thái – Kết nối chuyên môn – Kiến tạo giá trị cho sự sống.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {ECOSYSTEM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center justify-center gap-2.5 bg-white rounded-xl border border-slate-200 p-3 sm:p-4 w-[calc(50%-0.5rem)] sm:w-[calc(25%-0.94rem)] min-w-0 h-36 sm:h-40 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
            >
              {member.logo ? (
                <img
                  src={member.logo}
                  alt={member.name}
                  className="max-h-28 sm:max-h-32 max-w-[92%] object-contain"
                  draggable={false}
                />
              ) : (
                <span className="text-xs sm:text-sm font-bold text-slate-500 text-center">{member.name}</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 max-w-2xl mx-auto leading-relaxed">
          VNCORD-DK là một thành viên trong hệ sinh thái DK Group. Thông tin quan hệ pháp lý cụ thể giữa các đơn vị được công bố theo hồ sơ doanh nghiệp hiện hành.
        </p>
      </div>
    </section>
  );
};
