// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ এইটাই তোমার Firebase config
// firebase.config.js
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// ✅ Firebase initialization
const app = initializeApp(firebaseConfig);

// ✅ Create auth and provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export properly!
export { auth, googleProvider };
