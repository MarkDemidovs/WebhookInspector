const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, '');
const apiBaseUrl = normalizedBaseUrl.endsWith('/api') ? normalizedBaseUrl : `${normalizedBaseUrl}/api`;

export const api = async (path: string, options?: RequestInit) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = apiBaseUrl + normalizedPath;

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
    };

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${res.status}`);
    }

    return res.json();
};