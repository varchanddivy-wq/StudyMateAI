# Build StudyMate AI APK without Android Studio

This project includes a GitHub Actions workflow at:

`.github/workflows/build-apk.yml`

## One-time setup

1. Create a GitHub account if you do not already have one.
2. Create a new repository, for example `StudyMateAI`.
3. Upload all files from this project ZIP to the repository.
4. Commit/push the files to `main` (or `master`).
5. Open the repository on GitHub.
6. Tap **Actions**.
7. Select **Build StudyMate AI APK**.
8. Tap **Run workflow**.
9. Wait for the green check mark.
10. Open the completed workflow run.
11. Under **Artifacts**, download `StudyMateAI-debug-apk`.
12. Extract the downloaded artifact and install `app-debug.apk` on your Android phone.

The workflow uses Java 17 and Gradle on GitHub's hosted runner, so Android Studio is not required on your device or computer.

## Backend

The Android app is configured to call the backend URL in:

`app/src/main/assets/index.html`

Set:

`API_BASE_URL`

to your deployed HTTPS backend URL before building.

Keep your AI API key on the backend. Do not put it in the Android app.

## Notes

The workflow builds a debug APK. It is suitable for installing and testing on your phone. A Play Store release should use a properly managed release signing key.
