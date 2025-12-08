 
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
 

 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "clone-2eb9c.firebaseapp.com",
  projectId: "clone-2eb9c",
  storageBucket: "clone-2eb9c.firebasestorage.app",
  messagingSenderId: "33330554780",
  appId: "1:33330554780:web:3e9a1fdf64cf2817ff8a59",
  measurementId: "G-VTYX9GQ803"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const authProvider = new GoogleAuthProvider()