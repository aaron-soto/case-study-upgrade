import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Ensure environment variables are loaded
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error("Missing FIREBASE_API_KEY environment variable");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) {
  throw new Error("Missing FIREBASE_AUTH_DOMAIN environment variable");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  throw new Error("Missing FIREBASE_PROJECT_ID environment variable");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
  throw new Error("Missing FIREBASE_STORAGE_BUCKET environment variable");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) {
  throw new Error("Missing FIREBASE_MESSAGING_SENDER_ID environment variable");
}
if (!process.env.NEXT_PUBLIC_FIREBASE_APP_ID) {
  throw new Error("Missing FIREBASE_APP_ID environment variable");
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics =
  typeof window !== "undefined" && app.name ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, auth, analytics, db };
