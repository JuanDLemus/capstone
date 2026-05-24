import api from './api';

// Medications
export const getMedications = () => api.get('/health/medications/');
export const createMedication = (data) => api.post('/health/medications/', data);
export const updateMedication = (id, data) => api.patch(`/health/medications/${id}/`, data);
export const deleteMedication = (id) => api.delete(`/health/medications/${id}/`);

// Adherence
export const getAdherenceLogs = () => api.get('/health/adherence-logs/');
export const createAdherenceLog = (data) => api.post('/health/adherence-logs/', data);

// Visits
export const getMedicalVisits = () => api.get('/health/visits/');
export const createMedicalVisit = (data) => api.post('/health/visits/', data);
export const updateMedicalVisit = (id, data) => api.patch(`/health/visits/${id}/`, data);
export const deleteMedicalVisit = (id) => api.delete(`/health/visits/${id}/`);

// Diagnoses
export const getDiagnoses = () => api.get('/health/diagnoses/');
export const createDiagnosis = (data) => api.post('/health/diagnoses/', data);
export const deleteDiagnosis = (id) => api.delete(`/health/diagnoses/${id}/`);

// Lab results
export const getLabResults = () => api.get('/health/lab-results/');
export const createLabResult = (data) => api.post('/health/lab-results/', data);
export const deleteLabResult = (id) => api.delete(`/health/lab-results/${id}/`);

// Allergies
export const getAllergies = () => api.get('/health/allergies/');
export const createAllergy = (data) => api.post('/health/allergies/', data);
export const deleteAllergy = (id) => api.delete(`/health/allergies/${id}/`);

// Family history
export const getFamilyHistory = () => api.get('/health/family-history/');
export const createFamilyHistoryEntry = (data) => api.post('/health/family-history/', data);
export const deleteFamilyHistoryEntry = (id) => api.delete(`/health/family-history/${id}/`);
