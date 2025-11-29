import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Using your provided Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBX3MLSytfncEuneoC9DZ5WyoZDSDxiLv8",
  authDomain: "seicho-infofi.firebaseapp.com",
  projectId: "seicho-infofi",
  storageBucket: "seicho-infofi.firebasestorage.app",
  messagingSenderId: "334123682300",
  appId: "1:334123682300:web:c06573957b022ab3b20a79"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
