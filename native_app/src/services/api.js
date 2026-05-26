import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

let BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';
const CONFIG_URL = 'https://raw.githubusercontent.com/JuanDLemus/capstone/main/config.json';

// In-memory token cache — populated at app startup from SecureStore
let _accessToken = null;
let _refreshToken = null;
let _onUnauthorized = null;

export function setTokens(access, refresh) {
  _accessToken = access;
  _refreshToken = refresh;
}

export function clearTokens() {
  _accessToken = null;
  _refreshToken = null;
}

export function getAccessToken() {
  return _accessToken;
}

export function setUnauthorizedHandler(fn) {
  _onUnauthorized = fn;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export async function initializeBaseUrl() {
  try {
    const res = await axios.get(CONFIG_URL, { timeout: 3000 });
    if (res.data && res.data.api_base_url) {
      BASE_URL = res.data.api_base_url;
      api.defaults.baseURL = BASE_URL;
      console.log('Successfully initialized active API base URL from GitHub raw config:', BASE_URL);
    }
  } catch (err) {
    console.log('Failed to fetch dynamic API URL from GitHub, using env fallback:', BASE_URL);
  }
}

api.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry && _refreshToken) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
          refresh: _refreshToken,
        });
        _accessToken = data.access;
        await SecureStore.setItemAsync('access_token', data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        clearTokens();
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        if (_onUnauthorized) _onUnauthorized();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
