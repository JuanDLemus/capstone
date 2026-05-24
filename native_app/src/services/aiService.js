import api from './api';

export const getDailyInsight = () => api.get('/ai/insight/');
export const getAIFlags = () => api.get('/ai/flags/');
export const acknowledgeFlag = (id) => api.post(`/ai/flags/${id}/acknowledge/`);

export const createConversation = () => api.post('/ai/conversations/', {});
export const endConversation = (id) => api.post(`/ai/conversations/${id}/end/`);
export const sendMessage = (conversationId, content) =>
  api.post(`/ai/conversations/${conversationId}/message/`, { content });
export const getConversationMessages = (conversationId) =>
  api.get('/ai/messages/', { params: { conversation: conversationId } });
