import api from './api';

// JSON EXTRACTOR
function extractJson(text) {
  if (!text || text.trim().length === 0) return null;
  const clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  const braceIdx = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  if (braceIdx !== -1 && lastBrace !== -1 && lastBrace > braceIdx) {
    try {
      return JSON.parse(clean.slice(braceIdx, lastBrace + 1));
    } catch {}
  }

  try {
    return JSON.parse(clean);
  } catch {}

  return null;
}

// SEND MESSAGE TO MODEL VIA BACKEND PROXY
export async function sendToModel(userText, conversationMessages = [], isAac = false) {
  // HISTORY MAPPING
  const historyMessages = conversationMessages.map(m => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));

  const allMessages = [
    ...historyMessages,
    { role: 'user', content: userText },
  ];

  // STRUCTURED REQUEST — backend owns system prompt and RAG context
  const res = await api.post('/ai/chat/', {
    messages: allMessages,
    is_aac: isAac,
  });

  const data = res.data;
  const choice = data?.choices?.[0];
  const content = choice?.message?.content ?? '';
  const reasoning = choice?.message?.reasoning ?? '';

  const parsed = extractJson(content) ?? extractJson(reasoning);

  if (parsed) return parsed;

  const fallbackText = content.trim() || reasoning.replace(/\{.*\}/s, '').trim().slice(0, 200);
  return {
    reply: fallbackText || 'I received your message but could not generate a response.',
    summary: 'AI Response',
    intent: 'general',
  };
}
