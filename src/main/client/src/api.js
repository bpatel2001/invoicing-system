// Example apiFetch.js
// const API_BASE = 'https://invoicing-system-8sa3.onrender.com';

const API_BASE = 'http://localhost:8080'

export function apiFetch(url, options = {}) {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const fullUrl = url.startsWith('http://') || url.startsWith('https://')
    ? url
    : API_BASE + url;
  return fetch(fullUrl, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(auth ? { Authorization: `Basic ${auth}` } : {}),
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}