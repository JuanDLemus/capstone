# EchoVolt — Capstone Project

EchoVolt is a cognitive accessibility platform built for clinical and daily use. It ships as two complementary products from a single monorepo:

| | Web Prototype | Native App |
|---|---|---|
| **Stack** | React 18 + Vite | React Native 0.81 + Expo SDK 54 |
| **Target** | Browser / Desktop demo | Android & iOS physical devices |
| **Root** | `/` (repo root) | `native_app/` |
| **Design tokens** | `src/styles/` | `native_app/src/theme.js` |
| **AI service** | Inline fetch | `native_app/src/services/ai.js` |

---

## Repository Structure

```
capstone/
├── src/                        # Web prototype (React + Vite)
│   ├── App.jsx
│   └── ...
├── index.html
├── vite.config.js
├── package.json                # Web dependencies
│
└── native_app/                 # React Native app (Expo)
    ├── App.js
    ├── app.json
    ├── babel.config.js
    ├── jsconfig.json
    ├── package.json            # Native dependencies
    └── src/
        ├── theme.js            # Single source of truth for all tokens
        ├── components/
        ├── navigation/
        ├── screens/            # 55 screens across 9 modules
        │   ├── Activities/
        │   ├── Auth/
        │   ├── Communication/
        │   ├── Dashboard/
        │   ├── Health/
        │   ├── Main/
        │   ├── Screening/
        │   ├── Settings/
        │   ├── System/
        │   └── Taker/
        └── services/
            └── ai.js           # AI/LLM backend connector
```

---

## Running the Web Prototype

**Prerequisites:** Node.js >= 18, npm >= 9

```bash
# From the repo root
npm install
npm run dev
```

The Vite dev server starts at `http://localhost:5173` (or next available port).

Available scripts:

| Command | Action |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production bundle → `dist/` |
| `npm run preview` | Serve the production bundle locally |

---

## Running the Native App

**Prerequisites:** Node.js >= 18, Expo CLI, and one of:
- **Expo Go** app installed on a physical Android or iOS device
- Android emulator (AVD) or iOS Simulator (macOS only)

```bash
# From native_app/
cd native_app
npm install

# Local network (device must be on same Wi-Fi)
npx expo start

# Tunnel mode (works across different networks, mobile data, etc.)
npx expo start --tunnel

# Android emulator only
npx expo start --android

# iOS simulator only (macOS)
npx expo start --ios
```

After the QR code appears, scan it with:
- **Android** → Expo Go app
- **iOS** → native Camera app (auto-detects Expo links)

> **Port conflict:** If port 8081 is taken (e.g., the web app is running), Expo will prompt to use 8082. Select yes.

Available scripts in `native_app/package.json`:

| Command | Action |
|---|---|
| `npm start` | `expo start` (interactive menu) |
| `npm run android` | Open directly on Android |
| `npm run ios` | Open directly on iOS |
| `npm run web` | Expo web (experimental) |

---

## Running Both Versions Simultaneously

Both can run at the same time in separate terminals:

**Terminal 1 — Web prototype:**
```bash
# from repo root
npm run dev
# → http://localhost:5173
```

**Terminal 2 — Native app:**
```bash
# from native_app/
npx expo start --tunnel
# → exp://axrcse4-anonymous-8082.exp.direct  (tunnel URL)
# → http://localhost:8082                    (web fallback)
```

They are completely independent processes sharing no runtime state. The only shared artifact is design intent — the native app's `src/theme.js` mirrors the CSS design tokens of the web prototype.

---

## Backend Integration

### Current State (Development)

The AI service in `native_app/src/services/ai.js` points directly to a local LM Studio instance:

```js
const LM_STUDIO_URL = "http://192.168.20.189:1234/v1/chat/completions";
```

This works on a local network but is **not suitable for production**. Replace this IP with your backend API URL before any external deployment.

### Recommended Production Architecture

```
┌─────────────────┐     HTTPS/WSS      ┌──────────────────────────────┐
│  React Native   │ ─────────────────► │  EchoVolt Backend API        │
│  (Expo Go /     │                    │  (FastAPI / Node / Express)   │
│   APK build)    │ ◄───────────────── │                              │
└─────────────────┘    JSON responses  │  ┌──────────────────────────┐ │
                                       │  │  LLM Layer               │ │
┌─────────────────┐     HTTPS          │  │  (LM Studio / Ollama /   │ │
│  Web Prototype  │ ─────────────────► │  │   OpenAI API / local     │ │
│  (Vite / React) │ ◄───────────────── │  │   LLaMA/Mistral model)   │ │
└─────────────────┘                    │  └──────────────────────────┘ │
                                       │  ┌──────────────────────────┐ │
                                       │  │  Database                │ │
                                       │  │  (PostgreSQL / Firebase) │ │
                                       │  └──────────────────────────┘ │
                                       └──────────────────────────────┘
```

### Connecting the Native App to a Real Backend

1. **Create a `.env` file inside `native_app/`:**

```env
EXPO_PUBLIC_API_BASE_URL=https://api.echovolt.example.com
```

> Expo automatically exposes variables prefixed with `EXPO_PUBLIC_` to the JS bundle.

2. **Update `native_app/src/services/ai.js`:**

```js
const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function sendToModel(userText, conversationMessages = []) {
  const res = await fetch(`${API_BASE}/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
    },
    body: JSON.stringify({ messages: conversationMessages, input: userText }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
```

3. **Add `.env` to `.gitignore`** (it already should be — never commit secrets):

```
native_app/.env
.env
.env.local
```

4. **Provide `.env.example` for collaborators:**

```env
EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com
EXPO_PUBLIC_API_KEY=your-api-key-here
```

### Connecting the Web Prototype to a Real Backend

The web app (`src/`) uses standard `fetch`. Add a Vite proxy in `vite.config.js` for local development to avoid CORS:

```js
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // your backend port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
}
```

Then call `fetch('/api/v1/chat', ...)` in the web components — in production, replace with the full HTTPS URL via an env variable (`import.meta.env.VITE_API_URL`).

### Backend Endpoint Contract

Both clients expect the AI endpoint to follow this contract:

```
POST /v1/chat
Content-Type: application/json
Authorization: Bearer <token>

{
  "input": "I'm feeling anxious",
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}

→ 200 OK
{
  "reply": "Let's try a breathing exercise.",
  "summary": "Anxiety detected",
  "intent": "breath_i"
}
```

The `intent` field maps directly to a React Navigation screen name, enabling the AI to navigate the app on behalf of the user.

---

## Design System

All visual tokens live in **one file per version**:

| Version | File | Tokens |
|---|---|---|
| Native | `native_app/src/theme.js` | `T.fontSora`, `T.fontNunito`, `T.w6`–`T.w9`, colors, radii |
| Web | `src/` CSS vars | `--color-primary`, `--font-*`, etc. |

To change a font globally on native, edit `T.fontSora` / `T.fontNunito` in `theme.js`. Every screen inherits it automatically — no screen-level changes needed.

---

## Screens Inventory (55 screens)

| Module | Screens |
|---|---|
| Auth | Welcome, Login, Register, ForgotPW, Legal |
| Communication | VoiceIdle, VoiceListen, VoiceProc, VoiceResp, AACMain, GuidedQ |
| Activities | Emergency, CalmMode, BreathI, BoxBreath, Grounding, BodyScan, Dial911, PanicProtocol, ActHist |
| Main | HomeScreen, DashboardScreen, ActivitiesScreen, Calendar, SettingsScreen |
| Health | HealthHub, Visits, AddVisit, Diagnoses, Medications, Labs, Allergies, FamilyHx |
| Dashboard | WeeklySummary |
| Screening | ScreeningHub, PHQ9, GAD7, Result, History |
| Taker | TakerHome, ClinicalBI, AIFlags, DrReport, RAGChat |
| Settings | Settings, GPS, Offline, DevMode |
| System | EmptyState, Error, Loading |
