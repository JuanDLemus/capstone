import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { setTokens, clearTokens, setUnauthorizedHandler } from '@/services/api';
import { login as apiLogin, register as apiRegister } from '@/services/authService';
import { getMe } from '@/services/userService';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'RESTORE':
      return { ...state, user: action.user, isAuthenticated: !!action.user, isLoading: false };
    case 'LOGIN':
      return { ...state, user: action.user, isAuthenticated: true, isLoading: false };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.data } };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setUnauthorizedHandler(() => dispatch({ type: 'LOGOUT' }));

    async function restoreSession() {
      try {
        const access = await SecureStore.getItemAsync('access_token');
        const refresh = await SecureStore.getItemAsync('refresh_token');
        if (access && refresh) {
          setTokens(access, refresh);
          const { data } = await getMe();
          dispatch({ type: 'RESTORE', user: data });
        } else {
          dispatch({ type: 'RESTORE', user: null });
        }
      } catch {
        dispatch({ type: 'RESTORE', user: null });
      }
    }

    restoreSession();
  }, []);

  const login = async (email, password) => {
    const { data } = await apiLogin(email, password);
    setTokens(data.access, data.refresh);
    await SecureStore.setItemAsync('access_token', data.access);
    await SecureStore.setItemAsync('refresh_token', data.refresh);
    const { data: user } = await getMe();
    dispatch({ type: 'LOGIN', user });
    return user;
  };

  const register = async (registerData) => {
    await apiRegister(registerData);
    return login(registerData.email, registerData.password);
  };

  const logout = async () => {
    clearTokens();
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (data) => dispatch({ type: 'UPDATE_USER', data });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
