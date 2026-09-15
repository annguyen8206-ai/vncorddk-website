import { apiFetch } from './client';
import { StoragePackage } from '../types';

export async function getPackages(): Promise<StoragePackage[]> {
  return apiFetch<StoragePackage[]>('/packages');
}

export async function bulkSavePackages(packages: StoragePackage[]): Promise<void> {
  await apiFetch('/packages', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(packages),
  });
}

export async function resetPackagesApi(): Promise<void> {
  await apiFetch('/packages/reset', { method: 'POST', auth: true });
}
