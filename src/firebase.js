// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9KsbBmpgkfAO2qHox47bRHJc9yE9isM8",
  authDomain: "chat-app-e64f6.firebaseapp.com",
  projectId: "chat-app-e64f6",
  storageBucket: "chat-app-e64f6.firebasestorage.app",
  messagingSenderId: "926936665465",
  appId: "1:926936665465:web:b6cc6e783fecec3f23b3a8",
  measurementId: "G-TYWLX1PDPV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
