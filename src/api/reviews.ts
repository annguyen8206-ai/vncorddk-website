import { apiFetch } from './client';
import { ReviewItem } from '../types';

export async function getReviews(): Promise<ReviewItem[]> {
  return apiFetch<ReviewItem[]>('/reviews');
}

export async function bulkSaveReviews(reviews: ReviewItem[]): Promise<void> {
  await apiFetch('/reviews', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(reviews),
  });
}
