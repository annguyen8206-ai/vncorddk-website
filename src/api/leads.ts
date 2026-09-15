import { apiFetch } from './client';
import { CrmLead, LeadStatus } from '../types';

export async function getLeads(): Promise<CrmLead[]> {
  return apiFetch<CrmLead[]>('/leads', { auth: true });
}

export async function createLead(lead: Omit<CrmLead, 'id' | 'createdAt' | 'status'> & Partial<Pick<CrmLead, 'status'>>): Promise<CrmLead> {
  return apiFetch<CrmLead>('/leads', {
    method: 'POST',
    body: JSON.stringify(lead),
  });
}

export async function updateLead(id: string, updates: Partial<CrmLead> & { status?: LeadStatus; doctorNotes?: string }): Promise<CrmLead> {
  return apiFetch<CrmLead>(`/leads/${id}`, {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(updates),
  });
}

export async function deleteLead(id: string): Promise<void> {
  await apiFetch(`/leads/${id}`, { method: 'DELETE', auth: true });
}
