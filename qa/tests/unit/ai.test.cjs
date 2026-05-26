const assert = require('assert');

function buildPayload(userText, conversationMessages = [], temperature = 0.1, maxTokens = 500) {
  const simulatedRag = `
PATIENT FILE:
Name: Maria.
Conditions: Clinical Depression (PHQ-9 Score: 16), Generalized Anxiety (GAD-7 Score: 16).
`;
  return {
    model: "local-model",
    messages: [
      {
        role: "system",
        content: `You operate as EchoVolt API. Output raw JSON ONLY. Format: {"reply":"response","summary":"3 words","intent":"intent"}. RAG Context:\n${simulatedRag.trim()}`
      },
      ...conversationMessages,
      { role: "user", content: userText }
    ],
    temperature,
    max_tokens: maxTokens,
    stream: false
  };
}

function parseAiResponse(content) {
  try {
    return JSON.parse(content);
  } catch (e) {
    return {
      reply: content,
      summary: "Response received",
      intent: "general"
    };
  }
}

async function run() {
  const payload = buildPayload("I am feeling anxious", [{ role: "assistant", content: "Hello" }], 0.2, 300);
  assert.strictEqual(payload.model, "local-model");
  assert.strictEqual(payload.temperature, 0.2);
  assert.strictEqual(payload.max_tokens, 300);
  assert.strictEqual(payload.messages.length, 3);
  assert.ok(payload.messages[0].content.includes("EchoVolt API"));

  const goodJson = '{"reply": "Let\'s try a breathing exercise", "summary": "Anxiety detected", "intent": "breath_i"}';
  const parsed1 = parseAiResponse(goodJson);
  assert.strictEqual(parsed1.reply, "Let's try a breathing exercise");
  assert.strictEqual(parsed1.summary, "Anxiety detected");
  assert.strictEqual(parsed1.intent, "breath_i");

  const badJson = "I am sorry to hear that. Let's do some exercises.";
  const parsed2 = parseAiResponse(badJson);
  assert.strictEqual(parsed2.reply, badJson);
  assert.strictEqual(parsed2.summary, "Response received");
  assert.strictEqual(parsed2.intent, "general");
}

module.exports = { name: "AI Service Unit Tests", run };
