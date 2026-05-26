import api from './api';

// Use dynamic api client (which updates base URL from config.json at startup)
export const login = (email, password) =>
  api.post('/auth/token/', { email, password });

export const register = (data) =>
  api.post('/auth/register/', data);
