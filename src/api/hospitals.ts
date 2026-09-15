import { apiFetch } from './client';
import { HospitalPartner } from '../types';

export async function getHospitals(): Promise<HospitalPartner[]> {
  return apiFetch<HospitalPartner[]>('/hospitals');
}

export async function bulkSaveHospitals(hospitals: HospitalPartner[]): Promise<void> {
  await apiFetch('/hospitals', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(hospitals),
  });
}
