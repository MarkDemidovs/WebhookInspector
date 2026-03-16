const BASE_URL = 'http://localhost:4000/api';

export const api = async (path: string, options?: RequestInit) => {
    const res = await fetch(BASE_URL + path, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        }
    })

    return res.json();
}