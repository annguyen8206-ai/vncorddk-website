/**
 * apiStore.ts — Unified store that uses the real backend API,
 * with graceful localStorage fallback when backend is offline.
 *
 * Drop-in replacement for adminStore.ts functions.
 * All components continue to work without modification.
 */

import { checkApiHealth, setToken, clearToken, getToken } from '../api/client';
import * as AuthApi from '../api/auth';
import * as SettingsApi from '../api/settings';
import * as LeadsApi from '../api/leads';
import * as ArticlesApi from '../api/articles';
import * as PackagesApi from '../api/packages';
import * as HospitalsApi from '../api/hospitals';
import * as ReviewsApi from '../api/reviews';

import {
  WebsiteSettings,
  CrmLead,
  NewsArticle,
  StoragePackage,
  HospitalPartner,
  ReviewItem,
  LeadStatus,
} from '../types';

// Re-export from local store for data that doesn't need API (static mock data)
export {
  DEFAULT_SETTINGS,
  INITIAL_LEADS,
  INITIAL_HOSPITALS,
  INITIAL_REVIEWS,
  INITIAL_EXTENDED_PACKAGES,
} from './adminStore';

// ─── API Availability ───────────────────────────────────────────────────────
let _apiAvailable: boolean | null = null;

export async function isApiAvailable(): Promise<boolean> {
  if (_apiAvailable !== null) return _apiAvailable;
  _apiAvailable = await checkApiHealth();
  console.log(`[Store] Backend API ${_apiAvailable ? '✅ online' : '❌ offline (using localStorage fallback)'}`);
  return _apiAvailable;
}

// Reset cache (useful after network recovery)
export function resetApiAvailabilityCache() {
  _apiAvailable = null;
}

// ─── Local Auth (fallback khi backend offline) ───────────────────────────────
const LOCAL_AUTH_KEY = 'vncord_local_auth_hash';
const LOCAL_AUTH_TOKEN = 'vncord_local_fallback_token';

/** Tạo hash đơn giản từ username + password (không cần crypto native) */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function getLocalAuthHash(): string {
  // Mật khẩu mặc định: admin / vncord2025
  const stored = localStorage.getItem(LOCAL_AUTH_KEY);
  return stored || simpleHash('admin:vncord2025');
}

function localLogin(username: string, password: string, remember: boolean): boolean {
  const expected = getLocalAuthHash();
  const actual = simpleHash(`${username}:${password}`);
  if (actual === expected) {
    setToken(LOCAL_AUTH_TOKEN, remember);
    return true;
  }
  return false;
}

function localChangePassword(oldPassword: string, newPassword: string): boolean {
  const stored = getLocalAuthHash();
  const oldHash = simpleHash(`admin:${oldPassword}`);
  if (oldHash !== stored) return false;
  localStorage.setItem(LOCAL_AUTH_KEY, simpleHash(`admin:${newPassword}`));
  return true;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export function isAdminAuthenticated(): boolean {
  return AuthApi.isAdminAuthenticated();
}

export async function loginAdmin(
  username: string,
  password: string,
  remember: boolean = true
): Promise<{ success: boolean; error?: string }> {
  // Reset cache để kiểm tra lại backend mỗi lần đăng nhập
  resetApiAvailabilityCache();
  // Thử API backend trước
  if (await isApiAvailable()) {
    try {
      const result = await AuthApi.loginAdmin(username, password, remember);
      if (result.success) {
        window.dispatchEvent(new Event('vncord_admin_auth_changed'));
        return result;
      }
      // Sai mật khẩu từ backend → không thử fallback
      return result;
    } catch {
      // Network error → thử fallback
    }
  }

  // Fallback local auth khi backend offline
  if (localLogin(username, password, remember)) {
    window.dispatchEvent(new Event('vncord_admin_auth_changed'));
    return { success: true };
  }
  return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng.' };
}

export async function logoutAdmin(): Promise<void> {
  const token = getToken();
  if (token && token !== LOCAL_AUTH_TOKEN) {
    await AuthApi.logoutAdmin();
  } else {
    clearToken();
  }
  window.dispatchEvent(new Event('vncord_admin_auth_changed'));
}

export async function changePassword(
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  // Thử backend trước
  if (await isApiAvailable()) {
    const token = getToken();
    if (token && token !== LOCAL_AUTH_TOKEN) {
      return AuthApi.changePassword(oldPassword, newPassword);
    }
  }
  // Fallback: đổi mật khẩu local
  const ok = localChangePassword(oldPassword, newPassword);
  return ok
    ? { success: true }
    : { success: false, error: 'Mật khẩu cũ không đúng.' };
}

// ─── Settings ────────────────────────────────────────────────────────────────
import { loadSettings as loadSettingsLocal, saveSettings as saveSettingsLocal } from './adminStore';

export async function loadSettingsAsync(): Promise<WebsiteSettings> {
  if (await isApiAvailable()) {
    try {
      const settings = await SettingsApi.getSettings();
      // Also update localStorage cache
      saveSettingsLocal(settings);
      return settings;
    } catch (e) {
      console.warn('[Store] Settings API failed, using localStorage', e);
    }
  }
  return loadSettingsLocal();
}

export function loadSettings(): WebsiteSettings {
  return loadSettingsLocal();
}

export async function saveSettings(settings: WebsiteSettings): Promise<void> {
  saveSettingsLocal(settings); // Optimistic local update
  if (await isApiAvailable()) {
    try {
      await SettingsApi.updateSettings(settings);
    } catch (e) {
      console.warn('[Store] Settings save API failed, data saved locally only', e);
    }
  }
  window.dispatchEvent(new Event('vncord_settings_updated'));
}

// ─── Leads ───────────────────────────────────────────────────────────────────
import { loadLeads as loadLeadsLocal, saveLeads as saveLeadsLocal } from './adminStore';

export async function loadLeadsAsync(): Promise<CrmLead[]> {
  if (await isApiAvailable()) {
    try {
      const leads = await LeadsApi.getLeads();
      saveLeadsLocal(leads);
      return leads;
    } catch (e) {
      console.warn('[Store] Leads API failed, using localStorage', e);
    }
  }
  return loadLeadsLocal();
}

export function loadLeads(): CrmLead[] {
  return loadLeadsLocal();
}

export async function addLead(
  lead: Omit<CrmLead, 'id' | 'createdAt' | 'status'> & Partial<Pick<CrmLead, 'status'>>
): Promise<CrmLead> {
  if (await isApiAvailable()) {
    try {
      const newLead = await LeadsApi.createLead(lead);
      // Refresh local cache
      const leads = loadLeadsLocal();
      saveLeadsLocal([newLead, ...leads]);
      window.dispatchEvent(new Event('vncord_leads_updated'));
      return newLead;
    } catch (e) {
      console.warn('[Store] Lead create API failed, saving locally', e);
    }
  }
  // Fallback: local
  const { addLead: addLeadLocal } = await import('./adminStore');
  return addLeadLocal(lead);
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  doctorNotes?: string
): Promise<void> {
  if (await isApiAvailable()) {
    try {
      await LeadsApi.updateLead(id, { status, ...(doctorNotes !== undefined ? { doctorNotes } : {}) });
      const leads = loadLeadsLocal().map(l =>
        l.id === id ? { ...l, status, ...(doctorNotes !== undefined ? { doctorNotes } : {}) } : l
      );
      saveLeadsLocal(leads);
      window.dispatchEvent(new Event('vncord_leads_updated'));
      return;
    } catch (e) {
      console.warn('[Store] Lead update API failed', e);
    }
  }
  const { updateLeadStatus: updateLeadStatusLocal } = await import('./adminStore');
  updateLeadStatusLocal(id, status, doctorNotes);
}

export async function deleteLead(id: string): Promise<void> {
  if (await isApiAvailable()) {
    try {
      await LeadsApi.deleteLead(id);
      const leads = loadLeadsLocal().filter(l => l.id !== id);
      saveLeadsLocal(leads);
      window.dispatchEvent(new Event('vncord_leads_updated'));
      return;
    } catch (e) {
      console.warn('[Store] Lead delete API failed', e);
    }
  }
  const { deleteLead: deleteLeadLocal } = await import('./adminStore');
  deleteLeadLocal(id);
}

// ─── Articles ────────────────────────────────────────────────────────────────
import { loadArticles as loadArticlesLocal, saveArticles as saveArticlesLocal } from './adminStore';

export async function loadArticlesAsync(): Promise<NewsArticle[]> {
  if (await isApiAvailable()) {
    try {
      const articles = await ArticlesApi.getArticles();
      if (articles.length > 0) {
        saveArticlesLocal(articles);
        return articles;
      }
    } catch (e) {
      console.warn('[Store] Articles API failed, using localStorage', e);
    }
  }
  return loadArticlesLocal();
}

export function loadArticles(): NewsArticle[] {
  return loadArticlesLocal();
}

export async function saveArticles(articles: NewsArticle[]): Promise<void> {
  saveArticlesLocal(articles);
  if (await isApiAvailable()) {
    try {
      await ArticlesApi.bulkSaveArticles(articles);
    } catch (e) {
      console.warn('[Store] Articles bulk save API failed', e);
    }
  }
}

// ─── Packages ────────────────────────────────────────────────────────────────
import { loadPackages as loadPackagesLocal, savePackages as savePackagesLocal } from './adminStore';

export async function loadPackagesAsync(): Promise<StoragePackage[]> {
  if (await isApiAvailable()) {
    try {
      const packages = await PackagesApi.getPackages();
      if (packages.length > 0) {
        savePackagesLocal(packages);
        return packages;
      }
    } catch (e) {
      console.warn('[Store] Packages API failed, using localStorage', e);
    }
  }
  return loadPackagesLocal();
}

export function loadPackages(): StoragePackage[] {
  return loadPackagesLocal();
}

export async function savePackages(packages: StoragePackage[]): Promise<void> {
  savePackagesLocal(packages);
  if (await isApiAvailable()) {
    try {
      await PackagesApi.bulkSavePackages(packages);
    } catch (e) {
      console.warn('[Store] Packages save API failed', e);
    }
  }
  window.dispatchEvent(new Event('vncord_packages_updated'));
}

// ─── Hospitals ───────────────────────────────────────────────────────────────
import { loadHospitals as loadHospitalsLocal, saveHospitals as saveHospitalsLocal } from './adminStore';

export async function loadHospitalsAsync(): Promise<HospitalPartner[]> {
  if (await isApiAvailable()) {
    try {
      const hospitals = await HospitalsApi.getHospitals();
      if (hospitals.length > 0) {
        saveHospitalsLocal(hospitals);
        return hospitals;
      }
    } catch (e) {
      console.warn('[Store] Hospitals API failed, using localStorage', e);
    }
  }
  return loadHospitalsLocal();
}

export function loadHospitals(): HospitalPartner[] {
  return loadHospitalsLocal();
}

export async function saveHospitals(hospitals: HospitalPartner[]): Promise<void> {
  saveHospitalsLocal(hospitals);
  if (await isApiAvailable()) {
    try {
      await HospitalsApi.bulkSaveHospitals(hospitals);
    } catch (e) {
      console.warn('[Store] Hospitals save API failed', e);
    }
  }
  window.dispatchEvent(new Event('vncord_hospitals_updated'));
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
import { loadReviews as loadReviewsLocal, saveReviews as saveReviewsLocal } from './adminStore';

export async function loadReviewsAsync(): Promise<ReviewItem[]> {
  if (await isApiAvailable()) {
    try {
      const reviews = await ReviewsApi.getReviews();
      if (reviews.length > 0) {
        saveReviewsLocal(reviews);
        return reviews;
      }
    } catch (e) {
      console.warn('[Store] Reviews API failed, using localStorage', e);
    }
  }
  return loadReviewsLocal();
}

export function loadReviews(): ReviewItem[] {
  return loadReviewsLocal();
}

export async function saveReviews(reviews: ReviewItem[]): Promise<void> {
  saveReviewsLocal(reviews);
  if (await isApiAvailable()) {
    try {
      await ReviewsApi.bulkSaveReviews(reviews);
    } catch (e) {
      console.warn('[Store] Reviews save API failed', e);
    }
  }
  window.dispatchEvent(new Event('vncord_reviews_updated'));
}

// Re-export sync functions from adminStore for backward compat
export { loadNewsArticles, resetArticles, resetPackages, resetHospitals, saveLeads } from './adminStore';
