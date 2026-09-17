export interface LegalInfo {
  companyName: string;
  shortName: string;
  taxCode: string;
  legalRepresentative: string;
  foundedDate: string;
  address: string;
  mainSector: string;
}

export interface HospitalPartner {
  id: string;
  name: string;
  type: string;
  province: string;
  address: string;
  collaborationDetails: string;
  specialty: string;
  hotline: string;
  isKeyPartner?: boolean;
  isActiveInConsultation?: boolean;
}

export interface StoragePackage {
  id: string;
  title: string;
  shortDesc: string;
  targetCellType: string;
  suitableFor: string;
  category?: 'combo' | 'cord_blood' | 'tissue' | 'immune_cells' | 'expansion' | 'other';
  badge?: string;
  isConsultationChoice?: boolean;
  isActive?: boolean;
  benefits: string[];
  referenceAnnualVnd?: number;
  durations: {
    years: number;
    label: string;
    totalPriceVnd: number;
    annualVnd?: number;
    savingsPercent?: number;
  }[];
}

export interface ProcessStep {
  step: number;
  title: string;
  timeframe: string;
  description: string;
  keyAction: string;
  location: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  hospital: string;
  date: string;
  rating: number;
  comment: string;
  highlight: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'kien-thuc' | 'quy-trinh' | 'chi-phi' | 'ung-dung' | 'phap-ly';
}

export type PageId =
  | 'home'
  | 'about'
  | 'technology'
  | 'service-cord-blood'
  | 'service-tissue'
  | 'service-expansion'
  | 'service-nk-cells'
  | 'news'
  | 'contact'
  | 'admin';

export interface NewsArticle {
  id: string;
  title: string;
  slug?: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  author: string;
  tags: string[];
  content: string[];
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  seoScore?: number;
  published?: boolean;
  coverImage?: string;
  coverImageAlt?: string;
  coverImageCaption?: string;
  canonicalUrl?: string;
}

export interface WebsiteSettings {
  hotlineDisplay: string;
  hotlineRaw: string;
  email: string;
  workingHours: string;
  address: string;
  facebookUrl: string;
  zaloUrl: string;
}

export type LeadStatus = 'new' | 'consulting' | 'contracted' | 'collected' | 'cancelled';

export interface CrmLead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  gestationalAge?: string;
  expectedHospital?: string;
  interestedPackage?: string;
  note?: string;
  status: LeadStatus;
  createdAt: string;
  doctorNotes?: string;
}

export type AdminTab = 'dashboard' | 'news' | 'crm' | 'pricing' | 'hospitals' | 'reviews' | 'settings';
