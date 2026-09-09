# StudyMate AI Backend

This Node.js/Express server keeps your OpenAI API key off the Android APK. The Android app calls this backend, and the backend calls the OpenAI Responses API. OpenAI explicitly recommends routing mobile-app requests through your own backend rather than shipping an API key in the app.

## 1. Install

```bash
cd backend
npm install
```

## 2. Configure

Copy `.env.example` to `.env` and set:

```env
OPENAI_API_KEY=your_real_key
OPENAI_MODEL=gpt-5.6-luna
PORT=3000
ALLOWED_ORIGIN=*
```

For production, replace `ALLOWED_ORIGIN=*` with the exact origin you use for browser clients. The Android WebView itself can work with the HTTPS backend.

## 3. Run

```bash
npm start
```

Health check:

`GET /health`

AI endpoints:

- `POST /api/ask` with `{ "question": "Explain gravity" }`
- `POST /api/notes` with `{ "topic": "Newton's Laws" }`

## 4. Connect the Android app

Open:

`app/src/main/assets/index.html`

Change:

```js
const API_BASE_URL = "https://YOUR-BACKEND-DOMAIN.example.com";
```

to your deployed backend HTTPS URL, then rebuild the APK.

Do not put `OPENAI_API_KEY` in the Android project, HTML, JavaScript, Git repository, or APK.

## 5. Deploy

Deploy this `backend` directory to any Node.js host that supports environment variables and HTTPS. Set `OPENAI_API_KEY`, `OPENAI_MODEL`, `PORT` (if required by the host), and `ALLOWED_ORIGIN`.
