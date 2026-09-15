import { apiFetch, setToken, clearToken, getToken } from './client';

export interface LoginResult {
  success: boolean;
  token?: string;
  username?: string;
  error?: string;
}

export async function loginAdmin(username: string, password: string, remember: boolean = true): Promise<LoginResult> {
  try {
    const data = await apiFetch<{ success: boolean; token: string; username: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, remember }),
    });
    setToken(data.token, remember);
    return { success: true, token: data.token, username: data.username };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : 'Đăng nhập thất bại.' };
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await apiFetch('/auth/logout', { method: 'POST', auth: true });
  } catch {
    // ignore
  }
  clearToken();
}

export function isAdminAuthenticated(): boolean {
  return !!getToken();
}

export async function checkAuthSession(): Promise<boolean> {
  try {
    await apiFetch('/auth/me', { auth: true });
    return true;
  } catch {
    clearToken();
    return false;
  }
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    await apiFetch('/auth/change-password', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : 'Đổi mật khẩu thất bại.' };
  }
}
