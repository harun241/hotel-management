// api.js
import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: "https://jp-server-blond.vercel.app",
});

// Add Firebase ID token to every request if logged in
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(/* forceRefresh */ true);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default api;
