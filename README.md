# StudyMate AI — Android + Backend

This project contains the Android Studio app and a Node.js backend for real AI answers and AI-generated study notes.

## Architecture

Android WebView app → HTTPS `/api/ask` or `/api/notes` → StudyMate backend → OpenAI Responses API

The OpenAI API key stays on the backend.

## Android setup

1. Open this folder in Android Studio.
2. Edit `app/src/main/assets/index.html`.
3. Set `API_BASE_URL` to your deployed backend URL.
4. Sync Gradle.
5. Build the debug APK.

## Backend setup

See `backend/README.md`.

The backend defaults to `gpt-5.6-luna`, a current cost-sensitive model suitable for high-volume workloads. You can change it with `OPENAI_MODEL`.

## Build without Android Studio

This project includes a one-click GitHub Actions workflow. See `GITHUB_BUILD.md`.
