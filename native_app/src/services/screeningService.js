import api from './api';

export const submitScreening = (data) => api.post('/screenings/', data);
export const getScreenings = () => api.get('/screenings/');
export const getScreening = (id) => api.get(`/screenings/${id}/`);
