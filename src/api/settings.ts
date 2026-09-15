import { apiFetch } from './client';
import { WebsiteSettings } from '../types';

export async function getSettings(): Promise<WebsiteSettings> {
  return apiFetch<WebsiteSettings>('/settings');
}

export async function updateSettings(settings: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
  return apiFetch<WebsiteSettings>('/settings', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(settings),
  });
}
