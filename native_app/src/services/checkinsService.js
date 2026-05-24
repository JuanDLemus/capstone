import api from './api';

export const createCheckIn = (data) => api.post('/checkins/', data);
export const getCheckIns = () => api.get('/checkins/');
export const getCheckIn = (id) => api.get(`/checkins/${id}/`);

export const getWellnessScores = () => api.get('/wellness-scores/');
export const getWellnessScore = (id) => api.get(`/wellness-scores/${id}/`);

export const getWeeklySummaries = () => api.get('/weekly-summaries/');
export const getWeeklySummary = (id) => api.get(`/weekly-summaries/${id}/`);
