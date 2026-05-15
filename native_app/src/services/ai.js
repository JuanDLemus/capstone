const LM_STUDIO_URL = "http://192.168.20.189:1234/v1/chat/completions";

const SIMULATED_RAG = `
PATIENT FILE:
Name: Maria.
Conditions: Clinical Depression (PHQ-9 Score: 16 - Mod-Severe), Generalized Anxiety (GAD-7 Score: 16 - Severe).
Current Medications: Sertraline 50mg.
Recent Trends: Overall stress improving. Vocal pacing was speaking faster today (possible anxiety cue).
APP WORKFLOW CONTEXT:
EchoVolt is a cognitive accessibility app. If the user indicates extreme anxiety or panic, suggest navigating to the "Breathing Exercise" or "Emergency Dial" modules. If they indicate a medication issue, suggest checking the "Medication Hub".
`;

export async function sendToModel(userText, conversationMessages = []) {
  const payload = {
    model: "local-model",
    messages: [
      {
        role: "system",
        content: `You operate as EchoVolt API. You MUST output ONLY raw JSON without any markdown formatting. Follow this EXACT format: {"reply":"your short response","summary":"3 words","intent":"navigation intent"}. Do not add any conversational text before or after the JSON block. RAG Context:\n${SIMULATED_RAG}`
      },
      ...conversationMessages,
      { role: "user", content: userText }
    ],
    temperature: 0.1,
    max_tokens: 500, // Reduced from -1 for safety in mobile
    stream: false
  };

  try {
    const res = await fetch(LM_STUDIO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    const content = data.choices[0].message.content;
    
    // Attempt to parse JSON from content
    try {
      return JSON.parse(content);
    } catch (e) {
      // Fallback if model doesn't return clean JSON
      return {
        reply: content,
        summary: "Response received",
        intent: "general"
      };
    }
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}
