import api from './api';

export const getActivityLogs = () => api.get('/activities/');
export const createActivityLog = (data) => api.post('/activities/', data);
export const updateActivityLog = (id, data) => api.patch(`/activities/${id}/`, data);
export const deleteActivityLog = (id) => api.delete(`/activities/${id}/`);
