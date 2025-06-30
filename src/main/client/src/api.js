// Example apiFetch.js
const API_BASE = 'https://invoicing-system-8sa3.onrender.com';

export function apiFetch(url, options) {
  // If url starts with http:// or https://, don't prepend base
  const fullUrl = url.startsWith('http://') || url.startsWith('https://')
    ? url
    : API_BASE + url;
  return fetch(fullUrl, options);
}