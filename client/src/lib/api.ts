const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = async (path: string, options?: RequestInit) => {
    const res = await fetch(BASE_URL + path, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        }
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${res.status}`);
    }

    return res.json();
}