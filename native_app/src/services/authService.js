import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

// Use plain axios (no auth header) for login and register
export const login = (email, password) =>
  axios.post(`${BASE_URL}/auth/token/`, { email, password });

export const register = (data) =>
  axios.post(`${BASE_URL}/auth/register/`, data);
