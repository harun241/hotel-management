// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ এইটাই তোমার Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAYs9F0gwa8DVrCT5MaiKjglG08aawdohg",
  authDomain: "hotel-management-5b87e.firebaseapp.com",
  projectId: "hotel-management-5b87e",
  storageBucket: "hotel-management-5b87e.appspot.com", // 🔧 (".app" → ".com")
  messagingSenderId: "831621484916",
  appId: "1:831621484916:web:e4007650f451e9480c1c21",
  measurementId: "G-BTXGPCYE03"
};

// ✅ Firebase initialization
const app = initializeApp(firebaseConfig);

// ✅ Create auth and provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export properly!
export { auth, googleProvider };
