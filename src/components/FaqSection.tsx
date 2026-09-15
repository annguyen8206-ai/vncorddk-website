import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredFaqs = filterCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === filterCategory);

  const categories = [
    { id: 'all', label: 'Tất cả câu hỏi' },
    { id: 'quy-trinh', label: 'Quy trình thu thập' },
    { id: 'ung-dung', label: 'Ứng dụng điều trị' },
    { id: 'chi-phi', label: 'Chi phí & Thanh toán' },
    { id: 'phap-ly', label: 'Pháp lý & Tiêu chuẩn' },
  ];

  return (
    <section id="cau-hoi-thuong-gap" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Giải Đáp Thắc Mắc Chuyên Sâu
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Câu Hỏi Thường Gặp Về Lưu Trữ Tế Bào Gốc
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Mọi thông tin y khoa phụ huynh cần biết trước khi quyết định lưu giữ nguồn bảo hiểm sinh học cho con.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setFilterCategory(c.id);
                setOpenIdx(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === c.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              id={`faq-filter-${c.id}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  id={`faq-toggle-${index}`}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center shrink-0 font-bold">
                      ?
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/60 mt-1">
                    <div className="pt-3">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
