import { apiFetch } from './client';
import { NewsArticle } from '../types';

export async function getArticles(): Promise<NewsArticle[]> {
  return apiFetch<NewsArticle[]>('/articles');
}

export async function createArticle(article: NewsArticle): Promise<NewsArticle> {
  return apiFetch<NewsArticle>('/articles', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(article),
  });
}

export async function updateArticle(id: string, updates: Partial<NewsArticle>): Promise<NewsArticle> {
  return apiFetch<NewsArticle>(`/articles/${id}`, {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(updates),
  });
}

export async function deleteArticle(id: string): Promise<void> {
  await apiFetch(`/articles/${id}`, { method: 'DELETE', auth: true });
}

export async function bulkSaveArticles(articles: NewsArticle[]): Promise<void> {
  await apiFetch('/articles', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify(articles),
  });
}
