import { WebsiteSettings, CrmLead, NewsArticle, StoragePackage, ReviewItem, HospitalPartner } from '../types';
import { STORAGE_PACKAGES, NEWS_ARTICLES, HOSPITAL_PARTNERS } from '../data/mockData';

const SETTINGS_KEY = 'vncord_website_settings';
const LEADS_KEY = 'vncord_crm_leads';
const ARTICLES_KEY = 'vncord_news_articles';
const PACKAGES_KEY = 'vncord_pricing_packages';
const REVIEWS_KEY = 'vncord_customer_reviews';
const HOSPITALS_KEY = 'vncord_hospital_partners';

export const INITIAL_HOSPITALS: HospitalPartner[] = [
  ...HOSPITAL_PARTNERS.map((h) => ({
    ...h,
    isActiveInConsultation: true,
  })),
  {
    id: 'bv-hung-vuong-tphcm',
    name: 'Bệnh Viện Hùng Vương (TP.HCM)',
    type: 'Bệnh viện Chuyên khoa Sản Phụ khoa Hạng I',
    province: 'TP. Hồ Chí Minh',
    address: '128 Hồng Bàng, Phường 12, Quận 5, TP. Hồ Chí Minh',
    collaborationDetails: 'Kỹ thuật viên túc trực phòng sinh tiếp nhận và xử lý mẫu tế bào gốc cuống rốn 24/7.',
    specialty: 'Sản phụ khoa, Hiếm muộn và Sơ sinh chuyên sâu',
    hotline: '028 3855 8582',
    isKeyPartner: false,
    isActiveInConsultation: true,
  },
  {
    id: 'bv-vinmec-central-park',
    name: 'Bệnh Viện Đa Khoa Quốc Tế Vinmec Central Park',
    type: 'Bệnh viện Quốc tế Chuẩn JCI',
    province: 'TP. Hồ Chí Minh',
    address: '208 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
    collaborationDetails: 'Quy trình tiếp nhận bàn giao mẫu vô trùng chuẩn JCI quốc tế.',
    specialty: 'Sản khoa cao cấp, Tế bào gốc và Nhi khoa',
    hotline: '028 3622 1166',
    isKeyPartner: false,
    isActiveInConsultation: true,
  },
  {
    id: 'bv-phu-san-can-tho',
    name: 'Bệnh Viện Phụ Sản TP. Cần Thơ',
    type: 'Bệnh viện Chuyên khoa Sản Nhi Tuyến Đầu ĐBSCL',
    province: 'Cần Thơ',
    address: '106 Cách Mạng Tháng Tám, Phường Cái Khế, Quận Ninh Kiều, TP. Cần Thơ',
    collaborationDetails: 'Mạng lưới điều phối tiếp nhận kit sinh khẩn cấp và chuyển mẫu bằng xe lạnh chuyên dụng.',
    specialty: 'Sản phụ khoa và Chăm sóc chu sinh',
    hotline: '0292 3762 989',
    isKeyPartner: false,
    isActiveInConsultation: true,
  },
  {
    id: 'bv-khac',
    name: 'Bệnh viện khác (VNCORD-DK hỗ trợ thủ tục liên viện)',
    type: 'Toàn quốc',
    province: 'Tùy chọn',
    address: 'Hỗ trợ kỹ thuật viên và bộ kit tận nơi trên toàn quốc',
    collaborationDetails: 'Đội phản ứng nhanh VNCORD-DK hỗ trợ thủ tục liên viện và cử chuyên viên túc trực phòng sinh.',
    specialty: 'Sản khoa toàn quốc',
    hotline: '0908 165 222',
    isKeyPartner: false,
    isActiveInConsultation: true,
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    author: 'Chị Mai Linh (32 tuổi)',
    role: 'Sản phụ sinh bé đầu lòng',
    hospital: 'Bệnh viện Từ Dũ (TP.HCM)',
    date: 'Tháng 02/2025',
    rating: 5,
    comment: 'Lúc chuẩn bị sinh mình rất lo lắng về khâu lấy máu cuống rốn, nhưng chuyên viên của VNCORD-DK túc trực rất chuẩn giờ và làm việc ăn ý với bác sĩ đỡ sinh. Mẫu được kiểm định và cấp chứng thư chỉ sau 48 giờ.',
    highlight: 'Kỹ thuật viên túc trực phòng sinh tận tâm',
  },
  {
    id: 'rev-02',
    author: 'Gia đình anh Quốc Bảo - chị Thu Trang',
    role: 'Khách hàng lưu trữ gói Combo Kép 25 năm',
    hospital: 'Bệnh viện Thống Nhất',
    date: 'Tháng 01/2025',
    rating: 5,
    comment: 'Sau khi tìm hiểu kỹ tính pháp lý và tham quan phòng lab đạt chuẩn, vợ chồng mình quyết định lưu trữ cả máu và mô cuống rốn. Chính sách hỗ trợ trả góp 0% qua thẻ tín dụng rất tiện lợi.',
    highlight: 'Hỗ trợ trả góp 0% linh hoạt và minh bạch chi phí',
  },
  {
    id: 'rev-03',
    author: 'Bác sĩ sản khoa Hoàng Thị Minh',
    role: 'Cố vấn chuyên môn liên viện',
    hospital: 'Bệnh viện Đa khoa Tâm Trí',
    date: 'Tháng 12/2024',
    rating: 5,
    comment: 'Quy trình thu thập mẫu của VNCORD-DK rất chuyên nghiệp, bộ kit vô trùng đóng gói chuẩn hóa giúp các y bác sĩ thao tác nhanh chóng, an toàn tuyệt đối cho mẹ và bé ngay tại bàn sinh.',
    highlight: 'Quy trình vô trùng an toàn tuyệt đối',
  },
];

export const DEFAULT_SETTINGS: WebsiteSettings = {
  hotlineDisplay: '1900 0909',
  hotlineRaw: '19000909',
  email: 'info@vncorddk.com',
  workingHours: '08:00 – 18:00 | Thứ 2 – Thứ 7',
  address: '51 - 53, Ngô Thị Bì, KDC Him Lam, Phường Tân Hưng, TPHCM',
  facebookUrl: 'https://www.facebook.com/vncord.dk',
  zaloUrl: 'https://zalo.me/0908165222',
};

export const INITIAL_LEADS: CrmLead[] = [
  {
    id: 'LEAD-2025-001',
    fullName: 'Nguyễn Thị Mai Linh',
    phone: '0912 345 678',
    email: 'mailinh.nguyen@gmail.com',
    gestationalAge: 'Tuần thai 32 (Dự sinh: 15/04/2025)',
    expectedHospital: 'Bệnh viện Từ Dũ',
    interestedPackage: 'Combo Kép Toàn Diện (HSC + MSC)',
    note: 'Gia đình muốn tìm hiểu gói 25 năm và chính sách trả góp 0%',
    status: 'consulting',
    createdAt: '09/03/2025 14:32',
    doctorNotes: 'Bác sĩ Lan đã liên hệ, giải thích quy trình tách chiết kép. Hẹn gọi lại vào tối thứ Năm.',
  },
  {
    id: 'LEAD-2025-002',
    fullName: 'Trần Thị Thanh Hằng',
    phone: '0983 221 455',
    email: 'thanhhang.tran@yahoo.com',
    gestationalAge: 'Tuần thai 36 (Dự sinh: 20/03/2025)',
    expectedHospital: 'Bệnh viện Hùng Vương',
    interestedPackage: 'Máu Cuống Rốn (HSC) - 25 Năm',
    note: 'Đã hoàn tất thanh toán đợt 1',
    status: 'contracted',
    createdAt: '08/03/2025 09:15',
    doctorNotes: 'Đã ký Hợp đồng HĐ-2025/082. Bộ kit vô trùng đã gửi trực tiếp tới phòng nhận bệnh viện.',
  },
  {
    id: 'LEAD-2025-003',
    fullName: 'Lê Hoàng Yến',
    phone: '0903 889 123',
    email: 'yen.lehoang@fpt.com.vn',
    gestationalAge: 'Đã sinh sáng nay',
    expectedHospital: 'Bệnh viện Phụ sản MêKông',
    interestedPackage: 'Mô Cuống Rốn (MSC) - Trọn Đời',
    note: 'Ca sinh mổ chủ động 08:30',
    status: 'collected',
    createdAt: '07/03/2025 16:45',
    doctorNotes: 'Kỹ thuật viên VNCORD-DK đã tiếp nhận mẫu tại phòng sinh lúc 09:15. Đang vận chuyển kiểm soát nhiệt độ về Lab Quận 7.',
  },
  {
    id: 'LEAD-2025-004',
    fullName: 'Phạm Quỳnh Nga',
    phone: '0977 654 321',
    email: 'quynhnga.pham@gmail.com',
    gestationalAge: 'Tuần thai 29 (Dự sinh: 05/05/2025)',
    expectedHospital: 'Bệnh viện Quốc tế Hạnh Phúc',
    interestedPackage: 'Combo Kép Toàn Diện (HSC + MSC)',
    note: 'Đăng ký qua website, quan tâm ưu đãi đặt trước tuần 30',
    status: 'new',
    createdAt: '09/03/2025 18:20',
    doctorNotes: 'Chưa liên hệ. Ưu tiên gọi khung giờ 19:00 - 20:00.',
  },
  {
    id: 'LEAD-2025-005',
    fullName: 'Vũ Minh Trang',
    phone: '0934 567 890',
    email: 'trang.vu@vinamilk.com.vn',
    gestationalAge: 'Tuần thai 34 (Dự sinh: 28/03/2025)',
    expectedHospital: 'Bệnh viện Đại học Y Dược TP.HCM',
    interestedPackage: 'Gói Nuôi Cấy Tăng Sinh Tế Bào',
    note: 'Cần bác sĩ tư vấn chuyên sâu về điều hòa miễn dịch cho người nhà',
    status: 'consulting',
    createdAt: '06/03/2025 11:10',
    doctorNotes: 'Hẹn gia đình đến thăm quan cơ sở phòng sạch tại 51 - 53, Ngô Thị Bì, KDC Him Lam, Phường Tân Hưng, TPHCM vào sáng thứ Bảy.',
  },
];

// Helper to safely load from LocalStorage
export function loadSettings(): WebsiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Auto-migrate legacy address format to latest street name and administrative units
      if (
        !parsed.address ||
        parsed.address.includes('Đường D4') ||
        parsed.address.includes('đường D4') ||
        !parsed.address.includes('Ngô Thị Bì')
      ) {
        parsed.address = DEFAULT_SETTINGS.address;
        localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...parsed, address: DEFAULT_SETTINGS.address }));
      }
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load settings from storage', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: WebsiteSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('vncord_settings_updated'));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function loadLeads(): CrmLead[] {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load leads from storage', e);
  }
  return INITIAL_LEADS;
}

export function saveLeads(leads: CrmLead[]): void {
  try {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    window.dispatchEvent(new Event('vncord_leads_updated'));
  } catch (e) {
    console.error('Failed to save leads', e);
  }
}

export function addLead(lead: Omit<CrmLead, 'id' | 'createdAt' | 'status'> & Partial<Pick<CrmLead, 'status'>>): CrmLead {
  const currentLeads = loadLeads();
  const dateStr = new Date().toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const newLead: CrmLead = {
    ...lead,
    id: `LEAD-${new Date().getFullYear()}-${String(currentLeads.length + 1).padStart(3, '0')}`,
    createdAt: dateStr,
    status: lead.status || 'new',
  };
  const updated = [newLead, ...currentLeads];
  saveLeads(updated);
  return newLead;
}

export function updateLeadStatus(id: string, status: CrmLead['status'], doctorNotes?: string): void {
  const currentLeads = loadLeads();
  const updated = currentLeads.map((l) => {
    if (l.id === id) {
      return {
        ...l,
        status,
        ...(doctorNotes !== undefined ? { doctorNotes } : {}),
      };
    }
    return l;
  });
  saveLeads(updated);
}

export function deleteLead(id: string): void {
  const currentLeads = loadLeads();
  saveLeads(currentLeads.filter((l) => l.id !== id));
}

export function loadArticles(): NewsArticle[] {
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (raw) {
      const parsed: NewsArticle[] = JSON.parse(raw);
      // Ensure coverImage & SEO defaults are populated even for older stored articles
      return parsed.map((a, idx) => {
        const fallback = NEWS_ARTICLES[idx % NEWS_ARTICLES.length];
        return {
          ...a,
          coverImage: a.coverImage || fallback?.coverImage || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200',
          coverImageAlt: a.coverImageAlt || fallback?.coverImageAlt || a.title,
          coverImageCaption: a.coverImageCaption || fallback?.coverImageCaption || '',
          focusKeyword: a.focusKeyword || a.tags?.[0] || 'Lưu trữ tế bào gốc',
        };
      });
    }
  } catch (e) {
    console.error('Failed to load articles from storage', e);
  }
  // Initialize with enriched SEO fields
  return NEWS_ARTICLES.map((a, idx) => ({
    ...a,
    slug: a.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
    metaTitle: `${a.title.slice(0, 55)} | VNCORD-DK`,
    metaDescription: a.summary.slice(0, 155),
    focusKeyword: a.tags[0] || 'Lưu trữ tế bào gốc',
    seoScore: 88 + (idx % 10),
    published: true,
  }));
}

export function resetArticles(): NewsArticle[] {
  const initial = NEWS_ARTICLES.map((a, idx) => ({
    ...a,
    slug: a.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
    metaTitle: `${a.title.slice(0, 55)} | VNCORD-DK`,
    metaDescription: a.summary.slice(0, 155),
    focusKeyword: a.tags[0] || 'Lưu trữ tế bào gốc',
    seoScore: 88 + (idx % 10),
    published: true,
  }));
  saveArticles(initial);
  return initial;
}

export function saveArticles(articles: NewsArticle[]): void {
  try {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event('vncord_articles_updated'));
    window.dispatchEvent(new Event('vncord_news_updated'));
  } catch (e) {
    console.error('Failed to save articles', e);
  }
}

export const loadNewsArticles = loadArticles;

export const INITIAL_EXTENDED_PACKAGES: StoragePackage[] = [
  {
    ...STORAGE_PACKAGES[2], // combo-package
    category: 'combo',
    badge: 'Phổ biến nhất (Khuyên dùng)',
    isConsultationChoice: true,
    isActive: true,
  },
  {
    ...STORAGE_PACKAGES[0], // cord-blood-package
    category: 'cord_blood',
    badge: 'Hệ tạo máu',
    isConsultationChoice: true,
    isActive: true,
  },
  {
    ...STORAGE_PACKAGES[1], // msc-package
    category: 'tissue',
    badge: 'Y học tái tạo',
    isConsultationChoice: true,
    isActive: true,
  },
  {
    id: 'nk-cells-package',
    title: 'Lưu Trữ Tế Bào Miễn Dịch Tự Nhiên (NK Cells)',
    shortDesc: 'Tế bào Natural Killer chuyên biệt – Hàng rào phòng ngự sinh học nhận diện và tiêu diệt tế bào đột biến, virus và tế bào tiền ung thư.',
    targetCellType: 'Tế bào sát thủ tự nhiên (NK Cells) chiết xuất từ máu cuống rốn / máu ngoại vi',
    suitableFor: 'Liệu pháp miễn dịch tế bào tự thân, tăng cường đề kháng phòng ngừa ung thư và nâng cao hệ miễn dịch cho người thân.',
    category: 'immune_cells',
    badge: 'Liệu pháp Miễn dịch',
    isConsultationChoice: true,
    isActive: true,
    benefits: [
      'Công nghệ phân lập tế bào miễn dịch NK tươi với hoạt lực tiêu diệt tế bào lạ cao',
      'Bảo quản trong nitơ lỏng -196°C bảo toàn trọn vẹn thụ thể nhận diện đặc hiệu',
      'Có thể sử dụng bổ trợ cho cả bé và người thân trong gia đình',
      'Hợp tác nghiên cứu ứng dụng lâm sàng cùng các viện y học tái tạo'
    ],
    durations: [
      { years: 1, label: '1 Năm đầu (Gói chiết xuất & kiểm định)', totalPriceVnd: 35000000, annualVnd: 4500000 },
      { years: 5, label: '5 Năm', totalPriceVnd: 52000000, savingsPercent: 15 },
      { years: 10, label: '10 Năm', totalPriceVnd: 72000000, savingsPercent: 22 },
      { years: 18, label: '18 Năm', totalPriceVnd: 98000000, savingsPercent: 30 },
      { years: 25, label: 'Trọn gói 25 Năm (Bảo vệ phòng ngừa)', totalPriceVnd: 119000000, savingsPercent: 38 }
    ],
  },
  {
    id: 'msc-expansion-package',
    title: 'Gói Tăng Sinh & Hoạt Hóa Tế Bào Trung Mô (MSC Expansion)',
    shortDesc: 'Nuôi cấy và nhân bản số lượng lớn tế bào MSC đạt độ tinh sạch >95% trong hệ thống phòng sạch chuẩn GMP y sinh.',
    targetCellType: 'Tế bào gốc trung mô MSCs thế hệ F2-F3 tăng sinh đạt chuẩn CoA',
    suitableFor: 'Sẵn sàng ứng dụng lâm sàng số lượng lớn cho thoái hóa khớp gối, xơ gan, tiểu đường hoặc thẩm mỹ tái tạo.',
    category: 'expansion',
    badge: 'Chuẩn Phòng Sạch GMP',
    isConsultationChoice: true,
    isActive: true,
    benefits: [
      'Tăng sinh từ hàng triệu lên hàng trăm triệu tế bào chất lượng cao',
      'Kiểm định nghiêm ngặt nội độc tố (Endotoxin), vi khuẩn, nấm mốc và Mycoplasma',
      'Đóng chai phân liều tiện lợi cho từng đợt điều trị lâm sàng',
      'Bảo quản sẵn sàng chuyển giao liên viện khi có chỉ định bác sĩ'
    ],
    durations: [
      { years: 1, label: 'Gói Nuôi cấy 50 Triệu tế bào', totalPriceVnd: 45000000 },
      { years: 5, label: 'Gói Nuôi cấy 100 Triệu tế bào (Phổ biến)', totalPriceVnd: 78000000, savingsPercent: 15 },
      { years: 10, label: 'Gói Nuôi cấy 200 Triệu tế bào (Đa liệu trình)', totalPriceVnd: 135000000, savingsPercent: 25 },
      { years: 25, label: 'Trọn gói Bảo trợ Nuôi cấy Trọn đời 25 Năm', totalPriceVnd: 185000000, savingsPercent: 35 }
    ],
  },
  {
    id: 'four-cell-package',
    title: 'Gói Toàn Diện 4 Loại Tế Bào (Máu, Mô, Màng Ối & Dây Rốn)',
    shortDesc: 'Đỉnh cao y học dự phòng: Khai thác trọn vẹn 4 nguồn tài nguyên sinh học quý giá nhất từ bánh rau và dây rốn sau sinh.',
    targetCellType: 'Bộ tứ tế bào: HSCs + MSCs + Epithelial Stem Cells + Amniotic Membrane',
    suitableFor: 'Bảo hiểm y học tái tạo tối thượng cho cả 3 thế hệ trong gia đình (Em bé, Bố Mẹ, Ông Bà).',
    category: 'other',
    badge: 'Gói Cao Cấp Nhất',
    isConsultationChoice: true,
    isActive: true,
    benefits: [
      'Bảo quản đầy đủ tế bào gốc tạo máu, tế bào gốc trung mô, biểu mô và màng ối',
      'Bộ kit thu thập 4 khoang bảo quản độc lập chống nhiễm chéo',
      'Tối ưu hóa khả năng tương thích miễn dịch đa nguồn',
      'Đặc quyền ưu tiên chuyển giao điều trị tại các trung tâm y tế quốc tế'
    ],
    durations: [
      { years: 1, label: '1 Năm đầu (Thu thập & Xử lý 4 nguồn mẫu)', totalPriceVnd: 65000000 },
      { years: 5, label: '5 Năm', totalPriceVnd: 92000000, savingsPercent: 15 },
      { years: 10, label: '10 Năm', totalPriceVnd: 128000000, savingsPercent: 25 },
      { years: 18, label: '18 Năm', totalPriceVnd: 175000000, savingsPercent: 32 },
      { years: 25, label: 'Trọn gói 25 Năm (Bảo hiểm Gia tộc Tối thượng)', totalPriceVnd: 219000000, savingsPercent: 40 }
    ],
  },
  {
    id: 'custom-inquiry-package',
    title: 'Gói Yêu Cầu Riêng & Chuyển Giao Quốc Tế',
    shortDesc: 'Thiết kế gói lưu trữ và vận chuyển mẫu tùy chỉnh theo yêu cầu gia đình hoặc chỉ định bệnh viện nước ngoài (Singapore, Nhật, Mỹ).',
    targetCellType: 'Theo nhu cầu y khoa cụ thể và chỉ định của bác sĩ',
    suitableFor: 'Khách hàng có kế hoạch chuyển viện quốc tế hoặc có yêu cầu bảo quản mẫu đặc thù.',
    category: 'other',
    badge: 'Tư Vấn Chuyên Biệt',
    isConsultationChoice: true,
    isActive: true,
    benefits: [
      'Hỗ trợ toàn bộ thủ tục pháp lý xuất nhập khẩu mẫu sinh học quốc tế',
      'Hộp vận chuyển khô Liquid Nitrogen Dry Shipper giữ lạnh -150°C trong 10 ngày',
      'Kết nối trực tiếp chuyên gia y tế nước ngoài tham vấn phác đồ',
      'Bảo hiểm vận chuyển y tế toàn cầu trị giá cao'
    ],
    durations: [
      { years: 1, label: 'Gói Tư vấn & Chuẩn bị Hồ sơ Pháp lý', totalPriceVnd: 25000000 },
      { years: 5, label: 'Gói Lưu trữ & Sẵn sàng Chuyển giao 5 Năm', totalPriceVnd: 55000000 },
      { years: 10, label: 'Gói Lưu trữ & Sẵn sàng Chuyển giao 10 Năm', totalPriceVnd: 95000000 },
      { years: 25, label: 'Gói Chuyển giao Quốc tế Trọn đời 25 Năm', totalPriceVnd: 165000000 }
    ],
  },
];

export function loadPackages(): StoragePackage[] {
  try {
    const raw = localStorage.getItem(PACKAGES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load packages from storage', e);
  }
  return INITIAL_EXTENDED_PACKAGES;
}

export function savePackages(packages: StoragePackage[]): void {
  try {
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(packages));
    window.dispatchEvent(new Event('vncord_packages_updated'));
  } catch (e) {
    console.error('Failed to save packages', e);
  }
}

export function resetPackages(): StoragePackage[] {
  try {
    localStorage.removeItem(PACKAGES_KEY);
    window.dispatchEvent(new Event('vncord_packages_updated'));
  } catch (e) {
    console.error('Failed to reset packages', e);
  }
  return INITIAL_EXTENDED_PACKAGES;
}

export function loadHospitals(): HospitalPartner[] {
  try {
    const raw = localStorage.getItem(HOSPITALS_KEY);
    if (raw) {
      const parsed: HospitalPartner[] = JSON.parse(raw);
      let changed = false;
      const updated = parsed.map((h) => {
        if (h.id === 'bv-tam-tri-dong-thap' && h.address.includes('Xã Mỹ Tân')) {
          changed = true;
          return { ...h, address: 'Số 700 Quốc lộ 30, Phường Mỹ Ngãi, TP. Cao Lãnh, Tỉnh Đồng Tháp' };
        }
        if (h.id === 'vien-te-bao-goc' && !h.address.includes('Phường Linh Trung')) {
          changed = true;
          return { ...h, address: 'Khu Công nghệ cao TP.HCM, Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh' };
        }
        if (h.id === 'bv-phu-san-can-tho' && h.address.includes('P. Cái Khế')) {
          changed = true;
          return { ...h, address: '106 Cách Mạng Tháng Tám, Phường Cái Khế, Quận Ninh Kiều, TP. Cần Thơ' };
        }
        return h;
      });
      if (changed) {
        localStorage.setItem(HOSPITALS_KEY, JSON.stringify(updated));
      }
      return updated;
    }
  } catch (e) {
    console.error('Failed to load hospitals from storage', e);
  }
  return INITIAL_HOSPITALS;
}

export function saveHospitals(hospitals: HospitalPartner[]): void {
  try {
    localStorage.setItem(HOSPITALS_KEY, JSON.stringify(hospitals));
    window.dispatchEvent(new Event('vncord_hospitals_updated'));
  } catch (e) {
    console.error('Failed to save hospitals', e);
  }
}

export function resetHospitals(): HospitalPartner[] {
  try {
    localStorage.removeItem(HOSPITALS_KEY);
    window.dispatchEvent(new Event('vncord_hospitals_updated'));
  } catch (e) {
    console.error('Failed to reset hospitals', e);
  }
  return INITIAL_HOSPITALS;
}

export function loadReviews(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load reviews from storage', e);
  }
  return INITIAL_REVIEWS;
}

export function saveReviews(reviews: ReviewItem[]): void {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    window.dispatchEvent(new Event('vncord_reviews_updated'));
  } catch (e) {
    console.error('Failed to save reviews', e);
  }
}

// -------------------------------------------------------------
// Admin Authentication & Password Security
// -------------------------------------------------------------
const ADMIN_AUTH_KEY = 'vncord_admin_auth_session';
const ADMIN_CRED_KEY = 'vncord_admin_credentials';
const DEFAULT_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'vncord2025',
};

export function getAdminCredentials(): { username: string; password: string } {
  try {
    const raw = localStorage.getItem(ADMIN_CRED_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to get admin credentials', e);
  }
  return DEFAULT_ADMIN_CREDENTIALS;
}

export function isAdminAuthenticated(): boolean {
  try {
    const session = sessionStorage.getItem(ADMIN_AUTH_KEY) || localStorage.getItem(ADMIN_AUTH_KEY);
    return session === 'true';
  } catch (e) {
    return false;
  }
}

export function loginAdmin(username: string, password: string, remember: boolean = true): { success: boolean; error?: string } {
  const creds = getAdminCredentials();
  
  if (username.trim() !== creds.username) {
    return { success: false, error: 'Tên đăng nhập không chính xác.' };
  }

  if (password.trim() !== creds.password) {
    return { success: false, error: 'Mật khẩu quản trị không đúng. Vui lòng kiểm tra lại.' };
  }

  try {
    if (remember) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    }
    window.dispatchEvent(new Event('vncord_admin_auth_changed'));
  } catch (e) {
    console.error('Failed to save auth state', e);
  }

  return { success: true };
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    window.dispatchEvent(new Event('vncord_admin_auth_changed'));
  } catch (e) {
    console.error('Failed to logout admin', e);
  }
}

export function updateAdminPassword(oldPass: string, newPass: string): { success: boolean; error?: string } {
  const creds = getAdminCredentials();
  
  if (oldPass !== creds.password) {
    return { success: false, error: 'Mật khẩu hiện tại không chính xác.' };
  }

  if (!newPass || newPass.trim().length < 6) {
    return { success: false, error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
  }

  try {
    const updated = {
      ...creds,
      password: newPass.trim(),
    };
    localStorage.setItem(ADMIN_CRED_KEY, JSON.stringify(updated));
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Không thể lưu mật khẩu mới. Vui lòng thử lại.' };
  }
}

