// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ এইটাই তোমার Firebase config
// firebase.config.js
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucke,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// ✅ Firebase initialization
const app = initializeApp(firebaseConfig);

// ✅ Create auth and provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export properly!
export { auth, googleProvider };
