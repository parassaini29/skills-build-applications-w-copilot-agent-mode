const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const safeCodespaceName = codespaceName || 'localhost';
const baseHost = codespaceName
  ? `${codespaceName}-8000.app.github.dev`
  : 'localhost:8000';

export const API_BASE_URL = `https://${baseHost}/api`;

export function normalizeResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && typeof data === 'object') {
    return data.items || data.data || data.results || [data];
  }
  return [];
}

export function getHelpText() {
  return 'VITE_CODESPACE_NAME must be defined in .env.local for Codespaces URL support.';
}
