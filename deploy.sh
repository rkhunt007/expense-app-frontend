echo '===== Building for Production ====='

ng build --prod

echo '===== Deploying to firebase ====';

firebase deploy

echo '==== DONE =====';