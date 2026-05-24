import api from './api';

export const getMe = () => api.get('/users/me/');
export const updateMe = (data) => api.patch('/users/me/', data);

export const getProfile = () => api.get('/users/profile/');
export const updateProfile = (data) => api.patch('/users/profile/', data);

export const getAccessibility = () => api.get('/users/accessibility/');
export const updateAccessibility = (data) => api.patch('/users/accessibility/', data);

export const getReminders = () => api.get('/users/reminders/');
export const updateReminders = (data) => api.patch('/users/reminders/', data);

export const getCareRelationships = () => api.get('/care-relationships/');
export const createCareRelationship = (data) => api.post('/care-relationships/', data);
export const updateCareRelationship = (id, data) => api.patch(`/care-relationships/${id}/`, data);
