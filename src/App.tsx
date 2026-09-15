import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutAndLegal } from './components/AboutAndLegal';
import { ProcessAndPricing } from './components/ProcessAndPricing';
import { CredibilityAndPartners } from './components/CredibilityAndPartners';
import { HospitalNetwork } from './components/HospitalNetwork';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { LegalInfoModal } from './components/LegalInfoModal';

// Dedicated separate pages
import { AboutPage } from './components/AboutPage';
import { CordBloodServicePage } from './components/CordBloodServicePage';
import { TissueServicePage } from './components/TissueServicePage';
import { ExpansionServicePage } from './components/ExpansionServicePage';
import { NkCellsServicePage } from './components/NkCellsServicePage';
import { NewsPage } from './components/NewsPage';
import { ContactPage } from './components/ContactPage';

import { PageId } from './types';
import { Phone, Stethoscope, ArrowRight } from 'lucide-react';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { loadSettings, isAdminAuthenticated, logoutAdmin } from './store/apiStore';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(isAdminAuthenticated());
  const [settings, setSettings] = useState(loadSettings());
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('combo-package');
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [isServicesInView, setIsServicesInView] = useState(false);
  const servicesSectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = servicesSectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsServicesInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [currentPage]);

  React.useEffect(() => {
    const handleUpdate = () => setSettings(loadSettings());
    const handleAuthChange = () => setIsAdminAuth(isAdminAuthenticated());
    
    window.addEventListener('vncord_settings_updated', handleUpdate);
    window.addEventListener('vncord_admin_auth_changed', handleAuthChange);

    // Check URL hash or query for secret admin access (#admin or ?admin=true)
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === '#admin' || hash === '#login' || search.includes('admin=true') || search.includes('page=admin')) {
        setCurrentPage('admin');
      }
    };

    checkAdminRoute();

    const handleHashChange = () => {
      checkAdminRoute();
    };
    window.addEventListener('hashchange', handleHashChange);

    // Secret Admin Shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentPage('admin');
        window.location.hash = '#admin';
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('vncord_settings_updated', handleUpdate);
      window.removeEventListener('vncord_admin_auth_changed', handleAuthChange);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenConsultation = (pkgId?: string) => {
    if (pkgId) setSelectedPackageId(pkgId);
    setIsConsultationOpen(true);
  };

  const handleSelectHospital = (hospitalName: string) => {
    setSelectedHospital(hospitalName);
    setIsConsultationOpen(true);
  };

  const handleSelectHeroOption = (option: 'A' | 'B' | 'C') => {
    if (option === 'A') {
      const el = document.getElementById('quy-trinh-chi-phi');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (option === 'B') {
      const el = document.getElementById('uy-tin-hop-tac');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (option === 'C') {
      const el = document.getElementById('benh-vien-lien-ket');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    if (page !== 'admin' && window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Admin Route: Requires Login Screen & Password Authentication
  if (currentPage === 'admin') {
    if (!isAdminAuth) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAdminAuth(true);
          }}
          onBackToSite={() => {
            handleNavigate('home');
          }}
        />
      );
    }

    return (
      <AdminLayout
        onExitAdmin={() => handleNavigate('home')}
        onLogout={async () => {
          await logoutAdmin();
          setIsAdminAuth(false);
          handleNavigate('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-teal-100 selection:text-teal-900 font-sans">
      {/* Header with full navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
        onOpenLegal={() => setIsLegalModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="grow">
        {/* 1. Trang Chủ */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onSelectOption={handleSelectHeroOption}
              onOpenConsultation={() => handleOpenConsultation()}
              onOpenLegal={() => setIsLegalModalOpen(true)}
            />

            {/* Quick overview of 4 specialized services */}
            <section ref={servicesSectionRef} className="py-8 sm:py-14 bg-white border-b border-slate-100 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className={`text-center max-w-3xl mx-auto mb-6 sm:mb-10 transition-all duration-700 ease-out transform ${
                    isServicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  <span className="text-teal-600 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-teal-50 px-2.5 sm:px-3 py-1 rounded-full border border-teal-100">
                    Danh Mục Trọng Tâm
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mt-2 sm:mt-2.5">
                    Các Dịch Vụ Y Sinh Học Tại VNCORD – DK
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1.5 sm:mt-2 px-1">
                    Mỗi dịch vụ được thiết kế với quy trình chuẩn y khoa, vận hành phòng sạch và kiểm chuẩn chất lượng nghiêm ngặt.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
                  {/* Service 1 */}
                  <div
                    id="service-card-cord-blood"
                    onClick={() => handleNavigate('service-cord-blood')}
                    className={`p-4 sm:p-5 lg:p-6 rounded-2xl bg-gradient-to-b from-sky-50/40 via-white to-white hover:from-sky-50/70 border border-slate-200 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all duration-700 ease-out transform cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5 active:scale-[0.98] ${
                      isServicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1 sm:mb-2">01. Dây Rốn</span>
                      <h3 className="font-bold text-slate-900 text-[15px] sm:text-base lg:text-lg group-hover:text-sky-700 transition-colors mb-1.5 sm:mb-2 leading-snug">
                        Tế Bào Gốc Dây Rốn (HSC)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-normal sm:leading-relaxed">
                        Tế bào gốc tạo máu từ máu cuống rốn điều trị hơn 80 bệnh lý nguy hiểm về máu và miễn dịch.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100">
                      <div className="w-full min-h-[42px] sm:min-h-[46px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-sky-700 bg-sky-50/90 group-hover:bg-sky-600 group-hover:text-white border border-sky-200/80 group-hover:border-sky-600 transition-all flex items-center justify-between shadow-2xs">
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div
                    id="service-card-tissue"
                    onClick={() => handleNavigate('service-tissue')}
                    style={{ transitionDelay: isServicesInView ? '120ms' : '0ms' }}
                    className={`p-4 sm:p-5 lg:p-6 rounded-2xl bg-gradient-to-b from-emerald-50/40 via-white to-white hover:from-emerald-50/70 border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all duration-700 ease-out transform cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5 active:scale-[0.98] ${
                      isServicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1 sm:mb-2">02. Từ Mô</span>
                      <h3 className="font-bold text-slate-900 text-[15px] sm:text-base lg:text-lg group-hover:text-emerald-700 transition-colors mb-1.5 sm:mb-2 leading-snug">
                        Tế Bào Gốc Từ Mô (MSC)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-normal sm:leading-relaxed">
                        Tế bào gốc trung mô từ thạch Wharton có năng lực tái tạo cơ quan tổn thương và điều hòa miễn dịch.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100">
                      <div className="w-full min-h-[42px] sm:min-h-[46px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-700 bg-emerald-50/90 group-hover:bg-emerald-600 group-hover:text-white border border-emerald-200/80 group-hover:border-emerald-600 transition-all flex items-center justify-between shadow-2xs">
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Service 3 */}
                  <div
                    id="service-card-expansion"
                    onClick={() => handleNavigate('service-expansion')}
                    style={{ transitionDelay: isServicesInView ? '240ms' : '0ms' }}
                    className={`p-4 sm:p-5 lg:p-6 rounded-2xl bg-gradient-to-b from-violet-50/40 via-white to-white hover:from-violet-50/70 border border-slate-200 hover:border-violet-300 shadow-2xs hover:shadow-md transition-all duration-700 ease-out transform cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5 active:scale-[0.98] ${
                      isServicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold text-violet-600 uppercase tracking-wider block mb-1 sm:mb-2">03. Nhân Bội</span>
                      <h3 className="font-bold text-slate-900 text-[15px] sm:text-base lg:text-lg group-hover:text-violet-700 transition-colors mb-1.5 sm:mb-2 leading-snug">
                        Tăng Sinh Tế Bào
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-normal sm:leading-relaxed">
                        Nhân nuôi tế bào đạt số lượng trị liệu lâm sàng trong môi trường vô trùng không huyết thanh.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100">
                      <div className="w-full min-h-[42px] sm:min-h-[46px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-violet-700 bg-violet-50/90 group-hover:bg-violet-600 group-hover:text-white border border-violet-200/80 group-hover:border-violet-600 transition-all flex items-center justify-between shadow-2xs">
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Service 4 */}
                  <div
                    id="service-card-nk-cells"
                    onClick={() => handleNavigate('service-nk-cells')}
                    style={{ transitionDelay: isServicesInView ? '360ms' : '0ms' }}
                    className={`p-4 sm:p-5 lg:p-6 rounded-2xl bg-gradient-to-b from-rose-50/40 via-white to-white hover:from-rose-50/70 border border-slate-200 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all duration-700 ease-out transform cursor-pointer group flex flex-col justify-between hover:-translate-y-1.5 active:scale-[0.98] ${
                      isServicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1 sm:mb-2">04. Tế Bào Tự Nhiên</span>
                      <h3 className="font-bold text-slate-900 text-[15px] sm:text-base lg:text-lg group-hover:text-rose-700 transition-colors mb-1.5 sm:mb-2 leading-snug">
                        Điều Hòa Miễn Dịch (NK)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-normal sm:leading-relaxed">
                        Hoạt hóa tế bào Natural Killer tự thân bảo vệ cơ thể và tiêu diệt tế bào đột biến ung thư.
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100">
                      <div className="w-full min-h-[42px] sm:min-h-[46px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-rose-700 bg-rose-50/90 group-hover:bg-rose-600 group-hover:text-white border border-rose-200/80 group-hover:border-rose-600 transition-all flex items-center justify-between shadow-2xs">
                        <span>Xem chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Corporate Legal & Mission Overview */}
            <AboutAndLegal
              onOpenConsultation={() => handleOpenConsultation()}
              onOpenLegalModal={() => setIsLegalModalOpen(true)}
            />

            {/* Aspect (A): 5-step Medical Process & Cost Calculator */}
            <ProcessAndPricing
              onOpenConsultation={(pkgId) => handleOpenConsultation(pkgId)}
            />

            {/* Aspect (B): Reputation, Stem Cell Institute Partnership, & Doctor Reviews */}
            <CredibilityAndPartners
              onOpenConsultation={() => handleOpenConsultation()}
              onOpenLegal={() => setIsLegalModalOpen(true)}
            />

            {/* Aspect (C): Hospital Network & Partner Locator */}
            <HospitalNetwork
              onSelectHospital={handleSelectHospital}
            />

            {/* FAQs */}
            <FaqSection />
          </>
        )}

        {/* 2. Trang Về Chúng Tôi */}
        {currentPage === 'about' && (
          <AboutPage
            onOpenConsultation={() => handleOpenConsultation()}
            onOpenLegal={() => setIsLegalModalOpen(true)}
          />
        )}

        {/* 3. Dịch Vụ 1: Tế bào gốc dây rốn (HSC) */}
        {currentPage === 'service-cord-blood' && (
          <CordBloodServicePage
            onOpenConsultation={(pkgId) => handleOpenConsultation(pkgId)}
          />
        )}

        {/* 4. Dịch Vụ 2: Tế bào gốc từ mô (MSC) */}
        {currentPage === 'service-tissue' && (
          <TissueServicePage
            onOpenConsultation={(pkgId) => handleOpenConsultation(pkgId)}
          />
        )}

        {/* 5. Dịch Vụ 3: Tăng sinh tế bào */}
        {currentPage === 'service-expansion' && (
          <ExpansionServicePage
            onOpenConsultation={(svc) => handleOpenConsultation(svc)}
          />
        )}

        {/* 6. Dịch Vụ 4: Điều hòa hệ miễn dịch (NK) */}
        {currentPage === 'service-nk-cells' && (
          <NkCellsServicePage
            onOpenConsultation={(svc) => handleOpenConsultation(svc)}
          />
        )}

        {/* 7. Trang Tin Tức */}
        {currentPage === 'news' && (
          <NewsPage
            onOpenConsultation={() => handleOpenConsultation()}
          />
        )}

        {/* 8. Trang Liên Hệ */}
        {currentPage === 'contact' && (
          <ContactPage
            onOpenLegal={() => setIsLegalModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={() => setIsLegalModalOpen(true)}
        onOpenConsultation={handleOpenConsultation}
        onNavigate={handleNavigate}
      />

      {/* Floating Quick Contact Widget */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5">
        <button
          onClick={() => handleOpenConsultation()}
          className="group flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-full shadow-lg hover:shadow-teal-500/30 hover:scale-105 transition-all cursor-pointer font-bold text-xs sm:text-sm"
          id="floating-consult-btn"
          aria-label="Đăng ký tư vấn mẫu"
        >
          <Stethoscope className="w-4 h-4" />
          <span className="hidden sm:inline">Tư Vấn Tế Bào Gốc</span>
        </button>

        <a
          href={`tel:${settings.hotlineRaw}`}
          className="flex items-center justify-center w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:scale-105 transition-all"
          id="floating-call-btn"
          title={`Gọi hotline 24/7: ${settings.hotlineDisplay}`}
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </a>

        {settings.facebookUrl && (
          <a
            href={settings.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-[#1877F2] hover:bg-[#0d65d9] text-white rounded-full shadow-lg hover:scale-105 transition-all"
            id="floating-facebook-btn"
            title="Facebook VNCORD-DK"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
        )}

        {settings.zaloUrl && (
          <a
            href={settings.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:scale-105 transition-all overflow-hidden"
            id="floating-zalo-btn"
            title="Zalo VNCORD-DK"
            style={{ background: '#e8f4ff', border: '2px solid #90c8ff' }}
          >
            {/* Zalo official logo */}
            <img src="/logo-zalo-icon.png" alt="Zalo" className="w-8 h-8 object-contain" />
          </a>
        )}
      </div>

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        prefilledPackageId={selectedPackageId}
        prefilledHospital={selectedHospital}
      />

      <LegalInfoModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />
    </div>
  );
}
