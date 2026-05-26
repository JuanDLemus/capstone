const assert = require('assert');

const mockSecureStore = {
  store: {},
  async setItemAsync(key, val) { this.store[key] = val; },
  async deleteItemAsync(key) { delete this.store[key]; }
};

class MockAxios {
  constructor(config = {}) {
    this.config = config;
    this.interceptors = {
      request: {
        use: (fn) => { this.requestInterceptor = fn; }
      },
      response: {
        use: (successFn, errorFn) => {
          this.responseSuccessInterceptor = successFn;
          this.responseErrorInterceptor = errorFn;
        }
      }
    };
  }

  create(config) {
    return new MockAxios(config);
  }

  async post(url, data) {
    if (url.includes('/auth/token/refresh/')) {
      if (data.refresh === 'valid_refresh') {
        return { data: { access: 'new_access_token' } };
      }
      throw new Error('Refresh failed');
    }
  }
}

function createApiService(axiosInstance, secureStoreInstance) {
  let _accessToken = null;
  let _refreshToken = null;
  let _onUnauthorized = null;

  const setTokens = (access, refresh) => {
    _accessToken = access;
    _refreshToken = refresh;
  };

  const clearTokens = () => {
    _accessToken = null;
    _refreshToken = null;
  };

  const setUnauthorizedHandler = (fn) => {
    _onUnauthorized = fn;
  };

  const api = axiosInstance.create({
    baseURL: 'https://api.echovolt.local',
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  });

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
          const { data } = await axiosInstance.post('/auth/token/refresh/', {
            refresh: _refreshToken,
          });
          _accessToken = data.access;
          await secureStoreInstance.setItemAsync('access_token', data.access);
          original.headers.Authorization = `Bearer ${data.access}`;
          return api;
        } catch (e) {
          clearTokens();
          await secureStoreInstance.deleteItemAsync('access_token');
          await secureStoreInstance.deleteItemAsync('refresh_token');
          if (_onUnauthorized) _onUnauthorized();
        }
      }
      return Promise.reject(error);
    }
  );

  return { api, setTokens, clearTokens, setUnauthorizedHandler, getAccessToken: () => _accessToken };
}

async function run() {
  const axiosMock = new MockAxios();
  const service = createApiService(axiosMock, mockSecureStore);

  // Test 1: No token
  const config1 = { headers: {} };
  const res1 = service.api.requestInterceptor(config1);
  assert.strictEqual(res1.headers.Authorization, undefined);

  // Test 2: Token injected
  service.setTokens('test_access', 'test_refresh');
  const config2 = { headers: {} };
  const res2 = service.api.requestInterceptor(config2);
  assert.strictEqual(res2.headers.Authorization, 'Bearer test_access');

  // Test 3: Token refresh on 401
  service.setTokens('expired_access', 'valid_refresh');
  let unauthorizedTriggered = false;
  service.setUnauthorizedHandler(() => { unauthorizedTriggered = true; });

  const errorObj = {
    response: { status: 401 },
    config: { headers: {}, _retry: false }
  };

  await service.api.responseErrorInterceptor(errorObj);
  assert.strictEqual(service.getAccessToken(), 'new_access_token');
  assert.strictEqual(mockSecureStore.store['access_token'], 'new_access_token');
  assert.strictEqual(unauthorizedTriggered, false);

  // Test 4: Token refresh failure wipes tokens
  service.setTokens('expired_access', 'invalid_refresh');
  const errorObj2 = {
    response: { status: 401 },
    config: { headers: {}, _retry: false }
  };
  try {
    await service.api.responseErrorInterceptor(errorObj2);
  } catch (e) {
    // Expected
  }
  assert.strictEqual(service.getAccessToken(), null);
  assert.strictEqual(unauthorizedTriggered, true);
}

module.exports = { name: "API Service Unit Tests", run };
